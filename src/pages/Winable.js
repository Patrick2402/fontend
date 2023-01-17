import { tab } from '@testing-library/user-event/dist/tab';
import React, { useEffect, useState } from 'react'

export default function Winable() {

  const [countries, setCountries] = useState(null);
  const [events, setEvents] = useState(null);
  const [wynik, setWynik] = useState(null);


  // selections 
  const [c, setC] = useState('Poland');
  const [ev, setEv] = useState('333');
  const [o, setO] = useState('single');



  const getCountries = async () => {
    const res = await fetch('/api/countries', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await res.json();
    setCountries(json)
  }

  const getEvents = async () => {
    const res = await fetch('/api/events', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await res.json();
    setEvents(json)

  }

  useEffect(() => {
    getCountries()
    getEvents()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(c, ev, o)
    const ceo = {
      country: c,
      event: ev,
      option: o
    }
    console.log(ceo)
    const res = await fetch('/api/rankings', {
      method: 'POST',
      body: JSON.stringify(ceo),
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await res.json();
    setWynik(json)
  }

  const handlecountryChange = (event) => {
    setC(event.target.value);
  }
  const handleeventChange = (event) => {
    setEv(event.target.value);
  }
  const handleoptionChange = (event) => {
    setO(event.target.value);
  }


  return (
    <div className='winable'>
      <div className='selection'>
        <h2> Select options</h2>
        <form onSubmit={handleSubmit} className="forms">
          <label>
            {countries &&
              <select value={c} onChange={handlecountryChange}>
                {countries.map((country) => (
                  <option value={country.id} key={country.id}>{country.id}</option>
                ))}
              </select>
            }
            {events && <select value={ev} onChange={handleeventChange}>
              {events.map((event) => (
                <option value={event.id} key={event.id}>{event.id}</option>
              ))}
            </select>}
            <select value={o} onChange={handleoptionChange}>
              <option value='single'>Single</option>
              <option value='average'>Average</option>
            </select>
            <input type="submit" value="Submit" />
          </label>
        </form>

        {wynik && <div className='wyniki'>
        <table>
          <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>WCA ID</th>
            <th>Event</th>
            <th>Country</th>
            <th>Result</th>
            
          </tr>
          {wynik[0].map((res, index) => (
            <tr key={index}>
              <td>{res.countryRank}</td>
              <td>{res.name}</td>
              <td>{res.personId}</td>
              <td>{res.eventId}</td>
              <td>{res.countryId}</td>
              <td>{Math.floor(res.best / 6000)}:{(res.best % 6000) / 100}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>}
      </div>
    </div >
  )

}
