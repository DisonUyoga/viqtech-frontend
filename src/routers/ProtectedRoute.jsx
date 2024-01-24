import React from 'react';
// import useAuth from '../custom-hooks/useAuth'
import { Navigate } from 'react-router-dom';
import { getAunthentication } from '../redux/slices/loginSlice';
import {useSelector} from 'react-redux'
const ProtectedRoute = ({children}) => {
    // const {currentUser}= useAuth()
    const authentication=useSelector(getAunthentication)
    console.log('these are',children)
  return authentication?children:<Navigate to="/login"/>
}

export default ProtectedRoute;
