
import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex justify-center text-xs mb-10'>

        <Link href={'/'} >
            <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
            <span>| shop</span>
            <span> &copy; {new Date().getFullYear() } </span>
        </Link>
        <Link href={'/'} className='mx-3'>
            <span>Privacidad & Legal |</span>
            <span> Ubicaciones</span>
        </Link>

    </div>
  )
}
