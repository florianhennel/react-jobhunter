import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux'
import { selectUser} from './state/authSlice'
import { Link } from 'react-router-dom'

export default function App() {
  const [count, setCount] = useState(0);
  const user = useSelector(selectUser);
  return (
    <>
      <Link to={"/login"}>login</Link>
      <div>User: {user?user.fullname:""}</div>
    </>
  )
}
