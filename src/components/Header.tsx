'use client'
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from "react";
import Link from "next/link";

export function Header() {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const { status, data } = useSession();
    const handleLoginClick = () => signIn();
    
    function handleLogoutClick(){
        setMenuIsOpen(false)
        signOut()
    }

   

    return (
        <header className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center lg:border-b lg:border-grayLighter">

            <Link href="/">
              <Image src='/logo.png' width={183} height={32} alt="" />
            </Link>

            {
                status === 'unauthenticated' && (
                    
                    <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>
                        Login
                    </button>
                )
            }

            {
                status === 'authenticated' && data.user && (
                    <div className="flex items-center gap-5 border border-solid border-grayLighter p-2 px-3 rounded-full relative">
                        <AiOutlineMenu size={16} onClick={() => setMenuIsOpen(!menuIsOpen)} className="cursor-pointer"/>
                        <Image className="rounded-full shadow-md" src={data.user.image!} width={24} height={24} alt={data.user.name!} />


                        {
                            menuIsOpen && (
                                <div className="z-50 absolute top-12 right-1 p-5 shadow-2xl border-b flex flex-col items-center justify-center border-grayLighter border-solid w-max  bg-white rounded-lg">
                                    <Link href="/my-trips"  className="text-primary font-semibold border-b border-gray-400" onClick={() => setMenuIsOpen(false)}>
                                     Minhas vaigens
                                   </Link>
                                   <button className="text-primary font-semibold pt-2" onClick={handleLogoutClick}>
                                     Logout
                                   </button>
                                </div>
                            )
                        }
                    </div>
                )
            }

        </header>
    )
}