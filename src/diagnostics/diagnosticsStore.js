import { collection, doc, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { auth, db } from '../firebase/config.js'

export function createDiagnosticId() {
  return doc(collection(db, 'diagnosticos')).id
}

export async function saveDiagnostic(id, diagnostic) {
  const user = auth.currentUser
  if (!user) {
    const error = new Error('Debes iniciar sesión para enviar el diagnóstico.')
    error.code = 'unauthenticated'
    throw error
  }

  await setDoc(doc(db, 'diagnosticos', id), {
    ...diagnostic,
    submittedBy: user.uid,
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
