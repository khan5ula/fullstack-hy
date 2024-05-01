export interface BmiValues {
  height: number;
  weight: number;
}

/*
const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Error: Provided values were not numbers!');
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (height < 10 || height > 250) {
    throw new Error('Error: Invalid height value');
  }

  if (weight < 10 || weight > 500) {
    throw new Error('Error: Invalid weight value');
  }

  return {
    height,
    weight,
  };
};
*/

export const calculateBmi = (height: number, weight: number): string => {
  console.log(`height: ${height}, weight: ${weight}`);
  const bmi = weight / (height / 100) ** 2;
  let verdict = '';

  switch (true) {
    case bmi < 16:
      verdict = 'Underweight (Severe thinness)';
      break;
    case bmi > 16 && bmi < 17:
      verdict = 'Underweight (Moderate thinness)';
      break;
    case bmi >= 17.0 && bmi < 18.5:
      verdict = 'Underweight (Mild thinness) ';
      break;
    case bmi >= 18.5 && bmi < 25:
      verdict = 'Normal (Healthy weight)';
      break;
    case bmi >= 25.0 && bmi < 30:
      verdict = 'Overweight (Pre-obese)';
      break;
    case bmi >= 30.0 && bmi < 35:
      verdict = 'Obese (Class I)';
      break;
    case bmi >= 35.0 && bmi < 40:
      verdict = 'Obese (Class II)';
      break;
    case bmi >= 40:
      verdict = 'Obese (Class III)';
      break;
    default:
      verdict = 'Undefined. Please check the input';
  }

  return verdict;
};

/*
try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
*/
