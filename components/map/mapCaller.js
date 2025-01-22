'use client';

import dynamic from 'next/dynamic';

const OpenStreetMap = dynamic(() => import("@/components/map/open-street-map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const MapOwner = dynamic(() => import("@/components/map/open-street-map-owner"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function MapCaller({user = null,owner = false, coordinates}) {
  if (owner) {
    return (
      <MapOwner user={user}/>
    )
  }else{
    return (
      <OpenStreetMap coordinates={coordinates} newCoordinate={null}/>
    )

  }

}

