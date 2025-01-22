import SignOut from "../sign-out"

export default function Nav() {
    return (
        <nav style={{padding: '20px', backgroundColor: "#f3f0f0"}} >
            <ul style={{display: 'flex', justifyContent: "space-between", padding: '20px', flexDirection: "row"}}>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/explore">Explore</a></li>
                <li> <SignOut></SignOut></li>
            </ul>
        </nav>
    )
}