import { hot } from 'react-hot-loader/root'
import React, { useCallback, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const add = useCallback(() => {
    setCount((cnt) => cnt + 1)
  }, [])

  return (
    <>
      <h3>{count}</h3>
      <button type='button' onClick={add}>
        Click
      </button>
    </>
  )
}

export default hot(App)
