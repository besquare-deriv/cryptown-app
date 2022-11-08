import { useState } from 'react'
import axios from "axios";
import { useAuthContext } from './useAuthContext'


export const useLogin = () => {
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    setStatus(null)

    try{
      const response = await axios.post( process.env.REACT_APP_URL + 'api/user/login',
    {
        'email' : email,
        'password': password, 
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }

    })
    const json = await response.data

    if (response.status === 200) {
         // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      // update loading state
      setIsLoading(false)
    }

    } catch(error){
      setIsLoading(false)
      setStatus(error.response.data.mssg)
      setError(error.response.data.error)
    }
  }

  return { login, isLoading, error, status }
}