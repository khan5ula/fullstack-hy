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
      <div>{props.title} {props.value} {props.symbol}</div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalReviews = good + neutral + bad

  const calculateAverage = (good, bad, totalReviews) => {
    let output = 0
    if (totalReviews > 0) {
      output = (good - bad) / totalReviews
    }
    console.log('Average review score from -1 to 1: ', output)
    return output
  }

  const average = calculateAverage(good, bad, totalReviews)

  const calculateAmountOfPositives = (good, totalReviews) => {
    let output = 0
    if (totalReviews > 0) {
      output = (good * 100) / totalReviews
    }
    console.log('Positive review %: ', output)
    return output
  }

  const positiveReviews = calculateAmountOfPositives(good, totalReviews)


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
      <Content title={'all'} value={totalReviews} />
      <Content title={'average'} value={average} />
      <Content title={'positive'} value={positiveReviews} symbol={'%'}/>
    </div>
  )
}

export default App