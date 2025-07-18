import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  lat: number;
  lng: number;
  address: string;
};

export default function MapLocationCardComponent({
  lat,
  lng,
  address,
}: MapProps) {
  const position: LatLngExpression = [lat, lng];

  return (
    <div className="flex flex-row items-center gap-4 ">
      <div className="w-48 sm:w-60 h-44 rounded-xl overflow-hidden flex-shrink-0">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="text-gray-700 text-sm max-w-xs">{address}</div>
    </div>
  );
}
