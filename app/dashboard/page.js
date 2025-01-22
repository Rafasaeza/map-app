import  SignOut  from "@/components/sign-out"
import Nav from "@/components/global/nav"
import { auth } from "@/auth"
import MapCaller from '@/components/map/mapCaller';
import GridImg from "@/components/global/gridImg";
import Wrapper from "@/components/global/wrapper";
export default async function Home() {
    //UseMemo = Utiliza la memoria para guardar la información del mapa evitando que se recarge en cada renderizado
    
    const session = await auth();
    if (!session) return <div>Not authenticated</div>;
    const user = session.user;

    return (
        <>
        
        <Nav></Nav>
        <Wrapper>
        <h1 style={{display: 'flex', flexDirection:'row' , justifyContent: 'center', marginTop: '20px', fontSize:"30px"}}>Map of {user.name}</h1>
        <MapCaller user={user} owner={true}></MapCaller>
           <GridImg email={user.email}></GridImg> 
        </Wrapper>  
        </>
    )
}