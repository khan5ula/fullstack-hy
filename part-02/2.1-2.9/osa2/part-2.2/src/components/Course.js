const Header = (props) => {
  console.log("Header props: ", props)
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.name} {props.exercise}
    </div>
  )
}

const Content = (props) => {
  console.log("Content props: ", props)
  const items = props.parts.map(item => (
    <div key={item.id}>
      <Part name={item.name} exercise={item.exercises} />
    </div>
  ))

  return (
    <div>
      {items}
    </div>
  )
}

const Total = (props) => {
  console.log("Total props: ", props)
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log("Total: ", total)
  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
  }

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course