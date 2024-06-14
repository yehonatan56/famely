import React from 'react'
import { useSelector } from 'react-redux'

export default function Welcome() {
    const user = useSelector(state => state.user)
  return (
    <div>Welcome {user.user.name} famely</div>
  )
}
