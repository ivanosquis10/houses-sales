import { useFirestore, useDocument } from 'vuefire'
import { collection, addDoc, doc } from 'firebase/firestore'

const db = useFirestore()

async function addProperties({ properties, image, location }) {
  const docRef = await addDoc(collection(db, 'properties'), {
    ...properties, image, location
  })
  // console.log(docRef)
}

async function getDocument(id) {
  const docRef = doc(db, 'properties', id)
  const propertie = useDocument(docRef)
  return propertie
}

async function updateDocument(docRef, data) {
  console.log(docRef, data)
}

export {
  addProperties,
  getDocument,
}