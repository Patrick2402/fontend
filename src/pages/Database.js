import React from 'react'
import { useState, useEffect } from 'react'

export default function Database() {
    const [results,setResults] = useState(null)
    const [wcaid, setWcaid] = useState('')
    
    const handleSubmiter = async (e) => {
      e.preventDefault()
      console.log(wcaid)
      const res = await fetch('/api/results', {
        method: 'POST',
        body: JSON.stringify({wcaid: wcaid}),
        headers: { 'Content-Type': 'application/json' },
    });
    
      const json = await res.json();
      setResults(json);
      console.log(results)
    }

    // useEffect(()=> {
    //     fetch('/api/results')
    //   .then(res => res.json())
    //   .then(users => setUsers(users));
    // },[])

  return (
    <div className='database'>
      <div className='wcaid'>
      <span>Type WCA ID</span>
      <input 
      className='wca'
      type="text" 
      value={wcaid}
      onChange={(e) => {setWcaid( e.target.value)}}
      />
     <input className='btn'type='submit' value="Show Results" onClick={handleSubmiter}/>
    </div>
    {results && <div className='results'>
      <div className='head'>
        <h1>{results[0].name}</h1>
        <p>WCA ID: {results[0].personId}</p>
        <p>Country: {results[0].countryId}</p>
      </div>
      <table>
      <tr>
            <th>Event</th>
            <th>BestAvg</th>
            <th>WorldRank</th>
            <th>ContinentRank</th>
            <th>CountryRank</th>
        </tr>
      {results.map((res,index) => (
          <tr>
            <td>{res.eventId}</td>
            <td>{Math.floor(res.best/6000)}:{(res.best%6000)/100}</td>
            <td>{res.worldRank}</td>
            <td>{res.continentRank}</td>
            <td>{res.countryRank}</td>
          </tr>
      ))}
      </table>
    </div>}
    </div>
  )
}
