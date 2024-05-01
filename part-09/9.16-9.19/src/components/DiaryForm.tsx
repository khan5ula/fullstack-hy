import { useState } from "react";
import DiaryService from "../services/diaries";
import { DiaryEntry } from "../types";
import { toNewDiaryEntry } from "../utils";
import axios from "axios";

interface DiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setMessage: (message: string) => void;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<string | undefined>("");
  const [weather, setWeather] = useState<string | undefined>("");
  const [comment, setComment] = useState("");
  const setDiaries = props.setDiaries;
  const setMessage = props.setMessage;

  const createDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
      id: 1,
    };

    try {
      const result = await DiaryService.create(toNewDiaryEntry(diary));
      setDiaries((diaries) => diaries.concat(result));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        const errorMessage = error.response?.data.replace(/'/g, "");
        setMessage(errorMessage);
      } else {
        console.error(error);
      }
    }

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add a new entry</h2>
      <form onSubmit={createDiary}>
        <div>
          date:{" "}
          <input
            style={{ marginLeft: "35px" }}
            type="date"
            value={date}
            placeholder="date"
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          visibility:
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="visibility"
            id="visibility-great"
            value="great"
            checked={visibility === "great"}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="visibility-great">great</label>
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="visibility"
            id="visibility-good"
            value="good"
            checked={visibility === "good"}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="visibility-good">good</label>
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="visibility"
            id="visibility-ok"
            value="ok"
            checked={visibility === "ok"}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="visibility-ok">ok</label>
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="visibility"
            id="visibility-poor"
            value="poor"
            checked={visibility === "poor"}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="visibility-poor">poor</label>
        </div>
        <div style={{ marginTop: "10px" }}>
          weather:
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="weather"
            id="weather-sunny"
            value="sunny"
            checked={weather === "sunny"}
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="weather-sunny">sunny</label>
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="weather"
            id="weather-rainy"
            value="rainy"
            checked={weather === "rainy"}
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="weather-rainy">rainy</label>
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="weather"
            id="weather-cloudy"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="weather-cloudy">cloudy</label>
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="weather"
            id="weather-windy"
            value="windy"
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="weather-windy">windy</label>
          <input
            style={{ marginLeft: "15px" }}
            type="radio"
            name="weather"
            id="weather-stormy"
            value="stormy"
            checked={weather === "stormy"}
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="weather-stormy">stormy</label>
        </div>
        <div style={{ marginTop: "10px" }}>
          comment:{" "}
          <input
            style={{ width: "50%" }}
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button
          style={{ marginTop: "5px", marginBottom: "20px" }}
          type="submit"
        >
          add entry
        </button>
      </form>
      <hr />
    </div>
  );
};

export default DiaryForm;
