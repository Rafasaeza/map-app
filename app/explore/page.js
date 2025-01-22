'use client';
import MapCaller from "@/components/map/mapCaller";
import Nav from "@/components/global/nav";
import { useState,useEffect } from "react";
import GridImg from "@/components/global/gridImg";
import Wrapper from '@/components/global/wrapper'; 
export default function ExplorePage() {
  const [coordinates, setCoordinates] = useState([]);
  const [user, setUser] = useState({ email: "" });
  const [submited,setSubmited] = useState(false);
  useEffect(() => {
        const fetchCoordinates = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?email=rafasaezarana@gmail.com`);
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
    <Wrapper>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Explore</h1>

      <form
        onSubmit={handleCoordinates}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px', // Añadimos un margen inferior entre el formulario y el mapa
        }}
      >
        <input
          type="text"
          placeholder="Email del usuario"
          onChange={handleInputChange}
          value={user.email}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginBottom: '20px', // Añadimos un margen inferior al botón
          }}
        >
          Buscar
        </button>
      </form>

      {coordinates.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Busca un usuario con punteros</p>
      ) : (
        <MapCaller coordinates={coordinates} style={{ width: '100%', height: 'calc(100vh - 150px)' }} />
      )}

      {submited && user?.email && <GridImg email={user.email} />}
    </Wrapper>

    {/* Estilos Responsive */}
    <style jsx>{`
      @media (max-width: 768px) {
        div {
          padding: 15px;
        }

        h1 {
          font-size: 1.5rem;
        }

        input, button {
          font-size: 14px;
          padding: 10px;
        }

        /* Ajuste del mapa en pantallas pequeñas */
        .map-container {
          height: 50vh; /* Esto se asegura de que el mapa ocupe un tamaño adecuado en móviles */
        }
      }
    `}</style>
  </>
);

  
  
}
