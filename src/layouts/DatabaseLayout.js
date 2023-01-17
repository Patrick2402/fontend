import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function DatabaseLayout() {
    return (
        <div className='databaselayout'>
            <div className="subnav">
                <nav>
                    <NavLink to='wcaid'>Personal stats</NavLink>
                    <NavLink to='winable'>What can you win</NavLink>
                </nav>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
