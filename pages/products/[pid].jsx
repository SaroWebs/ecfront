import { useRouter } from 'next/router';
import React from 'react'

const singleItem = () => {
  const router = useRouter()
  let pid = router.query.pid;

  return (
    <div>singleItem {pid}</div>
  )
}

export default singleItem