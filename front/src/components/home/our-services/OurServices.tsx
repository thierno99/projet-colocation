import React from 'react';
import { FcManager } from 'react-icons/fc';
import { ImFinder } from 'react-icons/im';
import { TfiAnnouncement } from 'react-icons/tfi';

import ClassicCard from '../../shared/cards/Classic-card';
import { CardProps } from "../../shared/Interfaces";

const OurService = () => {
    const services: CardProps[] = [
        {
            image: <ImFinder fontSize={100} color={'pink'}/>,
            title: "Rechercher un coloc",
            description: "Vous avez la possibilité de voir toutes les propositons de logement à votre proximité..",// de logement à votre proximité
            urlStr: '/app/rooms/'
        },

        {
            image: <TfiAnnouncement fontSize={100} color={'brown'}/>,
            title: "Faire une Annonce",
            description: "Vous avez la possibilité de publier des annonces de logement.",
            urlStr:''
        },

        {
            image: <FcManager fontSize={100} color={'brown'}/>,
            title: "Manager votre compte",
            description: `Vous avez la possibilité de gerer vos factures, vos tâches, contacter le proprio ...`, // vos tâches, contacter le proprio
            urlStr: ''
        },
    ];
    return (
        <div className='flex space-between wrap'>
            {
                services.map(service => <ClassicCard image={service.image} title={service.title} description={service.description} key={service.title} urlStr={service.urlStr} />)
            }
        </div>
    );
}

export default OurService ;