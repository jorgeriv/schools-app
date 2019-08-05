import React from 'react';
import './App.css';
import School from './school/School';

class App extends React.Component {
  // let schools = [];

  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      searchTerm: '',
      sortBy: '',
      averageRating: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleRatingFilter = this.handleRatingFilter.bind(this);
  
    fetch('http://localhost:3001/schools')
    .then(response => {
      return response.json();
    })
    .then(schools => this.setState({schools}));
  }

  handleSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  handleSortChange(event) {
    this.setState({sortBy: event.target.value});
  }

  handleRatingFilter(event) {
    this.setState({averageRating: Number(event.target.value)});
  }

  handleSubmit(event) {
    event.preventDefault();
    let queryString = '?';
    const queries = [];
    if(this.state.searchTerm) {
      queries.push(`search=${this.state.searchTerm}`);
    }
    if(this.state.sortBy) {
      queries.push(`sort-by=${this.state.sortBy}`);
    }
    if(this.state.averageRating > 1) {
      queries.push(`rating=gte:${this.state.averageRating}`);
    }
    for(const query of queries) {
      queryString += query;
    }
    fetch(`http://localhost:3001/schools${queryString}`)
    .then(response => {
      return response.json();
    })
    .then(schools => this.setState({schools}));
  }

  render(){
    return (
      <div id="app">
        <h1>My Schools App</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Search:
            <input value={this.state.searchTerm} onChange={this.handleSearchChange} />
          </label>
          <label>
            Sort By:
            <select value={this.state.sortBy} onChange={this.handleSortChange}>
              <option value="">Select...</option>
              <option value="rating">Rating</option>
              <option value="raking">Ranking</option>
            </select>
          </label>
          <label>Average user rating:
            <select value={this.state.averageRating} onChange={this.handleRatingFilter}>
              <option value="1">1 or more</option>
              <option value="2">2 or more</option>
              <option value="3">3 or more</option>
              <option value="4">4 or more</option>
              <option value="5">5</option>
            </select>
          </label>
          <input type="submit" value="Apply" />
        </form>
        <ul>
          {this.state.schools.map((school) => <li key={school.id}><School school={school} /></li>)}
        </ul>
      </div>
    );
  }
}

export default App;
