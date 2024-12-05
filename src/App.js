import React, {useState} from 'react'; 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import MovieManAI from './pages/MovieManAI'; 
import MoodResults from './pages/MoodResults';



const App = () => {   
  //State to hold the list of movies
  const [movies, setMovies] = useState([]);
  //State to hold the search Term
  const [searchTerm, setSearchTerm] = useState('');
  //State to hold the current page number
  const [currentPage, setCurrentPage] = useState(1);
  //State to hold the total number of results
  const [totalResults, setTotalResults] = useState(0);
  //State to hold the list of favorite movies
  const [favorites, setFavorites] = useState([]);


  return(
    <Router>
      <div className='page'>

        <Navbar/>

      <Routes>

        <Route
            path="/"
            element={
              <Home     //HomePage components
              setSearchTerm={setSearchTerm}
              setMovies={setMovies}
              setCurrentPage={setCurrentPage}
              setTotalResults={setTotalResults}
              />
            }
          />

        <Route 
            path="/searchResults"
            element={
              <SearchResults        
              movies={movies}
              searchTerm={searchTerm} //Route to search results page
              setMovies={setMovies}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalResults={totalResults}
              favorites={favorites}       
              setFavorites={setFavorites}
              />
            }
          />

        <Route 
            path="/moviesDetails/:id"
            element={               
              <MovieDetails  //Route to movie details page
                favorites={favorites}       
                setFavorites={setFavorites}
              />                                                       
            }
          />

        <Route
            path="/favorites"
            element={              
              <Favorites favorites={favorites} />} //Route to Favorites page                             
          />

        <Route 
            path="/MovieManAI"
            element={
              <MovieManAI /> // Route to MovieManAI page

            }
            
          />
          
          <Route path="/moodResults/:mood"
           element={<MoodResults /> // Route to MoodResults page
            } /> 
          
      </Routes>
        


            </div>
          </Router>
      ) 
    }


export default App;
