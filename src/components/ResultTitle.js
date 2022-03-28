import React, { Component } from "react"

import '../css/ResultTitle.css';

import IconCross from '../img/IconCross'
import IconChecked from "../img/IconChecked";

export default class ResultTitle extends Component {

  componentDidMount() {
  }

  render() {
      const { tries, winTry } = this.props

      return <div className="resultTitle">
        {[...Array(6)].map((_, i) => {
            return <div className="tries" key={i}>{tries[i] ? winTry - 1 === i ? <IconChecked customStyle="tryIcon" /> : <IconCross customStyle="tryIcon" /> : null}&nbsp;{tries[i] || ""}</div>
        })}
      </div>
  }
}