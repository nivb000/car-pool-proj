"use client"
import Image from 'next/image'
import logo from '@/assets/imgs/ness-logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from '@/interfaces/user'


const AppHeader = ({ user }: { user: User }) => {

    const pathname = usePathname()
    console.log("USER FROM HEADER", user)


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
                        <span>Hi {user?.name}</span>
                        <button>Log Out</button>
                    </div>
                }
            </div>
        </section>
    </header>
}

export default AppHeader