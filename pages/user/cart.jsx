import { CartComponent } from '@/components/CartComponent'
import { AuthLayout } from '@/layout/AuthLayout';
import React from 'react'

const cart = () => {

  return (
    <AuthLayout page={{title:'Cart'}}>
        <CartComponent/>
    </AuthLayout>
  )
}

export default cart