import UserAvatar from "@/components/userAvatar"
import { auth } from "@/auth"
export default async function Profile() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>
    return (
        <>
            <h1>Profile Page</h1>
            <UserAvatar></UserAvatar>
        </>
    )
}