import { computed } from 'vue'
import { ref as storageRef } from 'firebase/storage'
import { useStorageFile, useFirebaseStorage } from 'vuefire'

export function useImage() {

  // para que firebase lea nuestras credenciales
  const storage = useFirebaseStorage()

  // primero pasamos los datos de comprobacion y luego pásamos la forma (o ruta) en la que queremos que se guarde en el storage
  const storageRefPath = storageRef(storage, `/properties/${crypto.randomUUID()}.jpg`)

  // sacamos la function para subir "upload" y la "url" donde se guardará
  const { url, upload } = useStorageFile(storageRefPath)

  const uploadImage = data => {
    // console.log(data)
    if (data) upload(data)

  }

  const imagePreview = computed(() => {
    return url.value ? url.value : null
  })

  return {
    uploadImage,
    imagePreview,
    url
  }
}