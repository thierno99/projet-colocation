import { nbDaysDateBeetween2Dates, nbMonthBeetween2Dates } from "../../services/date-service";
import { State, City, IState }  from 'country-state-city';

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

// country-state-city

export const getCitiesOfCountry = (countryCode: string) => {
    return City.getCitiesOfCountry(countryCode);
}

export const getDepartementOfCountry = (countryCode: string ='FR') => {
    return State.getStatesOfCountry(countryCode).filter(state => City.getCitiesOfState(countryCode, state.isoCode).length>0);
}

export const getCitiesOfDepartement = (countryCode: string ='FR', stateCode: string) => {
    return City.getCitiesOfState(countryCode, stateCode);
}

export const getDepartmentByStatecode = (countryCode: string ='FR', stateCode: string) => {
    return State.getStateByCodeAndCountry(stateCode,countryCode.trim()) as IState
    // getDepartmentByStatecode('FR', e.target.options[selectedIndex].value).name
}

// string - bytearray

export const stringToBytes = (str: string) => {
    let utf8Encode = new TextEncoder();

    return utf8Encode.encode(str);
}

export const BytesToString = (bytes: BufferSource) => {
    const decoder = new TextDecoder();
   return decoder.decode(bytes);
}

export function bindataToFile(bindata: any, filename: string, mimeType: any) {
    const bytes = new Uint8Array(bindata);
    const blob = new Blob([bytes], { type: mimeType });
    return new File([blob], filename, { type: mimeType });
}

export const createFileFromBindata = (bindata: BlobPart, fileName: string, fileType: any) => {
    const blob = new Blob([bindata], { type: fileType });
    const file = new File([blob], fileName, { type: fileType });
    return file;
  }