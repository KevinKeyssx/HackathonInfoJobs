export type TSalary = {
    minimun     : number;
    maximun     : number;
    type        : string;
    time        : string;
    coin        : string;
}
export type TKnowledge = {
    description : string;
    level       : string;
    experience  : string;
    time        : string;
}

export type TStudies = {
    name        : string;
    experience  : string;
}

export type TStaff = {
    min?        : number;
    max?        : number;
}

export type TDescription = {
    prompt      : string;
    stars       : number;
    message     : string;
    isLoaded    : boolean;
}

export type TCustomInfo = {
    name        : string;
    values      : string[];
}

export type TJob = {
    title               : string;
    description         : TDescription;
    aditionalInfo?      : string[];
    level               : string;
    vacancies           : number;
    knowledges          : TKnowledge[];
    salary              : TSalary
    staff               : TStaff;
    typeOfIndustry      : string;
    typeOfContract      : string;
    workingDay          : string;
    typeOfPosition      : string;
    modality            : string;
    typeOfWork          : string;
    category            : string;
    city                : string;
    state               : string;
    country             : string;
    labels              : string[];
    skills              : string[];
    benefits            : string[];
    desirables          : string[];
    minimumStudies      : TStudies[];
    dailyTasks?         : string[];
    goalsObjectives?    : string[];
    customInfo?         : TCustomInfo[] | null | undefined;
    files?              : FileList | null | undefined;
}