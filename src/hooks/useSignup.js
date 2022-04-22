import { useState, useEffect } from 'react'
import { appAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)
    try {
      //signup user
      const res = await appAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }
      // add display name to user
      await res.user.updateProfile({ displayName })

      // Dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      // to sign out users after login
      // await appAuth.signOut()

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, signup }
}
