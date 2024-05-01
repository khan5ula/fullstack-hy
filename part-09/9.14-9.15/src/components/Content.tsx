import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((c, index) => (
        <div key={index}>
          <Part coursePart={c} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Content;
