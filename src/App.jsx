import './App.css'
import { useState } from 'react'

function App() {
  // counts 상태를 배열로 관리
  const [counts, setCounts] = useState([0, 0, 0])

  // map 메서드를 사용하여 불변성을 유지하면서 특정 인덱스의 값만 증가
  const onIncrement = (index) => {
    setCounts(prevCounts =>
      prevCounts.map((count, i) =>
        i === index ? count + 1 : count
      )
    )
  }

  // 배열에 새로운 카운터 값을 추가 (초기값 0)
  const onAddCounter = () => {
    setCounts(prevCounts => [...prevCounts, 0]) 
  }

  // filter 메서드는 조건에 맞는 요소만 남기고 새로운 배열을 반환
  // !== 연산자를 사용하여 index와 일치하지 않는 요소만 남김
  const onRemoveCounter = (index) => {
    setCounts(prevCounts => prevCounts.filter((_, i) => i !== index))
  }

  // counts 배열의 모든 값을 더함
  const total = counts.reduce((sum, current) => sum + current, 0)

  return (
    <div>
      <h1>총합: {total}</h1>
      <button onClick={onAddCounter}>
        카운터 추가
      </button>
      {
        // map 메서드로 counts 배열을 순회하며 Counter 컴포넌트 렌더링
        counts.map((count, index) => (
          <Counter
            // key는 React에서 항목을 식별하고 렌더링할 때 필요하지만, 
            // Counter 컴포넌트에는 전달되지 않음
            key={index} // index를 key로 사용 (실제 앱에서는 고유한 id 사용 권장)
            count={count}
            onIncrement={() => { onIncrement(index) }}
            onRemove={() => { onRemoveCounter(index) }}
          />
        ))
      }
    </div>
  )
}

function Counter({ count, onIncrement, onRemove }) {
  // Lazy initialization (권장)
  // useState의 초기값을 함수로 전달하면, 
  // 컴포넌트가 처음 렌더링될 때만 실행됨
  const [bgColor, setBgColor] = useState(
          () => '#' + Math.floor(Math.random()*16777215)
            .toString(16)
            .padStart(6, '0')
  )
  
  // Lazy initialization을 사용하지 않으면
  // 컴포넌트가 렌더링될 때마다 Math.random()이 실행됨
  // 실행은 했지만 초기값이 필요 없으므로 무시됨
  // const [bgColor, setBgColor] = useState(
  //   '#' + Math.floor(Math.random()*16777215)
  //   .toString(16)
  //   .padStart(6, '0')
  // )

  return (
    <div style={{ backgroundColor: bgColor }}>
      <h1>Counter: {count}</h1>
      <button onClick={onIncrement}>
        증가
      </button>
      <button onClick={onRemove}>
        제거
      </button>
    </div>
  )
}

export default App