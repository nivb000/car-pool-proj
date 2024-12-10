import 'server-only';

import type { SessionPayload } from '@/interfaces/session'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { getById } from '../user/user.service';

const secretKey = process.env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secretKey)


export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1hr')
        .sign(key)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    redirect('/record')
}

export async function verifySession() {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
    

    if (!session?.userId) {
        return { isAuth: false }
    }
    

    return { isAuth: true, userId: session.userId }
}

export async function verifyAdmin() {
    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)
    if(!session?.userId){
        return { isAuth: false, isAdmin: false }
    }
    const user = await getById(session.userId)

    if (!user.isAdmin) {
        return { isAuth: true, isAdmin: false }
    }
    return { isAuth: true, isAdmin: true, userId: session.userId }
}

export async function updateSession() {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;

    try {
        const user = await getById(session.userId)
        user._id = user._id.toString()
        return user
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})

export function deleteSession() {
    cookies().delete('session')
}