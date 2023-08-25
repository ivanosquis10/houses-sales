import { ref } from 'vue'


export function useLocationMap() {
  const zoom = ref(12)
  const center = ref([39.6889827, -104.8516453])

  const getMarkerLocation = e => {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    getMarkerLocation
  }
}