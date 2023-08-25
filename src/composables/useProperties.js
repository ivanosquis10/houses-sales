import { computed } from 'vue'
import { collection } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

export function useProperties() {
  // inicializamos
  const db = useFirestore()

  const propertiesCollection = useCollection(collection(db, 'properties'))

  // para poder recibir datos por props en un computed, se tiene que hacer de la sig forma:
  const formatPrice = computed(() => {
    return (price) => {
      const value = Number(price)
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    }
  })

  return {
    propertiesCollection,
    formatPrice
  }
}