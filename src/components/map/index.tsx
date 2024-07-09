import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import {
  ATTRIBUTION,
  DEFAULT_HEIGHT,
  DEFAULT_ZOOM,
  MIN_ZOOM,
  TILE_LAYER_URL,
} from './constants'

interface MapProps {
  height?: number
  marker: {
    latitude: number
    longitude: number
  }
  popupContent: string
}

export const Map = ({ height, marker, popupContent }: MapProps) => {
  const markerPosition = new L.LatLng(marker.latitude, marker.longitude)

  return (
    <MapContainer
      center={markerPosition}
      className="w-full rounded-sm"
      minZoom={MIN_ZOOM}
      scrollWheelZoom
      style={{
        height: height ?? `${DEFAULT_HEIGHT}px`,
      }}
      zoom={DEFAULT_ZOOM}
    >
      <TileLayer attribution={ATTRIBUTION} url={TILE_LAYER_URL} />
      <Marker
        ref={(ref) => {
          setTimeout(() => ref?.openPopup(), 0)
        }}
        position={markerPosition}
      >
        <Popup>
          <p
            className="text-center text-sm"
            dangerouslySetInnerHTML={{ __html: popupContent }}
          />
        </Popup>
      </Marker>
    </MapContainer>
  )
}
