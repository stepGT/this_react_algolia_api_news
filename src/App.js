import React, { Component } from "react";
import "./App.css";

const DEFAULT_QUERY = "redux";
const DEFAULT_COUNT = "10";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const HITSPERPAGE = "hitsPerPage=";

const largeColumn = {
  width: "40%",
};
const midColumn = {
  width: "30%",
};
const smallColumn = {
  width: "10%",
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    // Work without bind
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    console.log("constructor", this.state);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }
  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories(searchTerm) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${HITSPERPAGE}${DEFAULT_COUNT}`
    )
      .then((response) => response.json())
      .then((result) => this.setSearchTopStories(result))
      .catch((error) => error);
  }

  componentDidMount() {
    console.log("componentDidMount", this.state);
    const { searchTerm } = this.state;
    console.log("searchTerm", searchTerm);
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const isNotId = (item) => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits },
    });
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("getDerivedStateFromProps", state);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextState);
    return true;
  }

  // getSnapshotBeforeUpdate() {
  //   console.log("getSnapshotBeforeUpdate");
  // }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  // жизненный цикл размонтирования
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // componentWillUpdate() {
  //   console.log("componentWillUpdate");
  // }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
    console.log("onSearchChange", this.state);
  }

  render() {
    console.log("render", this.state);
    const { searchTerm, result } = this.state;
    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Поиск
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">{children}</button>
  </form>
);

const Table = ({ list, onDismiss }) => {
  return (
    <div className="table">
      {list.map((item) => (
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
