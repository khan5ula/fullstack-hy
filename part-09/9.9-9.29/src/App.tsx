import { Button, Container, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useMatch } from 'react-router-dom';
import PatientSingleView from './components/PatientSingleView';

import { Diagnosis, Patient } from './types';

import PatientListPage from './components/PatientListPage';
import diagnosisService from './services/diagnosis';
import patientService from './services/patients';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const matchPatient = useMatch('patients/:id');
  const [error, setError] = useState<string>();

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
    void fetchDiagnosisList();
  }, []);

  const viewPatient = matchPatient
    ? patients.find((a) => a.id === matchPatient.params.id)
    : undefined;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage
                error={error}
                setError={notify}
                patients={patients}
                setPatients={setPatients}
              />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PatientSingleView
                diagnoses={diagnoses}
                patient={viewPatient}
                error={error}
                setError={notify}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
