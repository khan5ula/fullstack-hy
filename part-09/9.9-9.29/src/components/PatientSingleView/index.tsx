import {
  default as FemaleIcon,
  default as MaleIcon,
} from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { Diagnosis, Entry, EntryFormValues, Patient } from '../../types';
import AddEntryModal from '../EntryForms';
import SingleEntry from './SingleEntry';

interface Props {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
  error: string | undefined;
  setError: (message: string) => void;
}

const PatientSingleView = ({ patient, diagnoses, error, setError }: Props) => {
  const [patientWithSsn, setPatientWithSsn] = useState<Patient | undefined>(
    patient
  );
  const [genderIcon, setGenderIcon] = useState<JSX.Element | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newEntryType, setNewEntryType] = useState<
    'HealthCheck' | 'Hospital' | 'Occupational'
  >('HealthCheck');

  const openModal = (): void => setModalOpen(true);

  const setHealthCheckActive = (): void => {
    setNewEntryType('HealthCheck');
    openModal();
  };

  const setHospitalActive = (): void => {
    setNewEntryType('Hospital');
    openModal();
  };

  const setOccupationalActive = (): void => {
    setNewEntryType('Occupational');
    openModal();
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError('');
  };

  const submitEntry = async (values: EntryFormValues) => {
    if (!patientWithSsn) {
      throw new Error('Error: Submit failed, patient was not found');
    }
    try {
      const newEntry = await patientService.newEntry(
        patientWithSsn?.id,
        values
      );
      patientWithSsn.entries.push(newEntry);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        setError('Unknown error');
      }
    }
  };

  useEffect(() => {
    if (patient) {
      const fetch = async (id: string) => {
        try {
          const data: Patient = await patientService.getById(id);
          setPatientWithSsn(data);
          if (data.gender === 'male') {
            setGenderIcon(<MaleIcon />);
          } else if (data.gender === 'female') {
            setGenderIcon(<FemaleIcon />);
          } else {
            setGenderIcon(<TransgenderIcon />);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetch(patient.id);
    }
  }, [patient]);

  if (!patientWithSsn) {
    return <div>Patient not found</div>;
  }

  const entries: Entry[] = patientWithSsn.entries;

  return (
    <div>
      <Table style={{ marginTop: '20px' }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="h4">
                {patientWithSsn.name} {genderIcon}
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ width: '30%' }}>ssn:</TableCell>
            <TableCell align="left">{patientWithSsn.ssn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>occupation:</TableCell>
            <TableCell>{patientWithSsn.occupation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        onClose={closeModal}
        patient={patient}
        error={error}
        type={newEntryType}
      />
      <Button
        style={{ marginTop: '20px' }}
        variant="outlined"
        color="success"
        onClick={() => setHealthCheckActive()}
      >
        Add health check entry
      </Button>
      <Button
        style={{ marginTop: '20px' }}
        variant="outlined"
        color="error"
        onClick={() => setHospitalActive()}
      >
        Add hospital entry
      </Button>
      <Button
        style={{ marginTop: '20px' }}
        variant="outlined"
        color="primary"
        onClick={() => setOccupationalActive()}
      >
        Add occupational entry
      </Button>
      <Typography style={{ marginTop: '20px', padding: '15px' }} variant="h4">
        Entries:
      </Typography>
      {entries.length > 0 ? (
        <>
          {Object.values(entries).map((entry: Entry) => (
            <div key={entry.id}>
              <SingleEntry diagnoses={diagnoses} entry={entry} />
            </div>
          ))}
        </>
      ) : (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>No entries</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PatientSingleView;
