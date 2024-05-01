const Total = (props) => {
  console.log(props)
    return (
      <div>
        <p>
          Number of exercises {props.total}
        </p>
      </div>
    )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.content} {props.noOfExercises}
      </p>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const part4 = 'Number of exercises'

  return (
    <div>
      <Header course={course} />
      <Content content={part1} noOfExercises={exercises1} />
      <Content content={part2} noOfExercises={exercises2} />
      <Content content={part3} noOfExercises={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
