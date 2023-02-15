import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";

import andaluciaData from '../img/andalucia.geojson';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView([37.3828300, -5.9731700], 7);

    // Add base layer
    const baseLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "Map data &copy; OpenStreetMap contributors",
        maxZoom: 18,
      }
    );
    baseLayer.addTo(map);

    // Add Andalucia geojson layer
    const geojsonLayer = L.geoJson(andaluciaData, {
      style: {
        weight: 2,
        color: "#fff",
        fillColor: "#1f78b4",
        fillOpacity: 0.5,
      },
      onEachFeature: onEachFeature,
    });
    geojsonLayer.addTo(map);

    // Zoom to Andalucia bounds
    map.fitBounds(geojsonLayer.getBounds());

    // Function to handle province click
    function onProvinceClick(e) {
      const provinceName = e.target.feature.properties.name;
      alert(`You clicked on ${provinceName}`);
    }

    // Function to handle province mouseover
    function onProvinceMouseover(e) {
      const layer = e.target;
      layer.setStyle({
        weight: 2,
        color: "#000",
        fillColor: "#fff",
        fillOpacity: 0.7,
      });
    }

    // Function to handle province mouseout
    function onProvinceMouseout(e) {
      geojsonLayer.resetStyle(e.target);
    }

    // Function to add events to province layer
    function onEachFeature(feature, layer) {
      layer.on({
        click: onProvinceClick,
        mouseover: onProvinceMouseover,
        mouseout: onProvinceMouseout,
      });
    }

    return () => {
      // Cleanup map on unmount
      map.remove();
    };
  }, []);

  return <div ref={mapRef} style={{ height: "500px" }}></div>;
};

export default Map;
