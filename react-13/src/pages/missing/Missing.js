import React from 'react'
import './missing.css'

import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h1>Page Not Found</h1>
      <p>Well, That is Disapointing.</p>
      <p>
        <Link to='/'>Visit Our Homepage</Link>
      </p>
    </main>
  )
}

export default Missing