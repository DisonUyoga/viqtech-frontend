import axios from 'axios'
import {toast} from 'react-toastify'
import {redirect} from 'react-router-dom'


export async function loginUser(cred){
  const URL="/api/token/"
  try {
    const res=await axios.post(URL,cred)
    return [res.data]
  } catch (error) {
    return error.message
  }
}

export async function submitReview(cred){
  const URL= "/api/products/create/"
  try {
    const res=await axios.post(URL,cred)
    toast.success("review submitted")
    console.log("review",res.data)
    return res.data
  } catch (error) {
    return toast.error(error.message)
  }
  
}

export async function signupUser(creds){
  const URL="/api/users/"
  try {
    const res= await axios.post(URL, creds)
    toast.success(`${res.data.username} your sign up was successful`)
    
    return res.data
  } catch (error) {
    return toast.error(error.message)
  }
}