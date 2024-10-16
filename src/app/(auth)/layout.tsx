import SiteFooter from "@/components/layouts/site-footer"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const user = await currentUser()
    if (user) redirect('/')

    return (
        <>
            <div className="absolute z-50 -translate-x-2/4 -translate-y-2/4 sm:-translate-y-[40%] left-2/4 top-2/4 w-full px-4 sm:px-0">
                {children}
            </div>
            <SiteFooter />
        </>
    )
}
