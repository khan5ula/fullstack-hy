interface TotalProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Total = (props: TotalProps) => {
  return (
    <div>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;
