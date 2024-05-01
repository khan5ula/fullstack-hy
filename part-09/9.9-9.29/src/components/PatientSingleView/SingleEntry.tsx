import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import WorkIcon from '@mui/icons-material/Work';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Diagnosis, Entry } from '../../types';
import HealthRatingBar from '../PatientListPage/HealthRatingBar';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const SingleEntry = ({ entry, diagnoses }: Props) => {
  const [checkType, setCheckType] = useState<string>('');
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const getType = (entry: Entry): string => {
      switch (entry.type) {
        case 'HealthCheck':
          setIcon(<MonitorHeartIcon color="success" fontSize="large" />);
          return 'Health Check';
        case 'Hospital':
          setIcon(<LocalHospitalIcon color="error" fontSize="large" />);
          return 'Hospital Visit';
        case 'OccupationalHealthcare':
          setIcon(<WorkIcon color="primary" fontSize="large" />);
          return 'Occupational Check';
        default:
          return 'No entry type';
      }
    };
    setCheckType(getType(entry));
  }, [entry]);

  return (
    <div style={{ marginBottom: '40px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="h6">
                <span style={{ padding: '10px', verticalAlign: '-30%' }}>
                  {icon}
                </span>{' '}
                {checkType} on {entry.date}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Description:</TableCell>
            <TableCell>{entry.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ width: '30%' }}>Date:</TableCell>
            <TableCell>{entry.date}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type:</TableCell>
            <TableCell>{checkType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Specialist:</TableCell>
            <TableCell>{entry.specialist}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Diagnoses:</TableCell>
            <TableCell>
              {entry.diagnosisCodes ? (
                <>
                  {entry.diagnosisCodes?.map((d) => (
                    <div key={d}>
                      {d} {diagnoses.find((a) => a.code === d)?.name}
                    </div>
                  ))}
                </>
              ) : (
                'None'
              )}
            </TableCell>
          </TableRow>
          {entry.type === 'HealthCheck' && (
            <TableRow>
              <TableCell>Health rating:</TableCell>
              <TableCell>
                <div style={{ marginTop: '10px' }}>
                  <HealthRatingBar showText={true} rating={1} />
                </div>
              </TableCell>
            </TableRow>
          )}
          {entry.type === 'Hospital' && (
            <TableRow>
              <TableCell>Discharge date:</TableCell>
              <TableCell>{entry.discharge.date}</TableCell>
            </TableRow>
          )}
          {entry.type === 'Hospital' && (
            <TableRow>
              <TableCell>Discharge criteria:</TableCell>
              <TableCell>{entry.discharge.criteria}</TableCell>
            </TableRow>
          )}
          {entry.type === 'OccupationalHealthcare' && (
            <TableRow>
              <TableCell>Employer:</TableCell>
              <TableCell>{entry.employerName}</TableCell>
            </TableRow>
          )}
          {entry.type === 'OccupationalHealthcare' && (
            <TableRow>
              <TableCell>Sick leave:</TableCell>
              {entry.sickLeave ? (
                <TableCell>
                  Yes, from {entry.sickLeave.startDate} to{' '}
                  {entry.sickLeave.endDate}
                </TableCell>
              ) : (
                <TableCell>None</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleEntry;
