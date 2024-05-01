import { DiaryEntry } from "../types";

interface DiaryProps {
  diary: DiaryEntry;
}

const Diary = (props: DiaryProps) => {
  const diary = props.diary;
  return (
    <div>
      <h3>{diary.date}</h3>
      <table>
        <tbody>
          <tr>
            <td>Visibility:</td>
            <td>{diary.visibility}</td>
          </tr>
          <tr>
            <td>Weather:</td>
            <td>{diary.weather}</td>
          </tr>
          <tr>
            <td>Comment:</td>
            <td>{diary.comment}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default Diary;
