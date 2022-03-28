import React, { Component, createRef } from "react"

import '../css/EndGameModal.css';

export default class EndGameModal extends Component {

    copyToClipboard = (text) => {
        const finalText = "https://pixelmovie.github.io\n\n" + text
        navigator.clipboard.writeText(finalText).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    render() {
        const { tries, winTry } = this.props

        const temp = [...Array(6)].map((element, i) => {
            if (tries[i]) {
                if (winTry - 1 === i) {
                    return ":green_square:"// "🟩"//'\uD83D\uDFE9'
                } else {
                     return ":red_square:" //"🟥"//'\uD83D\uDFE5'
                }
            } else {
                 return "⬜"
            }
        })
        const resultString = "🎬" + temp.join("")

        return <div className="endGameContainer">
            <div className="endGameModal">
                <h1>Partie Terminée</h1>
                <p>Merci d'avoir jouer, à demain pour un nouveau film !</p>
                <br />
                <div className="resultString">
                    {resultString}
                </div>
                <button onClick={() => this.copyToClipboard(resultString)}>Partager</button>
            </div>
        </div>
    }
}
