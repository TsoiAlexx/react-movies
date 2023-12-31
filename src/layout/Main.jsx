import React from "react"
import { Movies } from '../components/Movies'
import { Preloader } from '../components/Preloader'
import { Search } from '../components/Search'

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    
    state = {
        movies: [],
        loading: true,

    }

    // метод жизненного цикла для запроса данных
    componentDidMount() {        
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=all`)
            .then(response => response.json())   /*преобразование ответа через метод json*/
            .then(data => this.setState({movies: data.Search, loading: false})) /*приходят данные, Search ключ из data*/
    }

    searchMovies = (str, type = 'all') => {
        this.setState({loading: true});
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
            type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then(response => response.json())   
            .then(data => this.setState({movies: data.Search, loading: false}));
    };

    render() {
        const {movies, loading} = this.state;

        return <main className="container content">
            <Search searchMovies={this.searchMovies}/>
            {
                loading ? (
                    <Preloader />
                    ) :  <Movies movies={movies}/>
            }
        </main>
        
    }
    
}

export {Main}