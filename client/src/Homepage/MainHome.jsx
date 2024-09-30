import { CallToAction } from './call-to-action'
import { Faqs } from './faqs'
import { Footer } from './footer'
import { Hero } from './hero'
import { ProductShowcase } from './product-showcase'
import MainFeature from './MainFeature'
import RoomForm from '../components/RoomForm'
import { useState } from 'react'

export default function MainHome() {
  
  const [roomForm,setRoomForm] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden antialiased"> 
    {roomForm ? <RoomForm setRoomForm={setRoomForm}/> : null}
    <Hero setRoomForm={setRoomForm}/>
    <MainFeature/>
    <ProductShowcase />
    <Faqs />
    <CallToAction />
    <Footer />
    </div>
  )
}
