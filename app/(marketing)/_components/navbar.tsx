import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Link2Off } from 'lucide-react'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className='fixed top-0 h-14 w-full px-4 border-b shadow-sm flex items-center bg-white'>
      
      <div className='md:max-w-screen-2xl mx-auto flex w-full items-center justify-between'>
        <Logo/>
        <div className='space-x-4 md:block md:w-auto flex items-center w-full justify-between'>
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">
            Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">
            Get Taskify for free
            </Link>
          </Button>
        </div>
        </div>
      </div>
  )
}

