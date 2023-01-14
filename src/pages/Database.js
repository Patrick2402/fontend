import React from 'react'
import { useState, useEffect } from 'react'

export default function Database() {
    const [users,setUsers] = useState(null)

    

    useEffect(()=> {
        fetch('/api/users')
      .then(res => res.json())
      .then(users => setUsers(users));
    },[])

  return (
    <div className='database'>
        {users && users.map((user,index) => (
            <div className='users' key={index}>
                <h3>Results</h3>
                <code>Competition: {user.competitionId}</code>
                <code>Event: {user.eventId}</code>
                <code>Best Time: {user.best < 1 ? 'DNF' : user.best/100}</code>
                <code>Average Time: {user.average < 1 ? 'DNF' : user.average}</code>
            </div>
        ))}
    </div>
  )
}
