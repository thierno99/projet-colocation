import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { AiOutlineQuestionCircle, AiOutlineSave } from 'react-icons/ai';
import { FcAddImage } from 'react-icons/fc';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { MAX_IMG_PER_ANNOUNCE } from '../../constants/Announce';
import { POSTAL_ADDRESS_REG, POSTAL_CODE_REG, TTITLE_REG } from '../../constants/regex';
import AccountServices from '../../services/account.service';
import AnnounceService from '../../services/announce-service';
import Axios from '../../services/axios.service';
import { bindataToFile, createFileFromBindata, getCitiesOfDepartement, getDepartementOfCountry, getDepartmentByStatecode } from '../../_utils/functions/functions';
import { AnnounceDTO } from '../../_utils/model/dto/announceDto';
import { Room } from '../../_utils/model/rooms-model';
import { Checkbox } from '../advertise-accommodation/form-step-two';
import Form from '../shared/forms/forms';

interface InputImgFileProp {
    clickLoadImgFile: (id: number) => void,
    handleImageFileChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void
    id: number
    src:any
}

const InputImgFile:FC<InputImgFileProp> = (props) => {
    const {clickLoadImgFile, handleImageFileChange, id, src} = props;
    return (
        <div className='flex center border-dashed-1 br-1 add-img-box pointer hover-success m-half my-half' onClick={() => clickLoadImgFile(id)} key={id}>
            <MdAddPhotoAlternate fontSize={30}/>
            <input 
                type="file" 
                name="principalImg" 
                id={"input-mg-" + id} 
                accept="image/*" hidden={true}
                onChange={(e)=>handleImageFileChange(e,id)}
            />                        
            <img src={(src && src.type !=="image/png")?`data:image/png;base64,${src}`:(src?URL.createObjectURL(src):"#")} alt="" className={`w-full br-1 images-dest-${id}`}/>
            
        </div>
    );
}

