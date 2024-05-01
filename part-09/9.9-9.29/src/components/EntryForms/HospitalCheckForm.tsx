import { Button, Grid, TextField } from '@mui/material';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { SyntheticEvent, useState } from 'react';
import { EntryFormValues } from '../../types';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HospitalCheckForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<number | Date | null>(null);
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [allDiagnoses, setAllDiagnoses] = useState<string[]>([]);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<number | Date | null>(
    null
  );

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
    if (date && dischargeDate) {
      event.preventDefault();
      onSubmit({
        description,
        date: format(new Date(date), 'yyyy-MM-dd'),
        specialist,
        diagnosisCodes: allDiagnoses,
        discharge: {
          criteria: dischargeCriteria,
          date: format(new Date(dischargeDate), 'yyyy-MM-dd'),
        },
        type: 'Hospital',
      });
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
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
          style={{ padding: '5px', marginBottom: '10px' }}
        />
        <span style={{ padding: '5px' }}>
          <DatePicker
            label="Discharge date"
            value={dischargeDate}
            onChange={(newValue) => setDischargeDate(newValue)}
            disableFuture
            defaultValue={null}
            slotProps={{
              actionBar: {
                actions: [],
              },
            }}
          />
        </span>

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

export default HospitalCheckForm;
