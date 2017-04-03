import React from 'react';

export default class HelloWorld extends React.Component {
  render() {
    // return <h1>Hello, World!</h1>;
    return <h1>{ ["Hello, ", "World!"].map(text => <span>{ text }</span>) }</h1>;
  }
}