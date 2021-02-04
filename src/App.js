import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 1,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { list }
    // Work without bind
    // this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id)
    this.setState({ list: updatedList })
  }
  render() {
    return (
      <div className="App">
        { this.state.list.map(item => {
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>&nbsp;
              <span>{item.author}</span>&nbsp;
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            &nbsp;
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  Отбросить</button>
              </span>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;