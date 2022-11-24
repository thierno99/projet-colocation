// import React, { FC } from 'react';
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
            description: "Vous avez la possibilité de voir toutes les propositons de logement à votre proximité.."// de logement à votre proximité
        },

        {
            image: <TfiAnnouncement fontSize={100} color={'brown'}/>,
            title: "Faire une Annonce",
            description: "Vous avez la possibilité de publier des annonces de logement."
        },

        {
            image: <FcManager fontSize={100} color={'brown'}/>,
            title: "Manager votre compte",
            description: `Vous avez la possibilité de gerer vos factures, vos tâches, contacter le proprio ...` // vos tâches, contacter le proprio
        },
    ];
    return (
        <div className='flex space-between wrap'>
            {
                services.map(service => <ClassicCard image={service.image} title={service.title} description={service.description} key={service.title} />)
            }
        </div>
    );
}

export default OurService ;