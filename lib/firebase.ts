import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, DocumentData } from 'firebase/firestore'
import { Event } from '../types/index'

const firebaseConfig = {
    apiKey: "AIzaSyDP4D1V_utCsq5Yf0c1XlZ1_aaf93-mllE",
    authDomain: "nindao-calendar2.firebaseapp.com",
    projectId: "nindao-calendar2",
    storageBucket: "nindao-calendar2.appspot.com",
    messagingSenderId: "119954127943",
    appId: "1:119954127943:web:b6c5cdefbcf88a61b38562",
    measurementId: "G-RMLLBPK933"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getEvents = async (): Promise<Event[]> => {
  const eventsCol = collection(db, 'events')
  const eventSnapshot = await getDocs(eventsCol)
  return eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event))
}

export const addEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
    const eventsCol = collection(db, 'events')
    const docRef = await addDoc(eventsCol, event)
    return { id: docRef.id, ...event }
  }