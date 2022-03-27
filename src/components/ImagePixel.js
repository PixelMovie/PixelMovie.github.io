import React, { Component } from "react"

export default class ImagePixel extends Component {

  posterCanvas = undefined
  //pixelPercentsByTry = [80, 65, 50, 35, 20, 10, 1]
  pixelPercentsByTry = [60, 45, 30, 20, 10, 7, 1]

  reduceImage = (img, ratio) => {
    // Initialisation d'un nouvean canvas
    const canvas = document.createElement('canvas');
    
    // On définit la taille intrinsèque du canvas avec des dimensions réduites
    canvas.width = img.naturalWidth / ratio;
    canvas.height = img.naturalHeight / ratio;
    
    // Récupération du contexte de rendu
    const ctx = canvas.getContext('2d');
    
    // On dessine l'image sur toute la taille du canvas
    ctx.drawImage(
        img,
        0, 0,
        canvas.width, canvas.height
    );
    
    return canvas; 
  }

  pixelateImage = (canvas, img, ratio) => {

    // On définit la taille intrinsèque du canvas avec les dimensions d'origine
    //canvas.width = img.naturalWidth;
    //canvas.height = img.naturalHeight;
    canvas.width = 350;
    canvas.height = 500;
    
    // Paramètrage du contexte de rendu pour ne pas lisser les pixels
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
  
    // On dessine une image plus petite
    const smallCanvas = this.reduceImage(img, ratio);
  
    // On étire l'image réduite sur toute la taille du canvas
    ctx.drawImage(
      smallCanvas,
      0, 0,
      smallCanvas.width, smallCanvas.height,
      0, 0,
      canvas.width, canvas.height
    );
  }

  onRefChange = node => {
    this.setState({ posterCanvas: node });
  };


  state = {
      posterCanvas: undefined,
      init: false,
  }
    
  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
      //Math.max(1, 101 - this.props.triesNumber * 17)
      if (this.state.posterCanvas && !this.state.init) {
        this.pixelateImage(this.state.posterCanvas, this.props.poster, this.pixelPercentsByTry[this.props.triesNumber])
        this.setState({init: true})
      }
      if (prevProps.triesNumber !== this.props.triesNumber) {
        this.pixelateImage(this.state.posterCanvas, this.props.poster, this.pixelPercentsByTry[this.props.triesNumber])
      }
      if (!prevProps.isWon && this.props.isWon) {
        this.pixelateImage(this.state.posterCanvas, this.props.poster, 1)
      }
  }

  render() {
      return <div>
          <canvas width="300" height="500" ref={this.onRefChange}>
            Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
          </canvas>
      </div>
  }
}