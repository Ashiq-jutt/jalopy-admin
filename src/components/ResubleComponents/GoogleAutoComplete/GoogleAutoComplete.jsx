import React, { useState, useRef, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api'; 
import { InputText } from 'primereact/inputtext';
import "./GoogleAutoComplete.css"
const libraries = ['places'];

const GoogleAutoComplete = ({formik}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY, // Replace with your Google Maps API key
    libraries,
  });

  const inputRef = useRef(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'], // Limit results to addresses
      });

      autocomplete.addListener('place_changed', () => {     
      
        const place = autocomplete.getPlace();  
        if (place.geometry) {
          const lat = place.geometry.location.lat(); 
          const lng = place.geometry.location.lng(); 
          formik.setFieldValue("Latitude",lat) 
         formik.setFieldValue("Longitude",lng)  
           formik.setFieldValue("Location",place.formatted_address)
          setLocation({ lat, lng });
        }
      });
    }
  }, [isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;


  return (
    <div>
      <InputText 
              className="text-main-color border w-full mt-2 p-2 relative" onChange={formik.handleChange} name="Location" value={formik.values.Location}  ref={inputRef} type="text" placeholder="Enter a location" />
    </div>
  );
};

export default GoogleAutoComplete;
