import React from 'react'
import { useSelector } from 'react-redux';
import { getUserMembersSelector } from '../../store/selectors/user.selector';
import PersonInfo from './personInfo';
export default function List() {
    const members = useSelector(getUserMembersSelector);
    return (

        <div id="membersContainer">
            {members.map((member, index) => (
                <div key={index} id="member">
                    <img src={member.profileImage} alt={member.name} />
                    <h2>{member.name}</h2>
                    <PersonInfo member={member} />

                </div>
            ))}

        </div>
    )
}

