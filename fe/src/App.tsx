import './App.css'
import {Space, DatePicker,Button} from 'antd'

function App() {
  return (
    <div>
      <p className='text-2xl'>Phi</p>
      <Space>
        <DatePicker />
        <Button type='primary'>Primary Button</Button>
      </Space>
    </div>
  )
}

export default App
