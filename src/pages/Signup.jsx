import React, {useState} from 'react';
import Helmet from '../components/Helmet/Helmet'
import {Container, Row,Col, Form, FormGroup} from 'reactstrap'
import { Link, redirect, useNavigate } from 'react-router-dom';
import '../styles/login.css'
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
// import {auth} from '../firebase.config'
// import {storage} from '../firebase.config'
// import { db} from '../firebase.config'
import {toast} from 'react-toastify'
// import {setDoc, doc} from 'firebase/firestore'
import { signupUser } from '../utils/getAuth';


const Signup = () => {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [username, setUsername]=useState('')
  const navigate=useNavigate()
  // const [file, setFile]=useState(null)
  const [loading, setLoading]=useState(false)
  
  const signup=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const res=await signupUser({email,username, password,})
      setLoading(false)
      if(res?.username){
        navigate("/login")
      }
      
    } catch (error) {
      setLoading(false)
      return
    }
    // try{
    //   const userCredentials=await createUserWithEmailAndPassword(
    //     auth, email, password
    //     )
    //     const user= userCredentials.user
    //     const storageRef= ref(storage, `images/${Date.now()+username}`);
    //     const uploadTask=uploadBytesResumable(storageRef, file);
    //     uploadTask.on(
    //       (error)=>{
    //       toast.error(error.message)
    //     }, ()=>{
    //       getDownloadURL(uploadTask.snapshot.ref).then(
    //         async(downloadURL)=>{
    //         // update user profile
    //         await updateProfile(user,{
    //           displayName:username,
    //           photoURL:downloadURL,
    //         })
    //         // store user data in firestore database
    //         await setDoc(doc(db,"users",user.uid),{
    //           uid:user.uid,
    //           displayName:username,
    //           email,
    //           photoURL:downloadURL,
    //         })
    //       })
    //     })
    //     toast.success("Account created")
    //     navigate("/login", {replace:true})
    //     setLoading(false)

    // }catch(err){
    //   setLoading(false)
    //     toast.error("something went wrong please try again")
    // }
  }
  return <Helmet title="Signup">
    <Container>
      <Row>
      {
        loading? <Col className="text-center"><h5 className="fw-bold">Loading...</h5></Col>:(
          <Col lg="6" className='m-auto text-center mb-5'>
            <h3 className='mb-4 fw-bold'>Signup</h3>
            <Form className='auth__form' onSubmit={signup}>
            <FormGroup className='form__group'>
                <input type="text" 
                placeholder='username' 
                value={username} onChange={e=>setUsername(e.target.value)}

                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="email" 
                placeholder='Enter your email' 
                value={email} onChange={e=>setEmail(e.target.value)}

                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="password" 
                placeholder='Enter your password' 
                value={password} 
                onChange={e=>setPassword(e.target.value)}

                />
              </FormGroup>
              {/* <FormGroup className='form__group'>
                <input type="file" 
               
                onChange={e=>setFile(e.target.files[0])}

                />
              </FormGroup> */}
              <button type='submit' className="buy__btn auth__btn">Create an Account</button>
              <p>Already have an account ?<Link to='/login'>Login</Link></p>
            </Form>
        </Col>
        )
        
      }
        
      </Row>
    </Container>
  </Helmet>
}

export default Signup;
