import React from 'react'
import { Button } from '@mantine/core'
import { useSelector } from 'react-redux';
import { getUserDataSelector } from '../../store/selectors/user.selector';
import { saveUser } from '../../requests/user.proxy';
export default function SaveBtn() {
  const user = useSelector(getUserDataSelector);
  const save = () => {
    saveUser(user)
  }
  return (
    <div>
        <Button onClick={() => save()} color="blue">Save</Button>
    </div>
  )
}
