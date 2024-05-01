import { NewDiaryEntry, Visibility, Weather } from "./types";

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const newEntry: NewDiaryEntry = {
      weather: object.weather as Weather,
      visibility: object.visibility as Visibility,
      date: object.date as string,
      comment: object.comment as string,
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};
