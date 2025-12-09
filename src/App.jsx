import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/Navbar'
import Heros from './components/Heros'
import Nosoffres from './components/Nosoffres'
import NotreArt from './components/Notrearts'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './components/ThemeContext'


gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  return (
    <ThemeProvider >
    <div className='min-h-screen'>
        <Navbar />
        <Heros />
        <Nosoffres />
        <NotreArt />
        <ScrollToTop />
        <Footer />
    </div>
  </ThemeProvider>
  )
}

export default App