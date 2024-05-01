import { Button, Grid, TextField, Typography } from '@mui/material';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { SyntheticEvent, useState } from 'react';
import { EntryFormValues } from '../../types';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const OccupationalCheckForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<number | Date | null>(null);
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [allDiagnoses, setAllDiagnoses] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<
    number | Date | null
  >(null);
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<
    number | Date | null
  >(null);

  const addDiagnosis = () => {
    setAllDiagnoses(allDiagnoses.concat(diagnosis));
    setDiagnosis('');
  };

  const handleDiagnosisKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addDiagnosis();
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (date && employerName) {
      if (sickLeaveStartDate && sickLeaveEndDate) {
        onSubmit({
          description,
          date: format(new Date(date), 'yyyy-MM-dd'),
          specialist,
          diagnosisCodes: allDiagnoses,
          employerName,
          type: 'OccupationalHealthcare',
          sickLeave: {
            startDate: format(new Date(sickLeaveStartDate), 'yyyy-MM-dd'),
            endDate: format(new Date(sickLeaveEndDate), 'yyyy-MM-dd'),
          },
        });
        onSubmit({
          description,
          date: format(new Date(date), 'yyyy-MM-dd'),
          specialist,
          diagnosisCodes: allDiagnoses,
          employerName,
          type: 'OccupationalHealthcare',
          sickLeave: {
            startDate: format(new Date(sickLeaveStartDate), 'yyyy-MM-dd'),
            endDate: format(new Date(sickLeaveEndDate), 'yyyy-MM-dd'),
          },
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <StaticDatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
          disableFuture
          slotProps={{
            actionBar: {
              actions: [],
            },
          }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline={true}
          minRows={6}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ padding: '5px', marginBottom: '10px' }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ padding: '5px', marginBottom: '10px' }}
        />
        <TextField
          label="Diagnosis code"
          value={diagnosis}
          onChange={({ target }) => setDiagnosis(target.value)}
          onKeyPress={handleDiagnosisKeyPress}
          style={{ padding: '5px', marginBottom: '10px' }}
        />
        <Button onClick={addDiagnosis} style={{ marginTop: '15px' }}>
          Add diagnosis
        </Button>
        <Button
          color="secondary"
          onClick={() => setAllDiagnoses([])}
          style={{ marginTop: '15px' }}
        >
          Clear diagnoses
        </Button>
        <div style={{ padding: '5px', marginBottom: '20px' }}>
          <span style={{ marginInlineEnd: 10 }}>Diagnoses:</span>{' '}
          <i>{allDiagnoses.join(', ')}</i>
        </div>
        <TextField
          label="Discharge criteria"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          style={{ padding: '5px', marginBottom: '10px' }}
        />
        <div style={{ padding: '5px', marginTop: '10px' }}>
          Sick leave is optional
        </div>
        <div style={{ padding: '5px' }}>
          <DatePicker
            label="Sick leave start"
            value={sickLeaveStartDate}
            onChange={(newValue) => setSickLeaveStartDate(newValue)}
            disableFuture
            defaultValue={null}
            slotProps={{
              actionBar: {
                actions: [],
              },
            }}
          />
        </div>
        <div style={{ padding: '5px' }}>
          <DatePicker
            label="Sick leave end"
            value={sickLeaveEndDate}
            onChange={(newValue) => setSickLeaveEndDate(newValue)}
            disableFuture
            defaultValue={null}
            slotProps={{
              actionBar: {
                actions: [],
              },
            }}
          />
        </div>

        <Grid style={{ marginTop: '10px' }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default OccupationalCheckForm;
