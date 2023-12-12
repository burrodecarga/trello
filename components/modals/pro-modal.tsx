'use client'

import { useProdModal } from '@/hooks/use-pro-modal'
import { DialogContent } from '@radix-ui/react-dialog'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'

export const ProModal = () => {
  const proModal = useProdModal()

  const onClick = () => {
    console.log('CLICK')
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className='max-w-md p-10 overflow-hidden mx-auto mx-auto mt-12 border-neutral-300'>
        <div className='aspect-video relative flex items-center justify-center'>
          <Image
            src='/hero.svg'
            alt='Hero'
            className='object-cover'
            sizes='100vw'
            fill
          />
        </div>

        <div className='text-neutral-700 mx-auto space-y-6 p-6'>
          <h2 className='font-semibold text-xl'>
            Upgrade to Taskify Pro Today!
          </h2>
          <p className='text-xs font-semibold text-neutral-600'>
            Explore the best of Taskify
          </p>
          <div className='pl-3'>
            <ul className='text-sm list-disc'>
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button onClick={onClick} className='w-full' variant='primary'>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
