import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Statistics = (props) => {
  if (props.valueAll > 0) {
    return (
      <div>
        <StatisticLine title={props.titleAll} value={props.valueAll}></StatisticLine>
        <StatisticLine title={props.titleAverage} value={props.valueAverage}></StatisticLine>
        <StatisticLine title={props.titlePositive} value={props.valuePositive} symbol={props.symbol}></StatisticLine>
      </div>
   )
  }
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.title}{" "}{props.value}{" "}{props.symbol}
    </div>
  )
}

const Content = (props) => {
  if (props.total > 0) {
    return (
      <div>
        <div>{props.titleGood} {props.valueGood}</div>
        <div>{props.titleNeutral} {props.valueNeutral}</div>
        <div>{props.titleBad} {props.valueBad}</div>
      </div>
    )
  } else {
    return (
      <div>{"No feedback given"}</div>
    )
  }
}

const Button = (props) => {
  console.log("Increasing the value of", props.text)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
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
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header header={'statistics'} />
      
      <Content    titleGood={'good'}
                  titleNeutral={'neutral'}
                  titleBad={'bad'}
                  valueGood={good}
                  valueNeutral={neutral}
                  valueBad={bad}
                  total={totalReviews} />
      <Statistics titleAll={'all'} valueAll={totalReviews}
                  titleAverage={'average'} valueAverage={average}
                  titlePositive={'positive'} valuePositive={positiveReviews} symbol={'%'} />
    </div>
  )
}

export default App