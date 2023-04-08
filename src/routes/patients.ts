import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from '../utils';
import { NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});
router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);  
    } catch (error : unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
});

router.get('/:id',(req,res)=> {
    const id =req.params.id;
        try{
            const patient = patientService.getPatient(id);
            res.send(patient);
        }catch (error : unknown) {
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
        }
});
router.post('/:id/addentry',(req,res)=> {
    const id =req.params.id;
    try {
        const newEntry : NewEntry =toNewEntry(req.body);
        const entry  = patientService.addEntryToPatient(id,newEntry);
        entry.id == "Ahmed";
        res.send(entry);
    }catch (error : unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
    }
});
export default router;