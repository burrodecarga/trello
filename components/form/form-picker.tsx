'use client'

import { defaultImages } from '@/constants/images'
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { FormErrors } from './form-errors'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormPiker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus()

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages)
  const [isLoading, setIsloading] = useState(true)
  const [seletedImageId, setSeletedImageId] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        //throw new Error('ERROR CREADO')
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        })
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>
          setImages(newImages)
        } else {
          console.log('FAILED TO GET IMAGES FROM UNSPLASH')
        }
      } catch (error) {
        console.log(error)
        setImages(defaultImages)
      } finally {
        setIsloading(false)
      }
    }
    fetchImage()
  }, [])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-6'>
        <Loader2 className='h-6 w-6 text-sky-600 animate-spin' />
      </div>
    )
  }
  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              pending && 'opacity-50 hover:opacity-50 cursor-auto',
            )}
            onClick={() => {
              if (pending) return
              setSeletedImageId(image.id)
            }}
          >
            <input
              type='radio'
              id={id}
              name={id}
              className='hidden'
              checked={seletedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              className='object-cover rounded-sm'
              src={image.urls.thumb}
              alt='Unsplash Image'
            />
            {seletedImageId === image.id && (
              <div>
                <div className='absolute inset-y-0 w-full bg-black/30 flex items-center justify-center'>
                  <Check className='w-4 h-4 text-white' />
                </div>
              </div>
            )}
            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute w-full bottom-0 text-[10px] hover:underline p-1 bg-black/50 text-white'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  )
}
