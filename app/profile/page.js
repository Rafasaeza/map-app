import UserAvatar from "@/components/userAvatar"
import { auth } from "@/auth"
import Nav from "@/components/global/nav"
export default async function Profile() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>
    return (
        <>
            <Nav></Nav>
            <UserAvatar></UserAvatar>
        </>
    )
}