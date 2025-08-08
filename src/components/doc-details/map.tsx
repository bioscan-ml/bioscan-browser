import { Doc } from '@/types/response-data'
import { Map as _Map } from '../map'

interface MapProps {
  doc: Doc
}

export const Map = ({ doc }: MapProps) => {
  if (!doc.latlon) {
    return (
      <div className="text-center space-y-8 p-16">
        <div>
          <p className="text-xl font-medium mb-2">Map is not available</p>
          <p className="text-sm text-muted-foreground">
            The current record is missing information for latitude and
            longitude.
          </p>
        </div>
      </div>
    )
  }

  const [latitude, longitude] = doc.latlon
    .split(',')
    .map((value) => Number(value))

  const locationLabel = doc.province_state
    ? `${doc.province_state}, ${doc.country}`
    : doc.country

  return (
    <_Map
      marker={{ latitude, longitude }}
      popupContent={`${locationLabel}<br />(${latitude}, ${longitude})`}
    />
  )
}
