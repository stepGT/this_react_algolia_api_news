import React, { Component } from "react";
import axios from 'axios';
import PropTypes from 'prop-types'
import { sortBy } from 'lodash';
import classNames from 'classnames';
import * as constants  from "../../constants";
import { ButtonWithLoading } from '../../components/Button'
import { BasicTable} from '../../components/Table'
import { BasicTextFields} from '../../components/Search'

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page },
    },
    isLoading: false,
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: constants.DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: "TITLE",
      isSortReverse: false,
    };
    // Work without bind
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  needsToSearchTopStories( searchTerm ) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });
    axios(`${constants.PATH_BASE}${constants.PATH_SEARCH}?${constants.PARAM_SEARCH}${searchTerm}&${constants.PARAM_PAGE}${page}&${constants.HITSPERPAGE}${constants.DEFAULT_COUNT}`)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
  }

  // жизненный цикл размонтирования
  componentWillUnmount() {
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
      } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];
    if (error) {
      return <p>Что-то произошло не так.</p>;
    }
    return (
      <div className="page">
        <div className="interactions">
          <BasicTextFields
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Поиск
          </BasicTextFields>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong.</p>
          </div>
        ) : (
          <BasicTable list={list} onDismiss={this.onDismiss} />
        )}
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            Больше историй
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = classNames("button-inline", {
    "button-active": sortKey === activeSortKey,
  });
  return (
    <ButtonWithLoading className={sortClass} onClick={() => onSort(sortKey)}>
      {children}
    </ButtonWithLoading>
  );
};

BasicTable.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default App;
export { BasicTable }