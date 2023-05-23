export type TKnowledge = {
    description     : string;
    level           : string;
    experience      : string;
    time            : string;
}

export type TStudies = {
    name            : string;
    experience      : string;
}

export type TJob = {
    title           : string;
    description     : string;
    level           : string;
    vacancies       : number;
    knowledges      : TKnowledge[];
    minimumWage     : number;
    maximunWage     : number;
    personnel       : number;
    typeOfIndustry  : string;
    typeOfContract  : string;
    typeOfPosition  : string;
    typeOfWork      : string;
    category        : string;
    city            : string;
    state           : string;
    country         : string;
    labels          : string[];
    skills          : string[];
    benefits        : string[];
    desirables      : string[];
    minimumStudies  : TStudies[];
    files?          : FileList | null | undefined;
}