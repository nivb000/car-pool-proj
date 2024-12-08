"use client"
import Image from 'next/image'
import logo from '@/assets/imgs/ness-logo.png'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@/interfaces/user'
import { httpService } from '@/services/http.service'

// TODO: ADD MY ACCOUNT UNDER USER SECTION


const AppHeader = ({ user }: { user: User }) => {

    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        await httpService.delete('auth')
        router.push('/')
        router.refresh()
    }


    return <header className='app-header'>
        <section className='main-layout flex space-between align-center navbar-container'>
            <div className='logo'>
                <Image src={logo} width={50} height={50} alt='LOGO' priority={true} />
            </div>
            {user &&
                <>
                    <nav className='flex space-between align-center'>
                        {user?.isAdmin &&
                            <>
                                <span className={`nav-link ${pathname === '/carmgmt' ? 'active' : ''} `}>
                                    <Link href="/">
                                        ניהול רכבים
                                    </Link>
                                </span>
                                <span className={`nav-link ${pathname === '/usermgmt' ? 'active' : ''} `}>
                                    <Link href="/">
                                        ניהול משתמשים
                                    </Link>
                                </span>
                            </>
                        }
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
                        <div className='flex col'>
                            <span>{user?.name}</span>
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </>
            }
        </section>
    </header>

}

export default AppHeader