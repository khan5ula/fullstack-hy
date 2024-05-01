import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface PartProps {
  coursePart: CoursePart;
}

const renderNameAndExerciseCount = (part: CoursePart) => (
  <div>
    <b>
      {part.name} {part.exerciseCount}
    </b>
  </div>
);

const Part = (props: PartProps) => {
  const part = props.coursePart;

  switch (part.kind) {
    case "basic":
      return (
        <div>
          {renderNameAndExerciseCount(part)}{" "}
          <div>
            <i>{part.description}</i>
          </div>
        </div>
      );
    case "group":
      return (
        <div>
          {renderNameAndExerciseCount(part)}
          <div>{part.groupProjectCount}</div>
        </div>
      );
    case "background":
      return (
        <div>
          {renderNameAndExerciseCount(part)}
          <div>
            <i>{part.description}</i>
          </div>
          submit to {part.backgroundMaterial}
        </div>
      );
    case "special":
      return (
        <div>
          {renderNameAndExerciseCount(part)}
          <div>
            <i>{part.description}</i>
          </div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
