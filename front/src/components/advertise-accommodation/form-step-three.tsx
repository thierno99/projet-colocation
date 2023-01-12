import { ChangeEvent, FC, useState } from 'react';

import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdAddPhotoAlternate } from 'react-icons/md';

import { FormStepProps } from './form-step-one';

interface InputImgFileProp {
    clickLoadImgFile: (id: number) => void,
    handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void
    id: number
}

const InputImgFile:FC<InputImgFileProp> = (props) => {
    const {clickLoadImgFile, handleImageFileChange, id} = props;
    return (
        <div className='flex center border-1 br-1 add-img-box pointer hover-success m-half' onClick={() => clickLoadImgFile(id)}>
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
    const { stepActive, setStepActive } = props;
    const [isInfoPrincipalActive, setisInfoPrincipalActive] = useState(false);

    const clickLoadImgFile = (id: number) => {
        const inputFilebtn = document.getElementById('input-mg-' + id);
        if(inputFilebtn) {
            inputFilebtn.click();
        }
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
            }else {
                imagesDestination[0].classList.add('hide');
            }
        }
    }


    return (
        <div className='shadow'>
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
                </div>
                
                <div className='flex center'>
                    <InputImgFile clickLoadImgFile={clickLoadImgFile} handleImageFileChange={handleImageFileChange} id={0}/>
                </div>

                <div className='flex center my-2 wrap'>
                    <h3 className='my-1 w-full text-center mb-half shadow py-half'>Ajoutez plus d'images</h3>
                    {
                        ["","","", ""].map((item, index)=>{
                            return (
                                <InputImgFile clickLoadImgFile={clickLoadImgFile} handleImageFileChange={handleImageFileChange} id={index+1}/>
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
                        onClick={() => setStepActive('FormStepThree')}
                    > <h3>Publier l'annonce</h3></button>

                </div>

            </div>

        </div>
    );
}
export default FormStepThree;