const Header = (props) => {
  console.log("Header props: ", props)
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log("Total: ", total)
  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => 
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
      <Total parts={course.parts} />
    </div>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      <Header header={"Web development curriculum"}/>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default Courses