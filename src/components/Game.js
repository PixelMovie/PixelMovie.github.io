import React, { Component, createRef } from "react"

import ImagePixel from "./ImagePixel";
import ResultTitle from "./ResultTitle";
import EndGameModal from "./EndGameModal";

import '../css/Game.css';

import consts from "../consts/index"

export default class Game extends Component {

  input = createRef()

  state = {
    movie: undefined,
    tries: [],
    loading: true,
    triesLeft: 5,
    winTry: -1,
    searchResults: [],
    hideTitleSearch: true,
    hideEndGameModal: false,
  }

  submitTitle = () => {
    const title = this.input.current.value
    if (title) {
        const { movie, tries } = this.state
        const newTries = [...tries, title]
        let winTry = -1
        if (title === movie.title) {
            winTry = newTries.length
        }
        this.setState({ winTry, tries: newTries, hideTitleSearch: true })
        this.input.current.value = ""
    }
  }

  hideEndGameModal = () => {
      this.setState({hideEndGameModal: true})
  }

  search = (value) => {
      if (value) {
        fetch(consts.getFullSeachUrl(value))
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("ERROR, search response not OK", response)
                }
            })
            .then(data => {
                const firstFive = data.results && data.results.length > 5 ? data.results.slice(0, 5) : data.results
                const searchTitles = firstFive.map(element => element.title)
                this.setState({searchResults: searchTitles, hideTitleSearch: false})
            })
            .catch(error => console.log("ERROR", error))
      } else {
        this.setState({hideTitleSearch: true})
      }
  }

  initGame = (id) => {
    fetch(consts.getFullMovieUrl(id))
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log("ERROR, init response not OK", response)
            }
        })
        .then(data => {
            const movieObject = {
                title: data.title,
                image: data.poster_path,
            }
            const poster = new Image(350, 500);
            poster.addEventListener('load', () => this.setState({loading: false}));
            poster.src = consts.getFullImageUrl(data.poster_path)
            this.setState({movie: { ...movieObject, poster: poster }})
        })
        .catch(error => console.log("ERROR", error))

  }

  changeInputValue = (value) => {
      this.input.current.value = value
      this.setState({hideTitleSearch: true})
  }
    
  componentDidMount() {
      // id du film du jour
      // TODO récupération de l'id aléatoire chaque jours
      const id = 76341

      // get movie title and image
      this.initGame(id)
  }

  render() {
      const { movie, tries, loading, hideTitleSearch, winTry, searchResults, hideEndGameModal } = this.state

      const isWon = winTry !== -1
      const isLost = !isWon && tries.length > 5

      return <div className="root">
          <h1 className="gameTitle">Pixel Movie</h1>
          {loading ? <div className="loading">LOADING....</div> : <>
            <div className="resultContainer">
                <ResultTitle tries={tries} winTry={winTry} />
                <ImagePixel poster={movie.poster} triesNumber={tries.length} isWon={isWon} />
            </div>
            <div className="searchContainer">
                <div className="inputContainer">
                    {!hideTitleSearch && <ul className="searchList">
                        {searchResults.map((element, i) => <li key={i} onClick={() => this.changeInputValue(element)}>{element}</li> )}
                    </ul>}
                    <input disabled={isWon || isLost} onChange={(input) => this.search(input.target.value)} ref={this.input} />
                </div>
                <div className="buttonContainer"><button disabled={isWon || isLost} onClick={this.submitTitle}>Confirmer</button></div>
            </div>
            {isWon || isLost ? !hideEndGameModal && 
                <EndGameModal onClose={this.hideEndGameModal} tries={tries} winTry={winTry} poster={movie.poster} title={movie.title}/> : null}
          </>}
      </div>
  }
}