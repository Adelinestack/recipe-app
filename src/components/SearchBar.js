import React, { PureComponent } from 'react';
import { getRecipesDatasByKeyword } from '../services/RecipesApi';
import { Link, withRouter } from 'react-router-dom';

const incrementRecipesList = prevState => ({
  from: prevState.from + 10,
  to: prevState.to + 10,
});

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.searchBar = null;
    this.state = { keywords: '', searchedRecipes: [], from: 0, to: 10 };
  }

  componentDidMount() {
    this.searchBar.focus();
  }

  onChange({ target: { value: keywords } }) {
    this.setState({ keywords });
  }

  onKeyPress({ key }) {
    if (key === 'Enter') {
      this.setState(this.fetchSearchedRecipes);
    }
    return null;
  }

  onClick(recipeUri, e) {
    e.preventDefault();
    this.setState({
      keywords: '',
      searchedRecipes: [],
    });
    this.props.history.push(`/recipe/${recipeUri}`);
  }

  async fetchSearchedRecipes() {
    const { keywords, from, to } = this.state;
    const searchedRecipes = await getRecipesDatasByKeyword(keywords, from, to);
    this.setState({
      searchedRecipes,
    });
  }

  fetchNextRecipes() {
    this.setState(incrementRecipesList, this.fetchSearchedRecipes);
  }

  render() {
    const { searchedRecipes } = this.state;
    const searchResults = searchedRecipes.map(({ recipe: { uri, label } }) => (
      <Link
        to={`/recipe/${uri.match(/recipe.*/)}`}
        key={uri}
        onClick={this.onClick.bind(this, uri.match(/recipe.*/))}
      >
        <p>{label}</p>
      </Link>
    ));

    return (
      <div>
        <i className="fas fa-search" />
        <input
          type="text"
          className="search-bar"
          placeholder="Search a recipe"
          value={this.state.keywords}
          onChange={this.onChange.bind(this)}
          onKeyPress={this.onKeyPress.bind(this)}
          ref={searchBar => (this.searchBar = searchBar)}
        />
        <div>
          {searchResults}{' '}
          <button onClick={this.fetchNextRecipes.bind(this)}>Next >></button>
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);
