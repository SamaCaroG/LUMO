import {
  addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, where,
} from 'firebase/firestore'
import { auth, db } from '../firebase/config.js'

function requireUser() {
  const user = auth.currentUser
  if (!user) {
    const error = new Error('Debes iniciar sesión.')
    error.code = 'unauthenticated'
    throw error
  }
  return user
}

const createdAtMillis = (item) => item.createdAt?.toMillis?.() ?? Date.now()
const newestFirst = (a, b) => createdAtMillis(b) - createdAtMillis(a)

// ---------- Imágenes (se guardan dentro del documento de Firestore) ----------

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'))
    reader.readAsDataURL(file)
  })
}

// Firestore limita cada documento a 1 MB, así que se reduce la imagen a JPEG liviano.
export function compressImage(source, maxChars = 700000) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      let maxSide = 1100
      for (let attempt = 0; attempt < 6; attempt += 1) {
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale))
        canvas.height = Math.max(1, Math.round(image.height * scale))
        const context = canvas.getContext('2d')
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        for (const quality of [0.8, 0.65, 0.5, 0.4]) {
          const result = canvas.toDataURL('image/jpeg', quality)
          if (result.length <= maxChars) {
            resolve(result)
            return
          }
        }
        maxSide = Math.round(maxSide * 0.75)
      }
      reject(new Error('La imagen es demasiado grande.'))
    }
    image.onerror = () => reject(new Error('No se pudo abrir la imagen.'))
    image.src = source
  })
}

// ---------- Actividades del docente (colección "actividades") ----------

export async function publishActivity(activity) {
  const user = requireUser()
  await addDoc(collection(db, 'actividades'), {
    title: activity.title,
    content: activity.content,
    grade: activity.grade,
    publishedDate: activity.publishedDate,
    dueDate: activity.dueDate,
    attachmentName: activity.attachmentName ?? '',
    attachmentData: activity.attachmentData ?? '',
    createdBy: user.uid,
    createdAt: serverTimestamp(),
  })
}

export function removeActivity(id) {
  return deleteDoc(doc(db, 'actividades', id))
}

export function subscribeToGradeActivities(grade, onResults, onError) {
  const activitiesQuery = query(collection(db, 'actividades'), where('grade', '==', grade))
  return onSnapshot(
    activitiesQuery,
    (snapshot) => {
      onResults(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })).sort(newestFirst))
    },
    onError,
  )
}

// ---------- Entregas de dibujos (colección "entregas") ----------

export async function saveSubmission(submission) {
  const user = requireUser()
  await addDoc(collection(db, 'entregas'), {
    practiceKey: submission.practiceKey,
    practiceTitle: submission.practiceTitle,
    grade: submission.grade,
    studentName: submission.studentName,
    fileName: submission.fileName,
    imageData: submission.imageData,
    submittedBy: user.uid,
    createdAt: serverTimestamp(),
  })
}

export function subscribeToGradeSubmissions(grade, onResults, onError) {
  const submissionsQuery = query(collection(db, 'entregas'), where('grade', '==', grade))
  return onSnapshot(
    submissionsQuery,
    (snapshot) => {
      onResults(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })).sort(newestFirst))
    },
    onError,
  )
}
