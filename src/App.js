/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import swal from 'sweetalert';


const apiToken = 'BQDESNsXJQGj5U10FqPeqoxJtY1KbPm81EnwMBGuJaL9HVqPYZAMeh92aDJQ3Ub7XD4q1L0MHHhTW_LQV6WFPo2iIciNv5c4Zomx0bY4XDfnDi3B9ST1dx23vNNK4WjUl-dOQwEDHrcBf2CT2iUDV5yI9f0dig';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class AlbumCover extends Component {
  render() {
    return (
      <img src={this.props.album.images[0].url}/>
    );
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "Bonjour!",
      songsLoaded: false,
      songList: [],
      currentSong: null,
    };
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
  .then(response => response.json())
  .then((data) => {
    this.setState({...this.state,
      songsLoaded: true,
      songList: data.items,
      currentSong: data.items[getRandomNumber(data.items.length)].track,
    });

    console.log({text:"Here is the spotify track: "}, data);
    console.log(this.state.songsLoaded);
    console.log(this.state.currentSong.name);
  });
  }

  checkAnswer(track) {
    if ( track.id === this.state.currentSong.id) {
      swal('Bravo', 'Sous-titre', 'success');
    } else {
      swal('Essaye encore', 'Ce n’est pas la bonne réponse', 'error');
    }
    return;
  }

  render() {
    if (this.state.songsLoaded) {
      const currentTrack0 = this.state.songList[0].track
      const currentTrack1 = this.state.songList[1].track
      const currentTrack2 = this.state.songList[2].track
      const previewUrl = this. state.currentSong.preview_url
      debugger;
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome on the Blindtest</h1>
          </header>
          <div className="App-images">
          <AlbumCover track={currentTrack0}/>
          </div>
          <div className="App-buttons">
          <Button onClick={() => this.checkAnswer(currentTrack0)}>{currentTrack0.name}</Button>
          <Button onClick={() => this.checkAnswer(currentTrack1)}>{currentTrack1.name}</Button>
          <Button onClick={() => this.checkAnswer(currentTrack2)}>{currentTrack2.name}</Button>
          </div>
          <Sound url={previewUrl} playStatus={Sound.status.PLAYING}/>
        </div>
      );
    } else {
      return(
        <div className="App">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Songs loading, please wait...</h1>
        </div>
      )
    }

  }
}


export default App;
