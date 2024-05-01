import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const incrementGood = {
    type: 'GOOD'
  }

  const incrementOk = {
    type: 'OK'
  }

  const incrementBad = {
    type: 'BAD'
  }

  const reset = {
    type: 'ZERO'
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, incrementGood)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('all values are incremented', () => {
    let state = counterReducer(initialState, incrementGood)
    state = counterReducer(state, incrementGood)
    state = counterReducer(state, incrementOk)
    state = counterReducer(state, incrementBad)

    expect(state).toEqual({
      good: 2,
      ok: 1,
      bad: 1
    })
  })

  test('zero should reset the state to initial state', () => {
    let state = counterReducer(initialState, incrementGood)
    state = counterReducer(state, incrementOk)
    deepFreeze(state)

    expect(state).toEqual({
      good: 1,
      ok: 1,
      bad: 0
    })

    const newState = counterReducer(state, reset)

    expect(newState).toEqual(initialState)
  })
})