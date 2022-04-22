import { useState, useEffect } from 'react'
import { appFirestore } from '../firebase/config'

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ref = appFirestore.collection(collection)

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })

        //update state
        setDocuments(results)
        setError(null)
      },
      (error) => {
        console.log(error, 'Could not fetch')
        setError('could not fetch data')
      }
    )

    // unsubscribe on unmount
    return () => unsubscribe()
  }, [collection])
  return { documents, error }
}
