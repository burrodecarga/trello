'use client'

import { CardModal } from '@/components/modals/card-modal/index'
import { useEffect, useState } from 'react'

CardModal
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CardModal />
    </>
  )
}
