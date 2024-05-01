import data from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { parseId } from '../utils';

import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';

const getEntries = (): Patient[] => {
  return data;
};

const findById = (id: string): Patient => {
  const foundPatient = data.find((patient) => patient.id === id);
  if (foundPatient) {
    return foundPatient;
  }
  throw new Error(`Error: Patient with the given id was not found`);
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const id: string = parseId(uuid());
  const newPatient = {
    id: id,
    ...entry,
  };

  data.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const id: string = parseId(uuid());
  const newEntry: Entry = {
    id: id,
    ...entry,
  };

  const patientIndex = data.findIndex((p) => p.id === patientId);

  if (patientIndex === -1) {
    throw new Error('Patient not found');
  }

  data[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
