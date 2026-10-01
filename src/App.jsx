import './App.css'
import { useState } from 'react'

function App() {
  // counts 상태를 배열로 관리
  const [counts, setCounts] = useState([0, 0, 0])
  
  // // index에 해당하는 counts 값을 1 증가시키는 함수
  // const onIncrement = (index) => {
  //   // 상태를 업데이트할 때는 항상 새로운 배열을 만들어서 설정
  //   setCounts(prevCounts => {
  //     const newCounts = [...prevCounts] // Spread syntax로 배열 복사
  //     newCounts[index] += 1

  //     return newCounts
  //   })
  // }

  // map 메서드를 사용하여 불변성을 유지하면서 특정 인덱스의 값만 증가
  const onIncrement = (index) => {
    setCounts(prevCounts =>
      prevCounts.map((count, i) =>
        i === index ? count + 1 : count
      )
    )
  }

  // counts 배열의 모든 값을 더함
  const total = counts.reduce((sum, current) => sum + current, 0)

  return (
    <div>
      <h1>총합: {total}</h1>
      {
        // map 메서드로 counts 배열을 순회하며 Counter 컴포넌트 렌더링
        counts.map((count, index) => (
          <Counter
            // key는 React에서 항목을 식별하고 렌더링할 때 필요하지만, 
            // Counter 컴포넌트에는 전달되지 않음
            key={index} // index를 key로 사용 (실제 앱에서는 고유한 id 사용 권장)
            count={count}
            onIncrement={() => { onIncrement(index) }}
          />
        ))
      }
    </div>
  )
}

function Counter({ count, onIncrement }) {
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={onIncrement}>
        증가
      </button>
    </div>
  )
}

export default App
