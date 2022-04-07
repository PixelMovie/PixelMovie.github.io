import React, { Component } from "react"

import IconClose from "../img/IconClose"

import consts from "../consts/index"

import '../css/HelpModal.css'

export default class HelpModal extends Component {

  render() {

      return <div className="helpContainer">
        <div className="helpModal">
          <div className="helpTitle"><span>{consts.texts.help.title}</span><span onClick={() => this.props.onClose()}><IconClose customStyle="closeIcon" /></span></div>
          <p>{consts.texts.help.description}</p>
          <p>{consts.texts.help.description2}</p>
          <div className="helpData">{consts.texts.help.database}<a href="https://www.themoviedb.org" target="_blank">themoviedb</a></div>
        </div>
      </div>
  }
}