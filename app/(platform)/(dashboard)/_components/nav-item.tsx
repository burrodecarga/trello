'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export type Organization = {
  id: string
  slug: string
  name: string
  imageUrl: string
}
interface NavItemProps {
  isExpanded: Boolean
  isActive: boolean
  organization: any
  onExpanded: (id: string) => void
}
export const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpanded,
}: NavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const routes = [
    {
      label: 'Board',
      icon: <Layout className='h-4 w-4 mr-2' />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className='h-4 w-4 mr-2' />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className='h-4 w-4 mr-2' />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className='h-4 w-4 mr-2' />,
      href: `/organization/${organization.id}/billing`,
    },
  ]

  const onClick = (href: string) => {
    router.push(href)
  }
  return (
    <AccordionItem value={organization.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpanded(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700',
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Image
              fill
              src={organization.imageUrl}
              alt={organization.name}
              className='rounded-sm object-cover'
            />
          </div>
          <div>
            <span className='mx-auto font-medium text-sm'>
              {organization.name}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutral-700'>
        {routes.map((route) => (
          <Button
            key={route.href}
            size='sm'
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-10',
              pathname === route.href && 'bg-sky-500/10 text-sky-700',
            )}
            variant='ghost'
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}
