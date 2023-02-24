import { ChangeEvent, FC, useState } from 'react';

import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AccountServices from '../../services/account.service';
import AnnounceService from '../../services/announce-service';
import Axios from '../../services/axios.service';
import { ARoom } from '../../_utils/model/rooms-model';

import { FormStepProps } from './form-step-one';

interface InputImgFileProp {
    clickLoadImgFile: (id: number) => void,
    handleImageFileChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void
    id: number
}

const InputImgFile:FC<InputImgFileProp> = (props) => {
    const {clickLoadImgFile, handleImageFileChange, id} = props;
    return (
        <div className='flex center border-dashed-1 br-1 add-img-box pointer hover-success m-half' onClick={() => clickLoadImgFile(id)}>
            <MdAddPhotoAlternate fontSize={30}/>
            <input 
                type="file" 
                name="principalImg" 
                id={"input-mg-" + id} 
                accept="image/*" hidden={true}
                onChange={(e)=>handleImageFileChange(e,id)}
            />                        
            <img src="#" alt="" className={`w-full br-1 images-dest-${id} hide`}/>
        </div>
    );
}

const FormStepThree: FC<FormStepProps> = (props) => {
    const { announce, stepActive, setStepActive, setAnnounce } = props;

    const [isInfoPrincipalActive, setisInfoPrincipalActive] = useState(false);
    const [erroeMessage, setErroeMessage] = useState('');

    const navigate = useNavigate();

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
                    const index = announce.images.indexOf(files[0]);

                    let images:File[] = announce.images;

                    if(index===-1 && files[0]){
                        images.push(files[0]);
                    }
                    handleFileChange('images',images);
                }
            }else {
                imagesDestination[0].classList.add('hide');
            }
        }

        console.log(announce);
    }

    const postAd = () => {
        if(!announce.principalPicture || !announce.principalPicture){
            setErroeMessage("L'annonce doit avoir au moins l'iamge principale");
        }else {
            const ownerId = AccountServices.getUserId(); 
            if(ownerId && localStorage.getItem('token')){
                Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
                announce.ownerId = ownerId;
                AnnounceService.postAnnouncement(new ARoom(
                    announce.title,
                    announce.description,
                    announce.ownerId,
                    announce.state,
                    announce.city,
                    announce.postalCode,
                    announce.address,
                    announce.nbRoomatesSeached,
                    announce.publishedAt.toString(),
                    announce.price,
                    "",
                    announce.announceType,
                    announce.isOwnerCertified,
                    announce.roomType,
                    announce.roomfurnishedType,
                    announce.genderSearched,
                    announce.images
                )).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                });
                console.log(localStorage.getItem('token'));
                navigate('/app/rooms/'+ ownerId);
            }
        }
    }
    return (
        <div className=''>
            <h3 className='text-center my-1 py-1 shadow'>Ajoutez des Images de votre proprieté</h3>
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
                    <InputImgFile clickLoadImgFile={clickLoadImgFile} handleImageFileChange={handleImageFileChange} id={0}/>
                </div>

                <div className='flex center my-2 wrap'>
                    <h3 className='my-1 w-full text-center mb-half shadow py-half'>Ajoutez plus d'images</h3>
                    {
                        ["","","", ""].map((item, index)=>{
                            return (
                                <InputImgFile clickLoadImgFile={clickLoadImgFile} handleImageFileChange={handleImageFileChange} id={index+1} key={index}/>
                            )
                        })
                    }
                </div>

                <div className={'my-1 flex center'}>
                    {
                        stepActive !== 'FormStepOne'?
                            <button 
                                className='p-half br-half pointer mt-1 mr-1'
                                onClick={() => setStepActive('FormStepTwo')}
                            > <h3>precedant</h3></button>
                        :   null
                    }
                    
                    <button 
                        className={'p-half br-half pointer mt-1 bg-gold ml-1'}
                        type="button"
                        onClick={postAd}
                    > <h3>Publier l'annonce</h3></button>

                </div>

            </div>

        </div>
    );
}
export default FormStepThree;