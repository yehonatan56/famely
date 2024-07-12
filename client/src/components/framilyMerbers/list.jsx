import React from 'react'
import { getUserMembersSelector } from '../../store/selectors/user.selector';
import { useSelector } from 'react-redux';
export default function List() {
  const members = useSelector(getUserMembersSelector);
    return (
  
        <div id="membersContainer">
            {members.map((member, index) => (
            <div key={index} id="member">
                <img src={member.profileImage} alt={member.name} />
                <h2>{member.name}</h2>
            </div>
            ))}

        </div>
    )
}

