import '../TvShows/TvShows.css'
import TitleCards from '../../components/TitleCards/TitleCards'
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';
const Movies = () => {

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
        <h1>Movies</h1>
        <p>Watch the latest movies and series</p>
      </div>
      <TitleCards title="Now Playing" genre="movie" category="now_playing" />
      <TitleCards title="Popular Movies" genre="trending" category="movie" day={"day"} />
      <TitleCards title="Blockbuster Movies" genre="movie" category="top_rated" />
        <TitleCards title="Upcoming Movies" genre="movie" category="upcoming" />
    </motion.div>
  )
}

export default Movies;