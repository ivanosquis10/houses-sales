import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirestore, useDocument } from 'vuefire'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'


export const useFireStores = defineStore('firestore', () => {

  const db = useFirestore()
  const loading = ref(false)

  async function addProperties({ properties, image, location }) {
    const docRef = await addDoc(collection(db, 'properties'), {
      ...properties, image, location
    })
    // console.log(docRef)
  }

  async function getDocument(id) {
    loading.value = true
    console.log(loading.value)
    const docRef = doc(db, 'properties', id)

    const propertie = useDocument(docRef)

    loading.value = false
    console.log(loading.value)
    return propertie
  }

  async function updatePropertie(id,data) {
    const docRef = doc(db, 'properties', id)
    await updateDoc(docRef, data)
  }

  return {
    addProperties,
    getDocument,
    updatePropertie,
    loading
  }
})