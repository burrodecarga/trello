import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'

const BoardIdPage = () => {
  return <div className='p-4 h-full overflow-x-auto text-white'>BOARD ID </div>
}

export default BoardIdPage
