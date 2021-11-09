import React from 'react';
import * as sortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

componentDidMount() {
  this.resetArray();
}
resetArray( ) {
  const array = [];
  for (let i = 0; i < 100; i++) {
    array.push(randomIntFromInterval(5, 730));
  }
  this.setState({array});
}

  mergesort() {
    const animations = sortingAlgorithms.mergeSort(this.state.array);
    const newAnimations = [];
    for (const animation of animations) {
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.swap);
    }
    for (let i = 0; i < newAnimations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar')
      const isColorChange = i % 3 !==2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = newAnimations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'red' : 'turquoise';
        setTimeout (() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = newAnimations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`
        }, i * 10);
      }
    }
  }

  


  render() {
    const {array} = this.state;
    return (
    <div className="array-container">
      {array.map((value, idx) => (
      <div 
      className="array-bar" 
      key={idx}
      style={{height: `${value}px`}}></div>
      ))}
      <button onClick={() => this.resetArray()}>Generate New Array</button>
      <button onClick={() => this.mergesort()}>Merge Sort</button>
      </div>
      );
    }
  }

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
