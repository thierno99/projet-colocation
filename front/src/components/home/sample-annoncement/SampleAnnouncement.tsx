import React from 'react';
import { FcManager } from "react-icons/fc";
import { ImFinder } from "react-icons/im";
import { TfiAnnouncement } from "react-icons/tfi";
import RowCard from "../../shared/cards/row-card";
import { CardProps } from "../../shared/Interfaces";

const SampleAnnouncement = () => {
  const services: CardProps[] = [
    {
        image: <ImFinder fontSize={100} color={'pink'}/>,
        title: "Richard, 35 ans",
        description: "Vous avez la possibilité de voir toutes les propositons de logement à votre proximité..",// de logement à votre proximité
        urlStr:''
    },

    {
        image: <TfiAnnouncement fontSize={100} color={'brown'}/>,
        title: "Zoé, 23 ans",
        description: "Vous avez la possibilité de publier des annonces de logement.",
        urlStr: ''
    },

    {
        image: <FcManager fontSize={100} color={'brown'}/>,
        title: "Michelle, 28 ans",
        description: `Vous avez la possibilité de gerer vos factures, vos tâches, contacter le proprio ...`, // vos tâches, contacter le proprio
        urlStr: ''
    },
];
return (
    <div className='flex space-between wrap'>
        {
            services.map(service => <RowCard image={service.image} title={service.title} description={service.description} key={service.title} urlStr={service.urlStr} />)
        }
    </div>
);
}

export default SampleAnnouncement;