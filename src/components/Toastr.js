import React, { Component } from "react"

import '../css/Toastr.css'

import consts from "../consts";

export default class Toastr extends Component {

  render() {

      return <div className="toastr">
          {consts.texts.toastr.copy}
      </div>
  }
}