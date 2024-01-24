 import React from 'react';
 import '../styles/cart.css'
 import Helmet from '../components/Helmet/Helmet'
 import CommonSection from '../components/UI/CommonSection'
 import {Container, Row,Col} from 'reactstrap'
 import tdImg from '../assets/images/arm-chair-01.jpg'
 import {motion} from 'framer-motion'
 import {Link} from 'react-router-dom'
 import {addItem, cartItems, deleteItem, totalAmount} from '../redux/slices/cartSlice'
 import {useSelector, useDispatch} from 'react-redux'
 import {toast} from 'react-toastify'
 
 const Cart = () => {
  const cartItem = useSelector(cartItems)
  const total= useSelector(totalAmount)
  const dispatch=useDispatch()
  const deleteItems=(id)=>{
    dispatch(deleteItem({id}))

    toast.success("Item deleted successfully")
  }
 
   return <Helmet title="Cart">
      <CommonSection title="Shopping Cart"/>
      <section>
        <Container>
          <Row>
            <Col lg="9">
            {
              cartItem?.length ===0? <h2 className='fs-4 text-center'>No items added to the cart</h2>:
            
              (<table className="table bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price(Ksh)</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {
                  cartItem?.map((item, index)=>(
                    <Tr item={item} key={index} deleteItems={deleteItems}/>
                  ))
                }
                  
                </tbody>
              </table>)
            }
            </Col>
            <Col lg="3">
              <div className='d-flex align-items-center justify-content-between'>
                <h6>Subtotal</h6>
                <span className='fs-4 fw-bold'>Ksh.{total}</span>
              </div>
              <p className='fs-6 mt-6'>Taxes and shipping will be calculated in checkout</p>
              
              <div>
                <motion.button whileTap={{scale:1.2}}  className=" w-100 buy__btn"><Link to="/checkout">Checkout</Link></motion.button >
              </div>
              <div>
                <motion.button whileTap={{scale:1.2}}  className=" w-100 buy__btn mt-3"><Link to="/shop">Continue shopping</Link></motion.button >
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
   </Helmet>
 }
 const Tr=({item, deleteItems})=>{
  return <tr>
  <td><img src={item.imgUrl} alt="" /></td>
  <td>{item.productName}</td>
  <td>{item.price}</td>
  <td>{item.quantity}</td>
  <td><motion.i whileTap={{scale:1.2}} className="ri-delete-bin-line" onClick={()=>deleteItems(item.id)}></motion.i></td>
</tr>
 }
 export default Cart;
 