'use client';
import { useEffect, useState } from "react";
import OpenStreetMap from "./open-street-map";
import GridImg from "../global/gridImg";

export default function MapOwner({ user }) {
  const [coordinates, setCoordinates] = useState([]);
  const [location, setLocation] = useState(""); // Entrada para la ciudad o país
  const formData = new FormData();
  const [refreshGrid, setRefreshGrid] = useState(false); // Estado para forzar la actualización de GridImg

  // Obtener las coordenadas del usuario desde la base de datos al montar el componente
  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?email=${user.email}`);
      const data = await response.json();
      setCoordinates(data.coordinates || []); // Maneja el caso donde no haya coordenadas
    };
    fetchCoordinates();
  }, [user]);

  // Maneja el efecto para refrescar GridImg al añadir una nueva imagen
  useEffect(() => {
    if (refreshGrid) {
      setRefreshGrid(false); // Restablecer el estado después de actualizar GridImg
    }
  }, [refreshGrid]);

  // Obtener las coordenadas de una ciudad o país usando una API de geocoding
  const getCoordinatesFromLocation = async (location) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${location}&format=json`);
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } else {
      alert("No se pudo encontrar la ubicación.");
      return null;
    }
  };

  // Manejar la subida de la imagen
  const handleImageUpload = async () => {
    if (formData.get('file')) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/image-upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        return data.url;
      } else {
        alert("Error al subir la imagen.");
        return null;
      }
    } else {
      alert("No se ha seleccionado ninguna imagen.");
      return null;
    }
  };

  // Manejar la adición de una nueva coordenada
  const handleAddCoordinate = async () => {
    const uploadUrl = await handleImageUpload(); // Sube la imagen y obtiene la URL
    if (uploadUrl && location) {
      const coords = await getCoordinatesFromLocation(location);
      if (coords) {
        // Guardar la nueva coordenada en la base de datos
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?email=${user.email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lat: coords.lat, lon: coords.lon, urlImg: uploadUrl }),
        });

        if (response.ok) {
          // Añadir la nueva coordenada directamente al estado
          setCoordinates((prev) => [...prev, { lat: coords.lat, lon: coords.lon, urlImg: uploadUrl }]);
          setRefreshGrid(true); // Forzar la actualización de GridImg
        } else {
          alert("Error al agregar la coordenada.");
        }
      }
    }
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        {/* Formulario para ingresar una ciudad o país */}
        <input
          type="text"
          placeholder="Ingrese una ciudad o país"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => {
            if (!formData.get("file")) {
              formData.append('file', e.target.files[0]);
            }
          }}
        />
        <button
          style={{ marginLeft: '5px', backgroundColor: "#f3f0f0", borderRadius: "10%", padding: '5px' }}
          onClick={handleAddCoordinate}
        >
          Añadir
        </button>
      </div>
      <div style={{ height: '50vh', width: '100%' }}>
        {/* Mapa */}
        <OpenStreetMap coordinates={coordinates} />
        {/* GridImg se actualizará automáticamente */}
        {refreshGrid || <GridImg email={user.email} />}
      </div>
    </>
  );
}