const  EditAnnouncement:FC<any> = (props) => {
    const { announcement } = props;
    const [erroeMessage, setErrorMessage] = useState('');
    const [nbImages, setNbImages] = useState(0);
    const [announce, setAnnounce] = useState(announcement);
    const [stepActive, setStepActive] = useState('FormStepOne');
    const [isInfoPrincipalActive, setisInfoPrincipalActive] = useState(false);
    const location = useLocation();
    const paths = location.pathname.split('/');
    const announceId = paths[paths.length - 1];


    useEffect(() => {
        AnnounceService.getAnnouncementById(announceId).then((res) => {
            const announcementValue= new Room(
                res.id,
                res.title,
                res.description,
                res.ownerId,
                res.state,
                res.city,
                res.postalCode,
                res.address,
                res.nbRoomatesSeached,
                res.publishedAt,
                res.price,
                res.principalPicture,
                res.announceType,
                res.isOwnerCertified,
                res.roomType,
                res.roomfurnishedType,
                res.genderSearched,
                res.images,
            )
            setAnnounce(announcementValue);
            setNbImages(announcementValue.images.length);
        })
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.value
        })
    }

    const handleTexteAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.value
        });
    }

    const handleSelectChange = (type: string, e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.options.selectedIndex;
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.options[selectedIndex].value
        });
    }

    const handleInputRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.value
        })
        
    }

    const handleCheckboxChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {

        const index = announce?.genderSearched.indexOf(e.target.name);
        let genders:string[] = announce?.genderSearched;

        if(index===-1 && e.target.checked){
            genders.push(e.target.name);
        }else if(index!==-1){
            genders.splice(index,1);
        }

        setAnnounce({
            ...announce,
            [field]: genders
        })
    }

    const handleFurnishedTypechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: (e.target.value==="Meublé")
        })
        
    }

    const clickLoadImgFile = (id: number) => {
        const inputFilebtn = document.getElementById('input-mg-' + id);
        if(inputFilebtn) {
            inputFilebtn.click();
        }
    }

    const handleFileChange = (field:string, files: File|File[]) => {

        setAnnounce({
            ...announce,
            [field]: files
        })
    }

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const files = e.target.files;
        const imagesDestination = document.querySelectorAll('.images-dest-' + id);
        if(imagesDestination) {
            if(files){
                const url = URL.createObjectURL(files[0]);
                (imagesDestination[0] as HTMLImageElement).src = url;
                if(imagesDestination[0].classList.contains('hide')) {
                    imagesDestination[0].classList.remove('hide');
                }
                if(id===0){
                    handleFileChange('principalPicture',files[0]);
                }else {
                    console.log(files[0]);
                    let images:File[] = announce.images;
                    images[id-1] = files[0];
                    handleFileChange('images',images);
                }
            }else {
                // imagesDestination[0].classList.add('hide');
            }
        }

        console.log(announce);
    }

    const isValidForm = () => {
        if(
            !TTITLE_REG.test(announce?.title) ||
            !POSTAL_ADDRESS_REG.test(announce?.address) ||
            !POSTAL_CODE_REG.test(announce?.postalCode) ||
            announce?.genderSearched?.length<=0 ||
            announce?.announceType==='' ||
            announce?.price <= 0 ||
            announce?.nbRoomatesSeached <= 0
        ) {
            return false;
        }
        return true;
    }

    const goNext = () => {
        if(isValidForm()) {
            setStepActive("FormStepTwo");
        } else {
            setErrorMessage("Veillez remplir correctement tous les champs svp !")
        }
    }


    const postAd = () => {
        // TODO: envoyer les informations et les sauvegarder dans la base de données
        // TODO: verifier si les images existantes ont changées avec (le type du fichier)
        // TODO: envoyer uniquement les nouvelles images
        if(!announce.principalPicture){
            setErrorMessage("L'annonce doit avoir au moins l'image principale");
        }else {
            const ownerId = AccountServices.getUserId(); 
            if(ownerId && localStorage.getItem('token')){
                Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
                announce.ownerId = ownerId;
                
                const formdata: FormData = new FormData();

                const announcement = new AnnounceDTO(
                    announce.id,
                    announce.title,
                    announce.description,
                    announce.ownerId,
                    announce.state,
                    announce.city,
                    announce.postalCode,
                    announce.address,
                    announce.nbRoomatesSeached,
                    new Date(announce.publishedAt.getTime()),
                    announce.price,
                    announce.announceType,
                    announce.isOwnerCertified,
                    announce.roomType,
                    announce.roomfurnishedType,
                    announce.genderSearched,
                );

                announce.images.forEach((file:File, i:number) => {

                    if(file.type?.includes('image')){
                        formdata.append("files", file, file.name);
                        console.info("images ---> file")
                    }else {
                        console.info("images ---> bytefiles")
                        formdata.append("bytefiles", file);
                    }
                });



                formdata.append("announce", JSON.stringify(announcement));
                if(announce.principalPicture.type?.includes('image')) {
                    formdata.append("imagepp", announce.principalPicture);

                    console.info("imagepp ---> file")
                    AnnounceService.editAnnounce(formdata).then((res)=>{
                        // navigate('/app/rooms/');
                    }).catch((err)=>{
                        console.log(err);
                    });

                }else {
                    formdata.append("imagepp", announce.principalPicture);
                    console.info("imagepp ---> bytefiles")
                    AnnounceService.editAnnouncebin(formdata).then((res)=>{
                        // navigate('/app/rooms/');
                    }).catch((err)=>{
                        console.log(err);
                    });
                }
            }
        }
    }

  return (
    <div className='container'>
        <div className='w-100 flex space-between'>
            <div className="infos border-1 br-1 p-1 w-half">
                <h4 className="text-center">
                    Information
                </h4>
                <hr />

                {
                    stepActive==="FormStepOne" &&
                    <>
                        {
                            erroeMessage && 
                            <div className="danger p-1">
                                {erroeMessage}
                            </div>
                        }
                        
                        <Form.InputText 
                            name="title" 
                            value={announce?.title} 
                            label={"nom de l'annonce"} 
                            placeholder={'ex: je mets une partie de ma maison en location'} 
                            handleInputChange={handleInputChange}
                            pattern="^(.|\s)*[a-zA-Z]+(.|\s){5,}$"
                            errorMessage='Titre trop court'
                            required={true}
                        />

                        <Form.TextArea 
                            name = {'description'}
                            value = {announce?.description}
                            label = {'Description'}
                            placeholder = {"Ajoutez une petite description sur votre annonce pour plus d'informations"}
                            rows = {5} 
                            cols= {33}
                            handleTexteAreaChange={handleTexteAreaChange}
                            pattern='^(.|\s)*[a-zA-Z]+(.|\s)*$'
                            errorMessage='veillez remplir correctement ce champs svp'
                        />


                        <Form.SelectForm 
                            label='Departement'
                            name ={'state'}
                            options={
                                getDepartementOfCountry('FR').map(departement=>  (
                                    <option 
                                        value={departement.isoCode} 
                                        key={departement.isoCode} 
                                        selected={departement.name===(getDepartmentByStatecode('FR', announce?.state) && getDepartmentByStatecode('FR', announce?.state).name)}
                                    > 
                                        {departement.name}
                                    </option>
                                ))
                            }
                            handleSelectChange ={handleSelectChange}
                        />

                        <Form.SelectForm 
                            label='Ville'
                            name ={'city'}
                            options={
                                getCitiesOfDepartement('FR', announce?.state).map((city,i)=>  (
                                    <option value={city.name} key={city.name} selected={city.name===announce?.city}> {city.name}</option>
                                ))
                            }
                            handleSelectChange ={handleSelectChange}
                        />

                        <Form.InputText 
                            name={'postalCode'} 
                            value={announce?.postalCode} 
                            label={'Code postal'} 
                            placeholder={'ex: 33000'} 
                            handleInputChange={handleInputChange}
                            pattern = '^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$'
                            errorMessage='code postal invalid'
                            required={true}
                        />

                        <Form.InputText 
                            name={'address'} 
                            value={announce?.address} 
                            label={'Adresse complète'} 
                            placeholder={'ex: 22 rue marechal josh'}
                            handleInputChange={handleInputChange}
                            pattern='^\s*\S+(?:\s+\S+){2,}'
                            errorMessage='adresse invalid'
                            required={true}
                        />

                        <div className={'my-1 flex flex-end'}>
                            
                            <button 
                                type='button'
                                className={'p-half br-half pointer mt-1 bg-light-blue'}
                                onClick={goNext}
                            > <h3>suivant</h3></button>

                        </div>
                    </>
                }

                {
                    stepActive==="FormStepTwo" &&
                    <>
                
                        <h3 className='text-center my-1'>Information sur le logement</h3>
                        <div className='my-half flex column'>
                            <fieldset className='br-half'>
                                <legend><strong>Coloc Récherché(e)s:</strong></legend>
                                <Checkbox name={'homme'} label={'Homme'} handleCheckboxChange={handleCheckboxChange} checked={announce?.genderSearched?.indexOf('homme')!==-1}/>
                                <Checkbox name={'femme'} label={'Femme'} handleCheckboxChange={handleCheckboxChange} checked={announce?.genderSearched?.indexOf('femme')!==-1}/>
                            </fieldset>
                        </div>

                        <div className='my-half flex column'>
                            <fieldset className='br-half'>
                                <legend><strong>Type de colocation:</strong></legend>
                                <Form.InputRadio name={'roomType'} label={'Appartement'} value={'APPARTEMENT'} handleInputRadioChange={handleInputRadioChange} checked={announce?.roomType==="APPARTEMENT"}/>
                                <Form.InputRadio name={'roomType'} label={'Maison'} value={'MAISON'}  handleInputRadioChange={handleInputRadioChange}  checked={announce?.roomType==="MAISON"}/>
                                <Form.InputRadio name={'roomType'} label={'Studio'} value={'STUDIO'} handleInputRadioChange={handleInputRadioChange}  checked={announce?.roomType==="STUDIO"}/>
                            </fieldset>
                        </div>

                        <div className='my-half flex column'>
                            <fieldset className='br-half'>
                                <legend> <strong>Etat de la Localité:</strong></legend>
                                <Form.InputRadio name={'roomfurnishedType'} label={'Non Meublé'} value={'Non Meublé'} handleInputRadioChange={handleFurnishedTypechange} checked={!announce?.roomfurnishedType}/>
                                <Form.InputRadio name={'roomfurnishedType'} label={'Meublé'} value={'Meublé'} handleInputRadioChange={handleFurnishedTypechange} checked={announce?.roomfurnishedType}/>
                            </fieldset>
                        </div>

                        <Form.InputNumber 
                            name={'price'} 
                            value={announce?.price} 
                            label={'Prix'} 
                            placeholder={'ex: 800'}
                            handleInputChange={handleInputChange}
                            pattern='^([0-9]{0,2}((.)[0-9]{0,2}))$'
                            errorMessage=''
                            required={true}
                        />

                        <Form.InputNumber 
                            name={'nbRoomatesSeached'} 
                            value={announce?.nbRoomatesSeached} 
                            label={'Nombre de colocs Récherchés'} 
                            placeholder={'ex: 3'}
                            handleInputChange={handleInputChange}
                            pattern='^[1-9]+\d*$'
                            errorMessage='veillez remplir correctement ce champs'
                            required={true}
                        />

                        <div className={'my-1 flex space-between'}>
                            <button 
                                className='p-half br-half pointer mt-1'
                                onClick={() => setStepActive('FormStepOne')}
                            > <h3>precedant</h3></button>
                        </div>

                        {
                            erroeMessage && 
                            <div className="danger p-1">
                                {erroeMessage}
                            </div>
                        }
                    </>
                }
            </div>


            <div className="images border-1 br-1 w-half">
                <h4 className="text-center">
                    Images
                </h4>
                <hr />

                <div className='relative column center'>
                    <div>
                        <div className="flex center my-1 relative">
                            <h3>Image principale</h3>
                            <AiOutlineQuestionCircle className='mx-half pointer' fontSize={22}
                            onClick = {()=> setisInfoPrincipalActive(!isInfoPrincipalActive)}
                            />
                            {
                                isInfoPrincipalActive && <div className="bottom-0 bg-light-blue z-9999 p-1">
                                    C'est cette photo quis'affichera, une fois que les <br /> utilisateurs <br /> 
                                    tomberont sur votre offre.
                                </div>
                            }
                        </div>
                        {
                            erroeMessage && 
                            <div className="danger p-1">
                                {erroeMessage}
                            </div>
                        }
                    </div>
                    
                    <div className='flex center'>
                        <InputImgFile clickLoadImgFile={clickLoadImgFile} handleImageFileChange={handleImageFileChange} id={0} src={announce?.principalPicture}/>
                    </div>

                    <div className='flex center my-2 wrap'>
                        <h3 className='my-1 w-full text-center mb-half shadow py-half'>Ajoutez plus d'images</h3>
                        {
                            announce?.images.map((image: any, index: number)=>{
                                return (
                                    <InputImgFile clickLoadImgFile={clickLoadImgFile} handleImageFileChange={handleImageFileChange} id={index+1} key={index} src={image}/>
                                )
                            })
                        }

                        {
                            nbImages< MAX_IMG_PER_ANNOUNCE &&
                            (
                                <button 
                                    className={'flex center p-half border-1 br-half pointer mt-1 bg-none w-half ml-1 my-2'}
                                    type="button"
                                    onClick={()=>{
                                        let images:File[] = announce.images;
                                        images.push(null as unknown as File);
                                        handleFileChange('images',images);
                                        setNbImages(nbImages+1);
                                    }}
                                > 
                                    <FcAddImage fontSize={40}/>
                                </button>
                            )
                        }
                    </div>

                </div>
            </div>

            
        </div>
        <div className="w-100 flex center mb-2">
            <button 
                className={'flex center p-half br-half pointer mt-1 bg-light-gold w-half ml-1 my-2'}
                type="button"
                onClick={postAd}
            > 
                <AiOutlineSave fontSize={20}/>
                <h3>Valider</h3>
            </button>
        </div>
    </div>
  )
}

export default EditAnnouncement;
