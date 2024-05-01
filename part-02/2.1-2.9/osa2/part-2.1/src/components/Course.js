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

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

export default Course