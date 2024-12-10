"use client"
import Image from 'next/image'
import logo from '@/assets/imgs/ness-logo.png'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@/interfaces/user'
import { httpService } from '@/services/http.service'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

// TODO: ADD MY ACCOUNT UNDER USER SECTION


const AppHeader = ({ user }: { user: User }) => {

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        setAnchorEl(null)
        await httpService.delete('auth')
        router.push('/')
        router.refresh()
    }


    return <header className='app-header'>
        <section className='main-layout flex space-between align-center navbar-container'>
            <div className='logo'>
                <Image src={logo} width={50} height={50} alt='LOGO' priority={true} />
            </div>
            {user ?
                <>
                    <nav className='flex space-between align-center'>
                        {user?.isAdmin &&
                            <>
                                <span className={`nav-link ${pathname === '/carmgmt' ? 'active' : ''} `}>
                                    <Link href="/carmgmt">
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
                    <div className='user-menu'>
                        <IconButton size="large"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit">
                            <img src={`https://ui-avatars.com/api/?background=076dff&color=fff&name=${user?.name}`} alt='profile-pic' />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}>
                            <MenuItem>
                                <Link href={"/myaccount"} style={{ textDecoration: 'none', color: 'black' }}>
                                    החשבון שלי
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>התנתק</MenuItem>
                        </Menu>
                    </div>
                </>
                :
                <Link href={"/"}>
                    התחבר
                </Link>
            }
        </section>
    </header>

}

export default AppHeader