import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const Root = () => {
  redirect('/home')
  return (
    <div>Redirecing to Home Page</div>
  )
}

export default Root