import React, { Component } from "react"

import IconClose from "../img/IconClose";

import '../css/HelpModal.css';

export default class HelpModal extends Component {

  render() {

      return <div className="helpContainer">
        <div className="helpModal">
          <div className="helpTitle"><span>Aide</span><span onClick={() => this.props.onClose()}><IconClose customStyle="closeIcon" /></span></div>
          <p>Le principe du jeu est de trouver l'affiche du film qui est pixélisée, en un maximum de 6 essais</p>
          <div className="helpData">Base de données fournie par <a href="https://www.themoviedb.org" target="_blank">themoviedb</a></div>
        </div>
      </div>
  }
}