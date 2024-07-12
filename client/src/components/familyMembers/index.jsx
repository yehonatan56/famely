import React, { useState } from 'react'
import Navbar from '../navbar/navbar'
import AddForm from './add'
import './index.css'
import { uploadImageFileRequest } from '../../requests/image.proxy'
import { dispatch } from '../../store/store'
import { updateMembersAction } from '../../store/slices/user.slice'
import List from './list'
import { getUserMembersSelector } from '../../store/selectors/user.selector'
import { useSelector } from 'react-redux'
import SaveBtn from '../generalComponents/saveBtn'
export default function FamilyMembers() {
  // ask hadriel if create neww component for family members state
  const [addForm, setAddForm] = useState(false);
  const members = useSelector(getUserMembersSelector);
  const addFamilyMember = async ({ name, longDescription, birthdate, profileImage }) => {
    const profileImageUrl = await uploadImageFileRequest(profileImage);
    dispatch(updateMembersAction([...members, {
      name,
      longDescription,
      birthdate,
      profileImage: profileImageUrl
    }]))
    setAddForm(false);
  }

  return (
    <div>
      <Navbar />
      <h1 id="headLine">Family Members</h1>
      {addForm ? <AddForm addFamilyMember={addFamilyMember} /> : <>
      <List />
      <button onClick={() => setAddForm(true)}>Add Family Member</button>
      <SaveBtn/>
      </>}
    </div>
  )
}
