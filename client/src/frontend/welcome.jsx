import React from 'react'
import { getFromStore } from './store'

export default function Welcome() {
    const name = getFromStore("user").name;
  return (
    <div>Welcome {name} famely</div>
  )
}
