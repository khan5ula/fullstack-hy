import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { EntryFormValues, Patient } from '../../types';
import HealthCheckForm from './HealthCheckForm';
import HospitalCheckForm from './HospitalCheckForm';
import OccupationalCheckForm from './OccupationalCheckForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  patient: Patient | undefined;
  error?: string;
  type: 'HealthCheck' | 'Hospital' | 'Occupational';
}

const AddEntryModal = ({
  patient,
  modalOpen,
  onClose,
  onSubmit,
  error,
  type,
}: Props) => {
  const [header, setHeader] = useState<string>('Add a new entry');

  useEffect(() => {
    switch (type) {
      case 'HealthCheck':
        setHeader('Add a new health check entry');
        break;
      case 'Hospital':
        setHeader('Add a new hospital entry');
        break;
      case 'Occupational':
        setHeader('Add a new occupational check entry');
        break;
      default:
        setHeader('Add a new entry');
    }
  }, [type]);

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>{header}</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {type === 'HealthCheck' && (
          <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
        )}
        {type === 'Hospital' && (
          <HospitalCheckForm onSubmit={onSubmit} onCancel={onClose} />
        )}
        {type === 'Occupational' && (
          <OccupationalCheckForm onSubmit={onSubmit} onCancel={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
