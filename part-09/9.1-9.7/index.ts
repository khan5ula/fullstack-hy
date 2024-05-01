import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExcercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (_req, res) => {
  const { height, weight } = _req.query;

  if (!height || !weight) {
    return res.status(400).send('Error: Height and weight are required');
  }

  const parsedHeight = parseFloat(height as string);
  const parsedWeight = parseFloat(weight as string);

  if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
    return res.status(400).send('Error: Invalid height or weight values');
  }

  const bmi = calculateBmi(parsedHeight, parsedWeight);
  const response = {
    height: parsedHeight,
    weight: parsedWeight,
    bmi: bmi,
  };

  return res.send(response);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyExercises = req.body.daily_exercises;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;

  if (!dailyExercises || !target) {
    res.status(400);
    return res.send('error: parameters missing');
  }

  const isArray = Array.isArray(dailyExercises);

  if (!isArray) {
    if (isNaN(Number(dailyExercises)))
      throw new Error('error: malformatted parameters');
  }

  if (isArray) {
    for (let i = 0; i < dailyExercises.length; i++) {
      if (isNaN(Number(dailyExercises[i]))) {
        throw new Error('error: malformatted parameters');
      }
    }
  }

  if (isNaN(Number(target))) {
    res.status(400);
    return res.send('error: malformatted parameters');
  }

  const result = calculateExcercises(dailyExercises as number[], target);

  console.log(dailyExercises, target);

  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
