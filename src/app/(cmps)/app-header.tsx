"use client"
import Image from 'next/image'
import logo from '@/assets/imgs/ness-logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const AppHeader = () => {

    const pathname = usePathname()

    return <header className='app-header'>
        <section className='main-layout flex align-center navbar-container'>
            <div className='logo'>
                <Image src={logo} width={50} height={50} alt='LOGO' />
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
        </section>
    </header>
}

export default AppHeader