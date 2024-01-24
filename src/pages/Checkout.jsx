 import React from 'react';
 import CommonSection from '../components/UI/CommonSection'
 import Helmet from '../components/Helmet/Helmet'
 import {Container,Row,Col,Form, FormGroup} from 'reactstrap'
 import '../styles/checkout.css'
 import {motion} from 'framer-motion'
 import {useSelector} from 'react-redux'
 import { totalQuantity, totalAmount } from '../redux/slices/cartSlice';
 
 const Checkout = () => {
  const totalQty=useSelector(totalQuantity)
  const subTotal=useSelector(totalAmount)
  const shipping=0
  const totalPrice= subTotal+shipping
   return <Helmet title='Checkout'>
    <CommonSection title='Checkout'/>
    <section>
      <Container>
        <Row>
          <Col lg="8">
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing__form'>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Enter your Name' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="email" placeholder='Enter your Email' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="number" placeholder='Phone number' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Street address' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='City' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Postal Code' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Country' />
                </FormGroup>
              </Form>
          </Col>
          <Col lg="4">
                <div className="checkout__cart">
                  <h6>Total Qty: <span>Ksh.{totalQty} items</span></h6>
                  <h6>Subtotal: <span>Ksh.{subTotal}</span></h6>
                  <h6>Shipping:<br/>
                  free shipping <span>Ksh.{shipping}</span></h6>
                  
                  <h4>Total Cost: <span>Ksh. {totalPrice}</span></h4>
                  <motion.button whileTap={{scale:1.1}} className="buy__btn auth__btn bg-light text-dark w-100">Place an order</motion.button>
                </div>
                
          </Col>
        </Row>
      </Container>
    </section>
   </Helmet>
 }
 
 export default Checkout;
 