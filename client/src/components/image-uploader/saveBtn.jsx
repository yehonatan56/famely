import React from 'react'
import { Button } from '@mantine/core';

export default function SaveBtn() {
    const save = async () =>{
    e.preventDefault()
    }
    
     
    return <Button variant="light" color="indigo" size="xl" radius="xl" onClick={(e) => save(e)}>Save</Button>;
}
