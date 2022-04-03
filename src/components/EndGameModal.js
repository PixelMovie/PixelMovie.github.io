import React, { Component } from "react"

import IconClose from '../img/IconClose'

import consts from "../consts/index"

import '../css/EndGameModal.css'

export default class EndGameModal extends Component {

    copyToClipboard = (text) => {
        const finalText = "https://pixelmovie.github.io\n\n" + text
        navigator.clipboard.writeText(finalText).then(() => {
            this.props.showToastr()
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    render() {
        const { tries, winTry, onClose, poster, title } = this.props

        const temp = [...Array(6)].map((element, i) => {
            if (tries[i]) {
                if (winTry - 1 === i) {
                    return "🔵" //:green_square:" // "🟩" //'\uD83D\uDFE9'
                } else {
                     return "🔴" //":red_square:" //"🟥" //'\uD83D\uDFE5'
                }
            } else {
                 return "⚪" //"⬜"
            }
        })
        const resultString = "🎬" + temp.join("")

        return <div className="endGameContainer">
            <div className="endGameModal">
                <div className="endGameTitle"><span>{consts.texts.endGame.title}</span><span onClick={() => onClose()}><IconClose customStyle="closeIcon" /></span></div>
                <p>{consts.texts.endGame.description}</p>
                <div className="resultPoster">
                    <img src={poster.src} width="175" height="250" />
                    <div>{title}</div>
                </div>
                <div className="resultString">
                    {resultString}
                </div>
                <br />
                <button className="shareButton" onClick={() => this.copyToClipboard(resultString)}>{consts.texts.endGame.share}</button>
                <div className="coffee">❤️ Like? <a href="https://ko-fi.com/pixelmovie" target="_blank">Buy me a coffee</a></div>
            </div>
        </div>
    }
}
