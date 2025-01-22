'use client'
import { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  gap: 20px; /* Espacio entre elementos */
  padding: 30px; /* Espacio alrededor del contenedor */
`;

const GridItem = styled.div`
  position: relative; /* Ajusta el contenido dentro del grid */
`;

const GridImage = styled(CldImage)`
  width: 400px; /* Tamaño fijo */
  height: 400px; /* Tamaño fijo */
  object-fit: cover; /* Mantiene la relación de aspecto sin distorsionar */
  border-radius: 8px; /* Bordes redondeados opcionales */
`;

export default function GridImg({ email }) {
    const [userData, setUserData] = useState(null);

    // Realizamos el fetch solo una vez, cuando el componente se monte
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?email=${email}`);
                const data = await response.json();
                setUserData(data); // Guardamos los datos en el estado
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [email]); // Dependemos de `email` para hacer la solicitud, y solo ejecutamos el efecto una vez

    // Si aún no se cargan los datos, mostramos un mensaje de carga
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <GridContainer>
            {userData.coordinates.map((coordinate) => (
                <GridItem key={coordinate.urlImg}>
                    <GridImage 
                        width="200" 
                        height="200" 
                        src={coordinate.urlImg} 
                        alt="pointer-img" 
                    />
                </GridItem>
            ))}
        </GridContainer>
    );
}
