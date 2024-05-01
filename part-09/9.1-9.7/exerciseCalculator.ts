interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface trainingArgs {
  trainingHours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): trainingArgs => {
  if (args.length < 4) {
    throw new Error('Error: Not enough arguments');
  }

  const trainingHours: number[] = [];

  for (let i = 2; i < args.length - 1; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Error: Training hours expected in numeric format');
    }
    trainingHours.push(Number(args[i]));
  }

  if (isNaN(Number(args[args.length - 1]))) {
    throw new Error('Error: Target must be numeric');
  }

  const target = Number(args[args.length - 1]);

  return {
    trainingHours,
    target,
  };
};

export const calculateExcercises = (
  excercises: number[],
  originalTarget: number
): Result => {
  const average =
    excercises.reduce((sum: number, d: number) => sum + d, 0) /
    excercises.length;
  const rating = findRating(average);

  const result: Result = {
    periodLength: excercises.length,
    trainingDays: excercises.filter((day) => day > 0).length,
    target: originalTarget,
    average: average,
    rating: rating,
    success: average >= originalTarget,
    ratingDescription: setRatingDescription(rating),
  };

  return result;
};

const findRating = (average: number): number => {
  let result = 1;

  switch (true) {
    case average <= 1:
      result = 1;
      break;
    case average > 1 && average <= 2:
      result = 2;
      break;
    case average > 2:
      result = 3;
      break;
    default:
      return 1;
  }

  return result;
};

const setRatingDescription = (rating: number): string => {
  let description = '';

  switch (rating) {
    case 1:
      description = 'little disappointing';
      break;
    case 2:
      description = 'not too bad but could be better';
      break;
    case 3:
      description = 'excellent! good work';
      break;
    default:
      description = 'error: check the input';
  }

  return description;
};

try {
  const { trainingHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExcercises(trainingHours, target));
} catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
