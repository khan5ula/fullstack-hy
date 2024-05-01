import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <div>{props.title} {props.value}</div>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header={'give feedback'} />

      <button onClick={() => setGood(good + 1, console.log("Increasing value of good. The value is: ", good + 1))}>good</button>

      <button onClick={() => setNeutral(neutral + 1, console.log("Increasing value of neutral. The value is: ", neutral + 1))}>neutral</button>

      <button onClick={() => setBad(bad + 1, console.log("Increasing value of bad. The value is: ", bad + 1))}>bad</button>

      <Header header={'statistics'} />
      
      <Content title={'good'} value={good} />
      <Content title={'neutral'} value={neutral} />
      <Content title={'bad'} value={bad} />
    </div>
  )
}

export default App