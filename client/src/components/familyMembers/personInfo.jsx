import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from '@mantine/core';
export default function PersonInfo({ member }) {
    const [opened, { open, close }] = useDisclosure(false);

    return (

        <div>
            <Modal style={{ position: "absolute", left: 0, height: "200px" }} opened={opened} onClose={close} title={member.name} centered>
                <div id="modal">
                    <img src={member.profileImage} alt={member.name} />
                    <p>{member.longDescription}</p>
                    <p>{member.birthdate}</p>
                </div>
            </Modal>
            <Button onClick={open}>More info</Button>


        </div>
    )
}

