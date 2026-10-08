import './App.css'
import { useState } from 'react'

const INITIAL_COUNTS = [
  { id: crypto.randomUUID(), value: 0 },
  { id: crypto.randomUUID(), value: 0 },
  { id: crypto.randomUUID(), value: 0 }
]

function App() {
  // counts 상태를 배열로 관리
  const [counts, setCounts] = useState(INITIAL_COUNTS)

  // index 대신 id로 변경
  const onIncrement = (id) => {
    setCounts(prevCounts =>
      prevCounts.map(item =>
        item.id === id ? { ...item, value: item.value + 1 } : item
      )
    )
  }

  // 배열에 새로운 카운터 값을 추가 (초기값 0)
  const onAddCounter = () => {
    setCounts(prevCounts => [...prevCounts, { id: crypto.randomUUID(), value: 0 }])
  }

  // id가 같으면 필터링하고, 다른 id는 그대로 유지
  const onRemoveCounter = (id) => {
    setCounts(prevCounts => prevCounts.filter(item => item.id !== id))
  }

  // counts 배열의 모든 값을 더함
  const total = counts.reduce((sum, current) => sum + current.value, 0)

  return (
    <div>
      <h1>총합: {total}</h1>
      <button onClick={onAddCounter}>
        카운터 추가
      </button>
      {
        // map 메서드로 counts 배열을 순회하며 Counter 컴포넌트 렌더링
        counts.map((item) => (
          <Counter
            // key는 React에서 항목을 식별하고 렌더링할 때 필요하지만, 
            // Counter 컴포넌트에는 전달되지 않음
            key={item.id} // UUID를 key로 사용
            count={item.value}
            onIncrement={() => { onIncrement(item.id) }}
            onRemove={() => { onRemoveCounter(item.id) }}
          />
        ))
      }
    </div>
  )
}

function Counter({ count, onIncrement, onRemove }) {
  // Lazy initialization
  // useState의 초기값을 함수로 전달하면, 
  // 컴포넌트가 처음 렌더링될 때만 실행됨
  const [bgColor, setBgColor] = useState(
          () => '#' + Math.floor(Math.random()*16777215)
            .toString(16)
            .padStart(6, '0')
  )

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