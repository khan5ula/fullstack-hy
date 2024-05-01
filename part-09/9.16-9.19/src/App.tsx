import { useEffect, useState } from "react";
import DiaryService from "./services/diaries";
import { DiaryEntry } from "./types";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    DiaryService.getAll().then((response) => setDiaries(response));
  }, []);

  const notify = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3500);
  };

  return (
    <div>
      <DiaryForm setDiaries={setDiaries} setMessage={notify} />
      <Notification message={message} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
