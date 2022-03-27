import React, { Component, createRef } from "react"

import '../css/EndGameModal.css';

export default class EndGameModal extends Component {

    render() {
        const { tries, winTry } = this.props

        return <div className="endGameContainer">
            <div className="endGameModal">
                <h1>Partie Terminée</h1>
                <p>Merci d'avoir jouer, à demain pour un nouveau film</p>
                <br />
                <div>
                    🎬&nbsp;{[...Array(6)].map((element, i) => {
                        if (tries[i]) {
                            if (winTry === i) {
                                return '\uD83D\uDFE9'
                            } else {
                                 return '\uD83D\uDFE5'
                            }
                        } else {
                             return "⬜"
                        }
                    })}
                </div>
            </div>
        </div>
    }
}
