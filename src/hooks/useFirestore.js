import { useReducer, useEffect, useState } from 'react'
import { appFirestore, appStorage, timestamp } from '../firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case 'ERROR':
      return {
        isPending: false,
        documents: null,
        success: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  //collection ref
  const ref = appFirestore.collection(collection)

  //only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add document
  const addDocument = async ({ details, file }) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      // add document
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ details, createdAt })

      // upload file
      const storagePath = `file/${addedDocument.id}/${file.name}`
      const img = await appStorage.ref(storagePath).put(file)
      const imgUrl = await img.ref.getDownloadURL()
      console.log(storagePath)

      //add to document
      await addedDocument.update({ imgUrl })

      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //delete document
  const deleteDocument = async (doc) => {}

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
