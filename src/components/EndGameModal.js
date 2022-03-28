import React, { Component } from "react"

import IconClose from '../img/IconClose'

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
        const { tries, winTry, onClose } = this.props

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
                <div className="endGameTitle"><span>Partie Terminée</span><span onClick={() => onClose()}><IconClose customStyle="closeIcon" /></span></div>
                <p>Merci d'avoir jouer, à demain pour un nouveau film !</p>
                <div className="resultString">
                    {resultString}
                </div>
                <br />
                <button className="shareButton" onClick={() => this.copyToClipboard(resultString)}>Partager</button>
            </div>
        </div>
    }
}
