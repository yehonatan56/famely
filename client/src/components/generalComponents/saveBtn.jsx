import React, { useState } from 'react';
import { Button, Notification } from '@mantine/core';
import { useSelector } from 'react-redux';
import { getUserDataSelector } from '../../store/selectors/user.selector';
import { saveUser } from '../../requests/user.proxy';
export default function SaveBtn() {
  const user = useSelector(getUserDataSelector);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    saveUser(user)
  }
  return (
    <div>
      {saved && (
        <Notification style={
          { position: "absolute", right: 0, bottom: 0, margin: "10px" }
        } title="saved sucsessful">
          you can exit  from this page
        </Notification>
      )}
      <Button onClick={() => save()} color="blue">Save</Button>
    </div>
  )
}
