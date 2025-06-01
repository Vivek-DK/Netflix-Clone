import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';
import News from '../../components/TitleCards/News';
const Business = () => {

  const pageTransition = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } }
};

  return (
    <motion.div
      className='tv-shows'
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Navbar />
      <div className="tv-shows-header">
        <h1>Business</h1>
        <p>Watch the latest business updates</p>
      </div>
      <News category={"business"}/>
    </motion.div>
  )
}

export default Business;