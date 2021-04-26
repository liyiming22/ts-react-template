import React, { useCallback, useState } from 'react'

const App: React.FC = () => {
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

export default App
