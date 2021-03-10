import React, { Component } from "react";
import "./App.css";

const largeColumn = {
  width: "40%",
};
const midColumn = {
  width: "30%",
};
const smallColumn = {
  width: "10%",
};

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 1,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
];

function isSearched(searchTerm) {
  console.log("searchTerm", searchTerm);
  return function (item) {
    console.log("item", item);
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: "",
    };
    // Work without bind
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    console.log("constructor", this.state);
  }

  onDismiss(id) {
    console.log("onDismiss", this.state);
    const updatedList = this.state.list.filter((item) => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
    console.log("onSearchChange", this.state);
  }

  render() {
    console.log("render", this.state);
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Поиск
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <form>
    {" "}
    {children}
    <input type="text" value={value} onChange={onChange} />
  </form>
);

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map((item) => (
        <div className="table-row" key={item.objectID}>
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          <span style={smallColumn}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Отбросить
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

const Button = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
};

export default App;
