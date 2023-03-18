import React, { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineEdit, AiOutlineReload } from 'react-icons/ai';
import { FcFullTrash } from 'react-icons/fc';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdDone } from 'react-icons/md';
import { REFRESH } from '../../constants/constants';
import AccountServices from '../../services/account.service';
import RoomateService from '../../services/roomate.service';
import taskService from '../../services/task-service';
import { RoomateResDto } from '../../_utils/model/dto/roomateResDto';
import { defaultTaskDto } from '../../_utils/model/dto/TaskDto';
import { TaskResDto } from '../../_utils/model/dto/taskResDto';
import { UserResDto } from '../../_utils/model/dto/userResDto';
import { Task } from '../../_utils/model/task-model';
import { UserInterface } from '../../_utils/model/user-model';
import Modal from '../shared/modals/modals';


const ViewTask = () => {
    const [newTask, setNewTask] = useState(defaultTaskDto);
    const [tasks, setTasks] = useState([] as TaskResDto[]);
    const [EditMode, setEditMode] = useState(false);
    const [showpopup, setShowPupup] = useState(false);
    const [users, setRoomatesUsers] = useState(null as unknown as RoomateResDto);
    const [taskIndexsEdited, setTaskIndexsEdited] = useState([] as number[]);

    const [taskFilter, setTaskFilter] = useState({
        status: "",
        priority: "",
        task: ""
    })

    const [responseMsg, setResponseMsg] = useState(
        {
            message: "",
            style: "",
            type: ""
        }
    );

    const userId = (localStorage.getItem('userId') as string);

    useEffect(() => {
        taskService.getTaskList()
        .then((res) => {
            let TaskTmp: TaskResDto[] = [];

            res.forEach((task: TaskResDto) => {
                const tsk = new TaskResDto(
                    task.id,
                    task.title,
                    task.description,
                    task.status,
                    task.priority,
                    task.createdBy,
                    task.assignedTo,
                    task.createdAt
                )

                TaskTmp.push(tsk);
            });

            console.log(TaskTmp);
            setTasks(TaskTmp);
        })
        .catch(error => {
            console.log(error);
            if(error.code === "ERR_NETWORK") {
                AccountServices.logout();
            }
        });

        if(userId && userId !== "null") {
            RoomateService.getRoomateByUserId(userId)
            .then((res) => { 
                if(res) {
                    let users: UserInterface[] = []; 
                    res.roomates.forEach((usr:any) => users.push(
                        new UserResDto(
                            usr.id,
                            usr.lastname,
                            usr.firstname,
                            usr.sexe,
                            usr.dateOfBirth,
                            usr.phoneNumber,
                            usr.email,
                            usr.password,
                            usr.isEmailVerified,
                            usr.iscertified,
                            usr.profileImg,
                            usr.autorizeHaldleTel,
                            usr.autorizeHaldleEmail,
                            usr.roles
                        ) 
                    ));
    
                    const roomatesTmp = new RoomateResDto(res.id, res.manager, res.announce,users);
                    setRoomatesUsers(roomatesTmp);
                }else {
                    // setNoRoomates("Vous n'avez pas de Colocataire pour le moment");
                }
            })
            .catch(error => {
                console.log(error);
                if(error.code === "ERR_NETWORK") {
                    AccountServices.logout();
                }
            });
        }
    }, [])

    const closeModal = () => {
        const body = document.querySelector('body');
        if(body) {
            if(body.classList.contains("active-modal")) {
                body.classList.remove('active-modal');
            }
        }
        setShowPupup(false);
    }
    const handleInputAddTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })
    }

    const handleTexteAreaAddTaskChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.options.selectedIndex;
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.options[selectedIndex].value
        });
    }
    
    const haldleFilterChange =(e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.options.selectedIndex;
        setTaskFilter({
            ...taskFilter,
            [e.target.name]: e.target.options[selectedIndex].value
        }
        )
    }
    const onUpdate = (task: TaskResDto, index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTasks = tasks.map((tsk,i) => {
          if (tsk.id === task.id && index === i) {
            toggleEditTaskId(index);
            return { ...tsk, [e.target.name]:e.target.value };
          } else {
            return tsk;
          }
        });
        console.log(newTasks);
        setTasks(newTasks);
        setEditMode(true);
    };

    const addTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!EditMode) {
            newTask.assignedTo = "";
            newTask.createdAt = new Date();
            newTask.status = "En Attente";
        }
        newTask.createdBy = userId;

        if(newTask.assignedTo===null) {
            newTask.assignedTo = "";
        }

        if(newTask.title === "" || newTask.description === "" || newTask.createdBy === null || newTask.createdBy === undefined || newTask.createdBy === ""){
            setResponseMsg({
                message: "Veillez remplir tous les champs svp!",
                style: "danger",
                type: 'quit'
            });
        }else {
            if(EditMode){
                const theTask = new Task(
                    localStorage.getItem('taskId') as string,
                    newTask.title,
                    newTask.description,
                    newTask.status,
                    newTask.priority,
                    newTask.createdBy,
                    newTask.assignedTo,
                    newTask.createdAt
                );

                taskService.updateTask(theTask).then(()=> {
                    setShowPupup(false);
                    setResponseMsg({
                        message: "Modification Effectuée !",
                        style: "success",
                        type: REFRESH
                    });
                }).catch((error) => {
                    setShowPupup(false);
                    setResponseMsg({
                        message: "un problème est survenue veillez reessayer plus tard",
                        style: "danger",
                        type: 'quit'
                    });
                })

                localStorage.removeItem("taskId");
                
            }else {

                taskService.saveTask(newTask).then(()=> {
                    setShowPupup(false);
                    setResponseMsg({
                        message: "Tâche ajouté !",
                        style: "success",
                        type: REFRESH
                    });
                }).catch((error) => {
                    setShowPupup(false);
                    setResponseMsg({
                        message: "un problème est survenue veillez reessayer plus tard",
                        style: "danger",
                        type: 'quit'
                    });
                })
            }
        }
        setNewTask(defaultTaskDto);
    }

    const toggleEditTaskId = (index: number) => {
        const i = taskIndexsEdited.indexOf(index);
        if(i===-1) {
            const res = taskIndexsEdited;
            res.push(index);
            setTaskIndexsEdited(res);
        }
    }

    const updateTask = (task: TaskResDto,index: number, status: string | null=null) => {
        console.log(task);
        const taskTmp = new Task(
            task.id,
            task.title,
            task.description,
            status!==null? status: task.status,
            task.priority,
            task.createdBy.id,
            task.assignedTo?.id? task.assignedTo?.id: task.assignedTo as unknown as string,
            task.createdAt
        )
        taskTmp.assignedTo = task.assignedTo?.id? task.assignedTo?.id: task.assignedTo as unknown as string;
        if(taskTmp.assignedTo===null) {
            taskTmp.assignedTo = "";
        }
        taskService.updateTask(taskTmp).then(()=>{
            const i = taskIndexsEdited.indexOf(index);
            if(i!==-1) {
                let res = taskIndexsEdited;
                res = res.splice(index,1);
                console.log(taskIndexsEdited, "----index=", index);
                setTaskIndexsEdited(res);
            }
            setResponseMsg({
                message: "modification effectuée",
                style: "success",
                type: status===null?"quit":REFRESH
            });
        
        })
        .catch((error) => {
            setResponseMsg({
                message: "un problème est survenue veillez reessayer plus tard",
                style: "danger",
                type: 'quit'
            });
        })
        console.log(taskTmp);
    }

    const deleteTask = (taskId: string) =>{
        if(window.confirm("Voulez-vous vraiment Supprimer cette tâche ?")) {

            taskService.removeTask(taskId)
            .then(()=> {
                setResponseMsg({
                    message: "Supprimé",
                    style: "success",
                    type: REFRESH
                });
            })
            .catch((error) => {
                console.log(error);
                setResponseMsg({
                    message: "un problème est survenue veillez reessayer plus tard",
                    style: "danger",
                    type: 'quit'
                });
            })
        }
    }

    const editTask = (task: TaskResDto,index:number) => {
        console.log(task);
        newTask.assignedTo = task.assignedTo?.id? task.assignedTo?.id: task.assignedTo as unknown as string;
        newTask.createdAt = task.createdAt;
        newTask.createdBy = userId;
        newTask.status = task.status;
        newTask.priority = task.priority;
        newTask.title = task.title;
        newTask.description = task.description;
        localStorage.setItem('taskId',task.id);
        setShowPupup(true);
        setEditMode(true);
        // console.log(newTask);
    }
    
    return (
        <div className='container auto relative'>

                {
                    responseMsg.message!=="" && 
                    <div className={`text-center ${responseMsg.style} w-100 p-1 flex space-around`}>
                        {responseMsg.message}
                        <button className='bg-none border-1 flex flex-end'
                            onClick={()=> responseMsg.type === 'refresh'? window.location.reload(): setResponseMsg({...responseMsg, message:"", type:""})}
                        >
                            {
                                responseMsg.type===REFRESH ?
                                <>
                                    <h4>
                                        rafraichir
                                    </h4>
                                    <AiOutlineReload fontSize={30}/>
                                </>
                                :
                                <AiOutlineClose fontSize={30}/>
                            }
                        </button>
                    </div>
                }

            <h3 className="mt-2 mb-1 text-center">
                Trier par:
            </h3>
            <div className="flex auto w-70 relative">
                <div className='w-30 relative mr-half'>
                    <h4>creer | assigné</h4>
                    <select name="task" id="task" className='w-100' value={taskFilter.task} onChange={(e)=> haldleFilterChange(e)}>
                        <option value="">Toutes</option>
                        <option value="createdBy">créer par moi</option>
                        <option value="assignedTo">Assigné à moi</option>
                    </select>
                </div>

                <div className='w-30 relative mr-half'>
                    <h4>Status</h4>
                    <select name="status" id="status" className='w-100' value={taskFilter.status} onChange={(e)=> haldleFilterChange(e)}>
                        <option value="">tout</option>
                        <option value="En attente">En attente</option>
                        <option value="Terminé">Terminé</option>
                        <option value="En cours">En cours</option>
                    </select>

                </div>


                <div className='w-30 relative'>
                    <h4>Priorité</h4>
                    <select name="priority" id="priority" className='w-100' value={taskFilter.priority} onChange={(e)=> haldleFilterChange(e)}>
                        <option value="">tout</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
                        <option value="Haute">Haute</option>
                    </select>

                </div>

            </div>
            <table className='table w-100 my-2'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Date de création</th>
                        <th>Créé par</th>
                        <th>Affecté à</th>
                        <th>Status</th>
                        <th>Urgence</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
        {tasks.map((task,index) => {
            if(
                (taskFilter.task.includes('assigned')?task.assignedTo?.id?.includes(userId): (taskFilter.task.includes('created')?task.createdBy?.id?.includes(userId): true)) &&
                task.status.toLowerCase().includes(taskFilter.status.toLowerCase()) &&
                task.priority.toLowerCase().includes(taskFilter.priority.toLowerCase())
            )
            return (
                <tr key={task.id} className={task.status==="Terminé"?" bg-gray":""}>
                <td>{index+1}</td>
                <td>{task.title}</td>
                <td>{new Intl.DateTimeFormat('fr-FR').format(new Date(task.createdAt))+""}</td>
                <td>{task.createdBy.firstname}</td>
                <td className={task.status==="Terminé"?"desabled":""}>
                    <select value={task.assignedTo?.id} onChange={(e)=>onUpdate(task,index,e)} name="assignedTo" >
                    <option value="">-- Sélectionner --</option>
                    { users && users.roomates && users.roomates.length > 0 &&
                        users.roomates.map((user) => 
                            <option value={user.id} key={user.id}>{user.firstname}</option>
                        )
                    }
                    </select>
                </td>
                <td>{task.status}</td>
                <td className={task.status==="Terminé"?"desabled":""}>
                    <select name="priority" id="" className='w-100' value={task.priority} onChange={(e)=>onUpdate(task,index,e)}>
                        <option value="">-- Sélectionner --</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
                        <option value="Haute">Haute</option>
                    </select>
                </td>
                <td>
                    {
                        task.createdBy.id === userId && (taskIndexsEdited.indexOf(index)===-1) &&
                        <>
                            <button className="px-half mr-half danger pointer" onClick={()=>deleteTask(task.id)}><FcFullTrash/></button>
                            <button className={"px-half mr-half bg-light-gold pointer"+(task.status==="Terminé"?" desabled":"")} onClick={()=>editTask(task,index)}><AiOutlineEdit/></button>
                            <button className={"px-half success pointer mark-done"+(task.status==="Terminé"?" desabled":"")} onClick={()=> updateTask(task,index,"Terminé")}><MdDone/></button>
                        </>
                    }
                    {
                        (taskIndexsEdited.indexOf(index)!==-1) &&
                        <div className='w-80 flex flex-end auto'>
                            <button className="px-half success pointer p-half flex center text-center" onClick={()=>updateTask(task,index)}>Enregistrer<MdDone/></button>
                        </div>
                    }
                </td>
                </tr>
                )
                return null;
            })}
        </tbody>
        </table>
        <div className="flex w-100 center">

            <button className="mr-half w-half btn bg-light-blue w-full py-half px-1 my-1" onClick={()=>setShowPupup(true)}>
                <IoIosAddCircleOutline fontSize={30}/>
            </button>
        </div>

        {
            showpopup &&
            <Modal closeModal={closeModal}> 
                <div className='my-1'>
                {
                    responseMsg.message!=="" &&
                    <div className={`text-center ${responseMsg.style} w-100 p-1 flex space-around`}>
                        {responseMsg.message}
                        <button className='bg-none border-1 flex flex-end'
                            onClick={()=> responseMsg.type === 'refresh'? window.location.reload(): setResponseMsg({...responseMsg, message:"", type:""})}
                        >
                            {
                                responseMsg.type===REFRESH ?
                                <>
                                    <h4>
                                        rafraichir
                                    </h4>
                                    <AiOutlineReload fontSize={30}/>
                                </>
                                :
                                <AiOutlineClose fontSize={30}/>
                            }
                        </button>
                    </div>
                }
                    <h3 className="text-center">Nouvelle Tâche</h3>
                    <form action="" className='w-full my-2 auto'>
                        <div className="my-1 flex column">
                            <label htmlFor="title"><h4>Titre</h4></label>
                            <input type="text" className='w-100 p-1' name='title' id='title' value={newTask.title} onChange={(e)=>handleInputAddTaskChange(e)}/>
                        </div>

                        <div className="my-1 flex column">
                            <label htmlFor="description"><h4>Description</h4></label>
                            <textarea className='w-100 p-1' rows={10} value={newTask.description} id="description" name='description' onChange={(e)=>handleTexteAreaAddTaskChange(e)}>
                                {newTask.description}
                            </textarea>
                        </div>

                        <div className="my-1 flex column">
                            <label htmlFor="priority"><h4>Priorité</h4></label>
                            <select name="priority" id="priority" className='w-100 p-1' value={newTask.priority} onChange={(e)=>handleSelectChange(e)}>
                                <option value="Moyenne">Moyenne</option>
                                <option value="Basse">Basse</option>
                                <option value="Haute">Haute</option>
                            </select>
                        </div>

                        <div className="my-1 flex flex-end w-100 auto">
                            <button className='bg-primary text-light p-1' onClick={(e)=>addTask(e)}>
                                <h4>{EditMode?"Modifier": "Ajouter"}</h4>
                            </button>
                        </div>

                    </form>
                
                </div>
            </Modal>
        }
        </div>
    );
}

export default ViewTask;



