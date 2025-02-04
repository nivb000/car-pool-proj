import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../assets/styles/main.scss"
import AppHeader from "./(cmps)/app-header"
import { getUser } from '@/services/server/auth/session.service'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ness car pool",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const user = await getUser() || null 

  return (
    <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <AppHeader user={user} />
          <main>
            {children}
          </main>
        </body>
    </html>
  )
}