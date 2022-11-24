import { BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { TiArrowUpOutline } from 'react-icons/ti' ;
import { ButtonPrimary } from '../buttons/Buttons';


const goUp=()=> {
    window.scrollTo({
        top:0,
        left:0,
        behavior:'smooth'
    });

}
const Footer = () => {

    return(
        <div className="p-1 text-light">
            <p className="flex flex-end">
                <TiArrowUpOutline
                    fontSize={46}
                    color="yellow"
                    className='pointer'
                    onClick={()=>goUp()}
                />
            </p>
            <div className="text-center flex space-around">
                <div>
                    <h2>Trouve ton coloc aujourd'hui</h2>
                    <p>inscrit-toi pour en profiter !</p>
                </div>

                <ButtonPrimary title={'Je m\'inscrit dès maintenant'} to={''} classes={['bg-light-blue br-1']}/>
            </div>
            <hr />
            <div className="flex space-around mt-2">
                <div>
                    <h3 className='p-1'>A propos de MyColoc</h3>
                    <p className='p-1'>Quis sommes nous ?</p>
                    <p className='p-1'>Nous contacter</p>
                    <p className='p-1'>FAQ</p>
                </div>
                <div>
                    <h3>Nos Services</h3>
                    <p className='p-1'>Recherche d'appartement</p>
                    <p className='p-1'>trouver un coloc</p>
                    <p className='p-1'>Gestion de tâches</p>
                </div>
                <div>
                    <h3>Nos Réseaux</h3>
                    <div className="flex mt-1">
                        <BsFacebook
                            className='mx-1'
                            fontSize={36}
                        />
                        <BsInstagram
                            fontSize={36}
                            className='mx-1'
                        />

                        <BsWhatsapp
                            className='mx-1'
                            fontSize={36}
                        />


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer ;