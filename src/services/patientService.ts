import { v4 as uuid } from 'uuid';

import patients from '../../data/patients';
import {Entry, NewEntry, NewPatient, Patient} from "../types";

const getPatients = ():Patient[] =>{
    return patients;
};
const addPatient = (patient : NewPatient): Patient => {
    const id: string = uuid();
    const newPatient = {
        id,
        ...patient
    };
    patients.push(newPatient);
     
    return newPatient;
};
const getPatient = (id: string): Patient => {
    const patient: Patient | undefined = patients.find(patient => patient.id === id);
    if(patient){
       return patient; 
    }else{
        throw new Error("Patient Does not Exist with the id " + id);
    }
    
};
const addEntryToPatient = (id :string , newEntry: NewEntry) : Entry => {
    const newId: string = uuid();
    const patient: Patient | undefined = patients.find(patient => patient.id === id);
    if(patient){
        const entry :Entry = {
            id :newId,
            ...newEntry
        };
        patient.entries =patient.entries.concat(entry);
        return entry;
     }else{
         throw new Error("Patient Does not Exist with the id " + id);
     }
};
export default {
    getPatients,
    addPatient,
    getPatient,
    addEntryToPatient
};