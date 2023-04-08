import { NewPatient ,Entry, HealthCheckEntry ,HospitalEntry , OccupationalHealthcareEntry, NewEntry ,HealthCheckRating ,Discharge, SickLeave ,Diagnosis} from "./types";
import { Gender } from "./types";

const toNewPatient = (object : unknown) : NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        if('entries' in object && object.entries instanceof Array){
          const newPatient : NewPatient = {
            name: parseName(object.name),
            dateOfBirth:parseDateOfBirth(object.dateOfBirth),
            ssn:parseSSN(object.ssn),
            gender:parseGender(object.gender),
            occupation:parseOccupation(object.occupation),
            entries:parseEntries(object.entries)
            };
            return newPatient;  
        }else{
            const newPatient : NewPatient = {
                name: parseName(object.name),
                dateOfBirth:parseDateOfBirth(object.dateOfBirth),
                ssn:parseSSN(object.ssn),
                gender:parseGender(object.gender),
                occupation:parseOccupation(object.occupation),
                entries:[]
                };
                return newPatient; 
        }
        
    }
    throw new Error('Incorrect data: some fields are missing');
};
export const toNewEntry = (object : unknown) : NewEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
      if('description' in object && 'date' in object && 'specialist' in object &&  'type' in object) {
        if(object.type === 'HealthCheck' && 'healthCheckRating' in object) {
                return {
                    type :"HealthCheck" ,
                    description: parseEntryDescription(object.description),
                    date :parseDateOfBirth(object.date),
                    specialist:parseEntrySpecialist(object.specialist),
                    healthCheckRating :parseHealthCheckRating(object.healthCheckRating),
                    diagnosisCodes:parseDiagnosisCodes(object)
                };
        }else if(object.type === 'Hospital' && 'discharge' in object && typeof object.discharge === 'object'){
                return {
                    type :"Hospital" ,
                    description: parseEntryDescription(object.description),
                    date :parseDateOfBirth(object.date),
                    specialist:parseEntrySpecialist(object.specialist),
                    discharge:parseEntryDischarge(object.discharge as Discharge),
                    diagnosisCodes:parseDiagnosisCodes(object)
                };

        }else if(object.type === "OccupationalHealthcare" && 'employerName' in object){
            if('sickLeave' in object && typeof object.sickLeave === 'object'){
                    return {
                        type: "OccupationalHealthcare",
                        description: parseEntryDescription(object.description),
                        date :parseDateOfBirth(object.date),
                        specialist:parseEntrySpecialist(object.specialist),
                        employerName:parseName(object.employerName),
                        sickLeave:parseSickLeave(object.sickLeave as SickLeave),
                        diagnosisCodes:parseDiagnosisCodes(object)
                        };
            }else {
                    return {
                        type: "OccupationalHealthcare",
                        description: parseEntryDescription(object.description),
                        date :parseDateOfBirth(object.date),
                        specialist:parseEntrySpecialist(object.specialist),
                        employerName:parseName(object.employerName),
                        diagnosisCodes:parseDiagnosisCodes(object)
                        };
            }
            
        }
      }
      throw new Error('Incorrect data: some fields are missing');
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};
const isDate = (date: string): boolean => {
return Boolean(Date.parse(date));
};
const isGender = (param: string): param is Gender => {
return Object.values(Gender).map(v => v.toString()).includes(param);
};
const isHealthCheckRating = (param:number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v as number).includes(param);
};
const isDischarge = (param:object): param is Discharge =>{
    if('date' in param && 'criteria' in param && isString(param.date) && isDate(param.date) && isString(param.criteria)) {
        return true;
    }else{
        return false;
    }
};
const isSickLeave = (param:object): param is SickLeave =>{
    if('startDate' in param &&isString(param.startDate) && isDate(param.startDate) && 'endDate' in param &&isString(param.endDate) && isDate(param.endDate) ) {
        return true;
    }else{
        return false;
    }
};
const parseName = (name: unknown): string => {
    if (!isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };
const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseGender =(gender :unknown) : Gender =>{
    if(!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation =(occupation : unknown) : string =>{
    if(!isString(occupation)){
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseEntryDescription =(description : unknown) : string =>{
    if(!isString(description)){
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const parseEntrySpecialist = (specialist : unknown) : string =>{
    if(!isString(specialist)){
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const parseHealthCheckRating =(rating : unknown) : HealthCheckRating =>{
    if(!isNumber(rating) || !isHealthCheckRating(rating)){
        throw new Error('Incorrect or missing HealthCheckRating');
    }
    return rating;
};
const parseEntryDischarge = (discharge :object) :Discharge =>{
    if(!isDischarge(discharge)){
        throw new Error('Incorrect or missing Discharge');
    }
    return discharge;
};
const parseSickLeave = (sickLeave :object) :SickLeave => {
    if(!isSickLeave(sickLeave)){
        throw new Error('Incorrect or missing SickLeave');
    }
    return sickLeave;
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};
const parseSSN =(ssn : unknown) : string =>{
    if(!isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseEntries = (entries : unknown[]) : Entry[] =>{
    const parsedEntries = entries
            .map((entry : unknown) => {       
                if(entry instanceof Object && 'id' in entry && 'description' in entry && 'specialist' in entry && 'date' in entry && 'type' in entry){

                    switch(entry.type){
                        case 'HealthCheck':
                            return entry as HealthCheckEntry;
                        case 'Hospitals':
                            return entry as HospitalEntry;
                        case 'OccupationalHealthcare':
                            return entry as OccupationalHealthcareEntry;
                        default:
                            throw new Error('Incorrect or missing enteries');    
                    }
                }else {
                    throw new Error('Incorrect or missing enteries');
                }
            });
    return parsedEntries;
};
export default toNewPatient;