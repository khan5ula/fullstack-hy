import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  HealthCheckRating,
  Discharge,
  SickLeave,
  Diagnosis,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseId = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error('Incorrect or missing id');
  }

  return id;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error('Incorrect or missing specialist');
  }

  return criteria;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing data on discharge');
  }

  if (!('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Date or Criteria missing from discharge');
  }

  if (!isString(discharge.criteria)) {
    throw new Error('Discharge criteria should be a string');
  }

  const newDischarge: Discharge = {
    criteria: parseCriteria(discharge.criteria),
    date: parseDate(discharge.date),
  };

  return newDischarge;
};

const parseType = (
  type: unknown
): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  if (!isString(type)) {
    throw new Error('Incorrect or missing type');
  }

  switch (type) {
    case 'HealthCheck':
      return 'HealthCheck';
    case 'Hospital':
      return 'Hospital';
    case 'OccupationalHealthcare':
      return 'OccupationalHealthcare';
    default:
      throw new Error('Invalid type');
  }
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (Array.isArray(entries)) {
    entries.forEach((entry) => {
      if (!('type' in entry)) {
        throw new Error("Entry is missing 'type' field.");
      }

      if (!isString(entry.type)) {
        throw new Error('Invalid entry type.');
      }

      parseType(entry.type);
    });
  } else {
    throw new Error('Invalid entries format. Expected an array.');
  }

  return entries as Entry[];
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    typeof rating !== 'number' ||
    !Object.values(HealthCheckRating).includes(rating)
  ) {
    throw new Error(`Invalid health check rating: ${rating}`);
  }

  return rating as HealthCheckRating;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const { startDate, endDate } = object as {
    startDate: unknown;
    endDate: unknown;
  };

  if (typeof startDate !== 'string' || typeof endDate !== 'string') {
    throw new Error('Sick leave should have start and end dates');
  }

  return {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate),
  };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object) {
    return [];
  }

  if (Array.isArray(object)) {
    object.forEach((element) => {
      if (!isString(element)) {
        throw new Error('Invalid diagnosis code');
      }
    });
  }

  return object as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'type' in object &&
    'date' in object &&
    'specialist' in object
  ) {
    const newType = parseType(object.type);

    switch (newType) {
      case 'HealthCheck':
        if (!('healthCheckRating' in object)) {
          throw new Error(
            'Error: HealthCheck Entry should have health check rating'
          );
        }
        const newHealthCheckEntry: NewEntry = {
          description: parseDescription(object.description),
          type: newType,
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };

        if ('diagnosisCodes' in object) {
          newHealthCheckEntry.diagnosisCodes = parseDiagnosisCodes(
            object.diagnosisCodes
          );
        }
        return newHealthCheckEntry;

      case 'Hospital':
        if (!('discharge' in object)) {
          throw new Error('Error: Hospital Entry should have discharge');
        }
        const newHospitalEntry: NewEntry = {
          description: parseDescription(object.description),
          type: newType,
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          discharge: parseDischarge(object.discharge),
        };
        if ('diagnosisCodes' in object) {
          newHospitalEntry.diagnosisCodes = parseDiagnosisCodes(
            object.diagnosisCodes
          );
        }
        return newHospitalEntry;

      case 'OccupationalHealthcare':
        if (!('employerName' in object)) {
          throw new Error(
            'Occupational Healthcare Entry should have employer name'
          );
        }

        const newOccupationalEntry: NewEntry = {
          description: parseDescription(object.description),
          type: newType,
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          employerName: parseName(object.employerName),
        };

        if ('sickLeave' in object) {
          newOccupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
        }

        if ('diagnosisCodes' in object) {
          newOccupationalEntry.diagnosisCodes = parseDiagnosisCodes(
            object.diagnosisCodes
          );
        }

        return newOccupationalEntry;

      default:
        throw new Error('Incorrect Entry Type');
    }
  }
  throw new Error('Error: Incorrect or missing data on new entry');
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};
