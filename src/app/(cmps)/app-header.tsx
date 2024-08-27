"use client"
import Image from 'next/image'
import logo from '@/assets/imgs/ness-logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';


const AppHeader = () => {

    const pathname = usePathname()
    const { user, error, isLoading } = useUser()

    return <header className='app-header'>
        <section className='main-layout flex space-between align-center navbar-container'>
            <div className='logo'>
                <Image src={logo} width={50} height={50} alt='LOGO' priority={true} />
            </div>
            <nav className='flex space-between align-center'>
                <span className={`nav-link ${pathname === '/myaccount' ? 'active' : ''} `}>
                    <Link href="/myaccount">
                        החשבון שלי
                    </Link>
                </span>
                <span className={`nav-link ${pathname === '/myrides' ? 'active' : ''} `}>
                    <Link href="/myrides">
                       הנסיעות שלי
                    </Link>
                </span>
                <span className={`nav-link ${pathname === '/' || pathname === '/record' ? 'active' : ''} `}>
                    <Link href="/">
                        עמוד הבית
                    </Link>
                </span>
            </nav>
            <div>
                {user && 
                <div className='flex col'>
                    <span>Hi {user.name}</span>
                    <Link href="/api/auth/logout"><button>Log Out</button></Link>
                </div>
                }
            </div>
        </section>
    </header>
}

export default AppHeader