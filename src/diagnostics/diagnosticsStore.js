import { collection, doc, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../firebase/config.js'

export function createDiagnosticId() {
  return doc(collection(db, 'diagnosticos')).id
}

export async function saveDiagnostic(id, diagnostic) {
  await setDoc(doc(db, 'diagnosticos', id), {
    ...diagnostic,
    createdAt: serverTimestamp(),
  })
}

export function subscribeToGradeDiagnostics(grade, onResults, onError) {
  const diagnosticsQuery = query(
    collection(db, 'diagnosticos'),
    where('grade', '==', grade),
  )

  return onSnapshot(
    diagnosticsQuery,
    (snapshot) => {
      const results = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
      onResults(results)
    },
    onError,
  )
}
