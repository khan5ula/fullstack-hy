import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Statistics = (props) => {
  console.log("From Content: ", props.valueAll)
  if (props.valueAll > 0) {
    return (
      <div>
        <div>{props.titleAll} {props.valueAll}</div>
        <div>{props.titleAverage} {props.valueAverage}</div>
        <div>{props.titlePositive} {props.valuePositive} {props.symbol} </div>
      </div>
   )
  }
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