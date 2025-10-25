import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import Working from '@/components/Working'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Features/>
      <Working/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Home
