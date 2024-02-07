import { AuthLayout } from '@/layout/AuthLayout'
import { setLogout } from '@/lib/utils'
import React from 'react'

const profile = () => {
  return (
    <AuthLayout page={{title:'Profile'}}>

      <button className='w-full bg-red-500 text-red-100' onClick={setLogout}>Logout</button>
    </AuthLayout>
  )
}

export default profile