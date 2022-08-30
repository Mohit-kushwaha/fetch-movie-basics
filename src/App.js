import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App()
{
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  const fetchMovieHandler = useCallback(async () => 
  {
    setIsLoading(true)
    setError(null)
    try
    {
      const respone = await fetch('https://swapi.dev/api/films')
      if (!respone.ok)
      {
        throw new Error('some thing went wrong')
      }

      const data = await respone.json()


      const transformMovies = data.results.map(movieData =>
      {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_Date
        }
      })
      setMovies(transformMovies)
      setIsLoading(false)
    } catch (error)
    {
      setError(error.message)
    }
    setIsLoading(false)

  }, [])
  useEffect(() =>
  {
    fetchMovieHandler()
  }, [fetchMovieHandler])
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length == 0 && !error && <p>No Movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
