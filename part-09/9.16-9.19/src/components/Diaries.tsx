import Diary from "./Diary";
import { DiaryEntry } from "../types";

interface DiariesProps {
  diaries: DiaryEntry[];
}

const Diaries = (props: DiariesProps) => {
  const diaries = props.diaries.sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateA: any = new Date(a.date);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateB: any = new Date(b.date);

    return dateB - dateA;
  });

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary, index) => (
        <div key={index}>
          <Diary diary={diary} />
        </div>
      ))}
    </div>
  );
};

export default Diaries;
