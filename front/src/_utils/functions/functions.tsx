import { nbDaysDateBeetween2Dates, nbMonthBeetween2Dates } from "../../services/date-service";

export const formatLongText = (text: string, nb: number) => {
    if(text.length <= nb)
    return [text];
    let results: string[] =[];
    const strArray = text.split(' ');
    let start = 0;
    for(let i = 0 ; i < strArray.length ; i++) {
        if( i > 0 && i % nb === 0){
            results.push( strArray.splice(start, nb+i).join(' ') );
            start = i;
        }
    }
    
    results.push(strArray.join(' '));

    return results ;
}

export const replaceDotDot = (text: string, nbcharacters: number) => {
    if(text.length<= nbcharacters){
        return text
    }
    text= text.slice(0, nbcharacters);
    return text.concat('...');
}

export const goUp=()=> {
    window.scrollTo({
        top:0,
        left:0,
        behavior:'smooth'
    });

}

export const publishedAtFormatMsg = (publishedAt: Date) => {
    const nbdays = nbDaysDateBeetween2Dates(publishedAt);
    if (nbdays === 0){
        return 'aujourd\'hui';
    }

    if (nbdays === 1){
        return 'Il y\'a 1 jour';
    }
    if (nbdays <= 31) {
        return `Il y'a ${nbdays} jours`
    }

    return `Il y'a ${nbMonthBeetween2Dates(publishedAt)} mois`;
}