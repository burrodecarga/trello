import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

export const Navbar = () => {
  return (
    <div className='fixed top-0 h-14 px-4 shadow-sm flex border-b bg-white w-full items-center'>
      {/* mobile sidebar */}
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <Button
          variant='primary'
          size='sm'
          className='rounded hidden md:block h-auto py-1.5 px-2'
        >
          Create
        </Button>
        <Button
          variant='primary'
          size='sm'
          className='rounded block md:hidden h-auto py-1.5 px-2'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      <div className='ml-auto gap-x-2 flex items-center'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl='organization/:id'
          afterLeaveOrganizationUrl='/select-org'
          afterSelectOrganizationUrl='organization/:id'
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: {
                width: 30,
                height: 30,
              },
            },
          }}
        />
      </div>
    </div>
  )
}
