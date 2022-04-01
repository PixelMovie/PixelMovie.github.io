import React, { Component, createRef } from "react"

import ImagePixel from "./ImagePixel";
import ResultTitle from "./ResultTitle";
import EndGameModal from "./EndGameModal";
import HelpModal from "./HelpModal";
import Toastr from "./Toastr";

import IconHelp from "../img/IconHelp";

import '../css/Game.css';

import consts from "../consts/index"

export default class Game extends Component {

  input = createRef()

  toastrTimeout = undefined;

  state = {
    movie: undefined,
    tries: [],
    loading: true,
    winTry: -1,
    searchResults: [],
    hideTitleSearch: true,
    hideEndGameModal: false,
    showHelp: false,
    showToastr: false,
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
        localStorage.setItem("winTry", winTry)
        localStorage.setItem("tries", newTries)
        this.input.current.value = ""
    }
  }

  hideEndGameModal = () => {
      this.setState({hideEndGameModal: true})
  }

  showHelpModal = (show) => {
      this.setState({showHelp: show})
  }

  showToastr = () => {
    const { showToastr } = this.state;
    if (showToastr) {
        clearTimeout(this.toastrTimeout)
    } else {
        this.setState({ showToastr: true })
    }
    this.toastrTimeout = setTimeout(() => this.setState({ showToastr: false }), 3000)
  }

  search = (value) => {
      if (value) {
        fetch(consts.getFullSeachUrl(value, navigator.language))
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
    fetch(consts.getFullMovieUrl(id, navigator.language))
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

  initMount = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = consts.firstDate;
    const today = new Date();
    const secondDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    const id = consts.ids[diffDays]

    // get movie title and image
    this.initGame(id)
  }
    
  componentDidMount() {
      // get localstorage tries if had any
      let localDate = localStorage.getItem("date")
      if (!localDate) {
        const today = new Date();
        localDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        localStorage.setItem("date", localDate)
      } else {
          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const today = new Date();
          const secondDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const diffDays = Math.round(Math.abs((new Date(localDate) - secondDate) / oneDay));
          if (diffDays > 0) {
              localStorage.clear();
              localStorage.setItem("date", secondDate)
          }
      }
      let localTries = localStorage.getItem("tries")
      localTries = localTries ? localTries.split(",") : []
      let localWin = localStorage.getItem("winTry")
      localWin = localWin ? parseInt(localWin) : -1
      
      this.setState({ winTry: localWin, tries: localTries }, this.initMount)
  }

  render() {
      const { movie, tries, loading, hideTitleSearch, winTry, searchResults, hideEndGameModal, showHelp, showToastr } = this.state

      const isWon = winTry !== -1
      const isLost = !isWon && tries.length > 5

      return <div className="root">
          <h1 className="gameTitle">
            <div className="titleContainer">
                <IconHelp customStyle="helpIcon" onClick={() => this.showHelpModal(true)} /> 
                <span>Pixel Movie</span>
                <span className="inviBlock"></span>
            </div>
          </h1>
          {loading ? <div className="loading">{consts.texts.loading}</div> : <>
            <div className="resultContainer">
                <ResultTitle tries={tries} winTry={winTry} />
                <ImagePixel poster={movie.poster} triesNumber={tries.length} isWon={isWon} />
            </div>
            <div className="searchContainer">
                <div className="inputContainer">
                    {!hideTitleSearch && <ul className="searchList">
                        {searchResults.map((element, i) => <li key={i} onClick={() => this.changeInputValue(element)}>{element}</li> )}
                    </ul>}
                    <input disabled={isWon || isLost} onChange={(input) => this.search(input.target.value)} ref={this.input} placeholder={consts.texts.inputPlaceholder} />
                </div>
                <div className="buttonContainer"><button disabled={isWon || isLost} onClick={this.submitTitle}>{consts.texts.confirmButton}</button></div>
            </div>
            {isWon || isLost ? !hideEndGameModal && 
                <EndGameModal onClose={this.hideEndGameModal} tries={tries} winTry={winTry} poster={movie.poster} title={movie.title} showToastr={this.showToastr}/> : null}
            {showHelp && <HelpModal onClose={() => this.showHelpModal(false)} />}
            {showToastr && <Toastr />}
          </>}
      </div>
  }
}