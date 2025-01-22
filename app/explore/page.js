'use client';
import MapCaller from "@/components/map/mapCaller";
import Nav from "@/components/global/nav";
import { useState,useEffect } from "react";
import GridImg from "@/components/global/gridImg";

export default function ExplorePage() {
  const [coordinates, setCoordinates] = useState([]);
  const [user, setUser] = useState({ email: "" });
  const [submited,setSubmited] = useState(false);
  useEffect(() => {
        const fetchCoordinates = async () => {
        const response = await fetch(`/api/user?email=rafasaezarana@gmail.com`);
        const data = await response.json();
        console.log("Coordinadas:",data.coordinates);
        setCoordinates(data.coordinates); 
      };
      fetchCoordinates();
    }, []);
    
  const handleCoordinates = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (user.email) {
      try {
        const response = await fetch(`/api/user?email=${user.email}`);
        const data = await response.json();
        console.log("Coordinadas:", data.coordinates);
        setCoordinates(data.coordinates);
        setSubmited(true);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setUser({ email: e.target.value });
    setSubmited(false);
  };

  return (
    <>
      <Nav />
      <div>
        <h1>Explore</h1>
        <form onSubmit={handleCoordinates}>
          <input 
            type="text" 
            placeholder="Email del usuario" 
            onChange={handleInputChange} 
            value={user.email} 
          />
          <button type="submit">Buscar</button>
        </form>
        <div style={{ padding: '20px' }}>
          {coordinates.length === 0 ? (
            <p>Busca un usuario con punteros</p>
          ) : (
            <MapCaller coordinates={coordinates} />
          )}
        </div>
        {submited && user?.email && <GridImg  email={user.email}></GridImg> }
      </div>
    </>
  );
}
