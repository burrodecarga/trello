import { Medal } from 'lucide-react'

const MarketingPage = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
       <div className='flex items-center justify-center flex-col'>
        <div className='mb-4 flex items-center shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
        <Medal className='w-6 h-6 mr-2'/>
        N° 1 Task Manager
        </div>
        <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>Taskify helps team move</h1>
        <div>Work forward</div>
       </div>      
    </div>
  )
}

export default MarketingPage