import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { SyntheticEvent, useState } from 'react';
import { EntryFormValues } from '../../types';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HealthCheckForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<number | Date | null>(null);
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [allDiagnoses, setAllDiagnoses] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

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
    if (date) {
      event.preventDefault();
      onSubmit({
        description,
        date: format(new Date(date), 'yyyy-MM-dd'),
        specialist,
        diagnosisCodes: allDiagnoses,
        healthCheckRating,
        type: 'HealthCheck',
      });
    }
  };

  const handleHealthRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setHealthCheckRating(parseInt(value));
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
        <FormControl style={{ padding: '5px' }}>
          <FormLabel id="demo-radio-buttons-group-label">
            Health rating
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="health-check-radio-buttons"
            name="health-check-radio-button-group"
            value={healthCheckRating}
            onChange={handleHealthRatingChange}
          >
            <FormControlLabel value={0} control={<Radio />} label="0" />
            <FormControlLabel value={1} control={<Radio />} label="1" />
            <FormControlLabel value={2} control={<Radio />} label="2" />
            <FormControlLabel value={3} control={<Radio />} label="3" />
          </RadioGroup>
        </FormControl>

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

export default HealthCheckForm;
