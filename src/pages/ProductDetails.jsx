import React, {useState, useRef, useEffect} from 'react';
import { Container, Row,Col } from 'reactstrap';
import { useParams, useNavigation, useNavigate,Navigate, Form} from 'react-router-dom';
// import products from '../assets/data/products';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/product-detail.css'
import { motion } from 'framer-motion';
import { addItem } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import ProductsList from '../components/UI/ProductsList'
import { toast } from 'react-toastify';
import { selectAll ,updateReview} from '../redux/slices/product';
import { useSelector } from 'react-redux';
import { submitReview } from '../utils/getAuth';
import Stars from '../components/UI/Stars';
import {getAunthentication} from '../redux/slices/loginSlice'
import Spinner from '../components/Spinner';
import PriceFormat from "../components/Format"
const ProductDetails = () => {
  const [tab, setTab]=useState('desc')
  const [rating, setRating]= useState(0)
  const reviewUser=useRef()
  const reviewMsg=useRef()
  const products=useSelector(selectAll)
  const navigate=useNavigate()
  const authentication=useSelector(getAunthentication)
  const {id}=useParams()
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const product=products.find(item=>item?.id===parseInt(id))
  const [reviewData, setReview]=useState(product?.reviews)
  const item_id=parseInt(id)

  useEffect(()=>{
    window.scrollTo(0,300)
  },[product])
 
  if(!authentication){
    // toast.error("You must log in")
    return <Navigate to="/" replace/>
  }
   
  if(!product){
    return <Spinner/>
  }
  const {
    imgUrl, 
    productName, 
    price, 
    total_rating, 
    reviews, 
    description, 
    shortDesc,
    category
  }=product
 

  const addToCart=()=>{
    dispatch(addItem({
      id,
      imgUrl,
      productName,
      price
    }))
    toast.success("product added successfully")
  }

  const relatedProducts=products.filter(item=>item?.category.title===category?.title)
  const submitHandler=async(e)=>{
      e.preventDefault()

      const reviewUserMsg=reviewMsg?.current.value
      const reviewObj={
        userName:product?.category.admin.username,
        text:reviewUserMsg,
        rating:rating,
        item_id:item_id
      }
      console.log(reviewObj)
      const data=await submitReview(reviewObj)
      setReview(prev=>{
        if(prev.length>0){
          return [
            ...prev,
              data,
          ]
        }else{
          return [ 
            ...reviews,
             data,
            
          ]
        }
      })
      dispatch(updateReview({data:data, id:id}))
      reviewUser.current.value=""
      reviewMsg.current.value=""
      
  }
  

 

 
  
  return <Helmet title={productName}>
          <CommonSection title={'Product Detail'}/>
          <section className='pt-0'>
            <Container>
              <Row>
                <Col lg="6" className="mt-5">
                  <img src={imgUrl} alt="" />
                </Col>
                <Col lg="6">
                  <div className="d-flex flex-column p-3 product__details ">
                    <h2>{productName}</h2>
                    
                        <div className="product__rating d-flex align-items-center gap-5 mb-3">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <Stars total_rating={total_rating}/>
                              <p>
                            (<span>{total_rating}</span>) ratings
                            </p>
                            </div>
                        
                        </div>
                    
                        <div className='d-flex align-items-center gap-5'>
                          <span className='product__price'>{<PriceFormat price={price}/>}</span>
                          <span>Category: {category?.title.toUpperCase()}</span>
                        </div>
                   
                          <p className='mt-3'>{shortDesc}</p>
                          <motion.button whileTap={{scale:1.1}} className="buy__btn" onClick={addToCart}>Add to Cart</motion.button>
                  </div>
                </Col>
                <Col lg="12" className='mt-5'>
                  <h2 className='related__title'>You might also like</h2>
                </Col>
                <ProductsList data={relatedProducts}/>
              </Row>
            </Container>
          </section>
          <section>
            <Container>
              <Row>
                <Col lg="12">
                   <div className="tab__wrapper d-flex align-items-center gap-5">
                   <h6 className={`${tab==="desc" ? "active__tab" : ""}`}
                   onClick={()=>setTab("desc")}
                   >Description</h6>
                    <h6 className={`${tab==="rev" ? "active__tab" : ""}`}
                    onClick={()=>setTab("rev")}
                    >Reviews ({reviewData?reviewData.length:reviews.length})</h6>
                   </div>
                   {
                    tab==='desc'?(<div className="tab__content mt-5">
                    {description}
                   </div>):( <div className='product__review mt-5'>
                    <div className="review__wrapper">
                      <ul>
                        {
                          reviewData?reviewData?.map((item, index)=>(
                            <li key={index} className='mt-4'>
                            <h6>{item?.userName}</h6>
                            <span>{item?.rating} (average rating)</span>
                            <p>{item?.text}</p>
                            
                            </li>
                          )):reviews?.map((item, index)=>(
                            <li key={index} className='mt-4'>
                            <h6>{item?.userName}</h6>
                            <span>{item?.rating} (average rating)</span>
                            <p>{item?.text}</p>
                            
                            </li>
                          ))
                        }
                      </ul>
                      <div className="review__form">
                      <h4>Leave your experience</h4>
                        <form onSubmit={submitHandler}>
                          <div className="form__group">
                            <input type="text" required placeholder='Enter name' ref={reviewUser}/>
                          </div>
                          <div className="form__group d-flex align-items-center gap-5 rating__group">
                            <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(4)}>4<i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                          </div>
                          <div className="form__group">
                            <textarea rows={4}
                             type="text"
                             required
                              placeholder='review message....' ref={reviewMsg}/>
                          </div>
                          <motion.button whileTap={{scale:1.2}} type="submit" className="buy__btn">{navigation.state==='idle'?"submit":"submitting..."}</motion.button>
                        </form>
                      </div>
                    </div>
                   </div>
                   )}
                   
                </Col>
              </Row>
            </Container>
          </section>
  </Helmet>
}

export default ProductDetails;
