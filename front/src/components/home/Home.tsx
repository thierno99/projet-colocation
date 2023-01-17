import React from 'react';
import Banner from './banner/Banner';
import '../../styles/home.css';
import ContributionValue from './contribution-values/Contribution-value';
import OurService from './our-services/OurServices';
import { ButtonPrimary } from '../shared/buttons/Buttons';
import SampleAnnouncement from './sample-annoncement/SampleAnnouncement';
import { useNavigate } from 'react-router-dom';

const ColocType = () => {
    const navigate = useNavigate();

    const gotoRooms = () => {
        navigate('/app/rooms');
    }

    return(
        <div className='py-1'>
            <div className="flex row space-around wrap">
                <div className='pointer py-1 bg-light-sucess p-1' onClick={gotoRooms}>
                    <h2>Trouver un logement</h2>
                    <p>Créez votre profil, ajoutez vos critères de recherches et trouves votre perle Rare <br /> ENJOY !</p>
                </div>

                <div className='pointer py-1 bg-light-blue p-1' onClick={()=>{/*alert('vous devez vous connecté pour publier une annonce');*/navigate('/app/rooms/make-announce')}}>
                    <h2>Proposer un logement</h2>
                    <p>
                        Lancez votre annonces avec vos attentes / contraintes. Recevez les demandes<br />
                        ENJOY !
                    </p>
                </div>
            </div>
        </div>
    );
}

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='container'>
            <Banner/>
            <br />
            <hr />
            <div className="my-3 shadow-top">
                <h1 className='my-1 p-1 text-center'>Vous voulez ?</h1>
                <ColocType/>
            </div>
            <hr />
            <div className="my-3">
                <h1 className='my-1 p-1 text-center'>Le pétit plus pour vous</h1>
                <ContributionValue/>
            </div>
            
            <div className="my-3 flex center bg-light-blue pt-1">
                <ButtonPrimary title={'Je m\'inscris Maintenant !'} to={'/app/register'} classes={['bg-light-gold']}/>
            </div>
            
            <div className="my-3">
                <h1 className='my-1 p-1 text-center'>Les Services que nous vous proposons</h1>
                <OurService/>
            </div>

            <div className="my-3 flex center bg-light-blue pt-1">
                <button className={'p-1  mb-1 pointer text-primary shadow bg-light-sucess'} onClick={()=>{/*alert('vous devez vous connecté pour publier une annonce');*/navigate('/app/rooms/make-announce')}}>
                    Je Propose une offre
                </button>
            </div>

            

            <div className="my-3">
                <h1 className='my-1 p-1 text-center'>Quelques annonces</h1>
                <SampleAnnouncement/>
            </div>

            <div className="my-3 flex center bg-light-sucess pt-1">
                <ButtonPrimary title={'Decouvrir plus'} to={''} classes={['bg-light-blue']}/>
            </div>
        </div>
    );
}

export default Home ;