import './index.scss'
import { Container, Row, Col } from 'reactstrap';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {Loaders} from 'react-loaders'
import emailjs from '@emailjs/browser'
import {useRef} from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const form=useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm( 'service_0oggkef',
                'template_k8d09ot',
                form.current,
                'l06TSlQnqoYAHpioa')
      .then(
        ()=>{
                 toast.success("message sent")
                 },
                  ()=>{
                   toast.error("something went wrong try again")
                }
      )

      form.current.value=" "
  }
  return <Container>
      <Row>

        <Col lg="6" md="12">
            <div className="contact__form">
            <div className="form__text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem earum amet ea odit non eius optio sapiente blanditiis ad quo. Quisquam quis deleniti fugit maiores error adipisci rem itaque quas?
              </p>
            </div>
              <form onSubmit={sendEmail} ref={form}>
                    <input 
                    type="text" 
                    name="name"
                    placeholder='Enter your name'
                     />
                     <input 
                    type="email" 
                    name="email"
                    placeholder='Enter your email'

                     />
                     <input 
                    type="text" 
                    name="subject"
                    placeholder='subject'
                     />
                     <textarea 
                     name="message" placeholder='message'/>
                     <button className='btn btn-success rounded-pill'>SEND</button>
              </form>
            </div>
        </Col>
        <Col lg="6" md="12">
            <div className="map__wrap">
            <MapContainer center={[-1.2920659, 36.8219462]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-1.2920659, 36.8219462]}>
              <Popup>Dison lives here, come over for a cup of coffee :)</Popup>
            </Marker>
          </MapContainer>
            </div>
        </Col>
      </Row>
      
  </Container>
}

export default Contact;
