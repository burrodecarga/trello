'use client'

import { ListWithCards } from '@/types'
import { ElementRef, useRef, useState } from 'react'
import { ListHeader } from './list-header'

interface ListItemProps {
  data: ListWithCards
  index: number
}
export const ListItem = ({ data, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  return (
    <li className='shrink-0 h-full w-[272px] select-none text-black'>
      <div className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
        <ListHeader data={data} />
      </div>
    </li>
  )
}