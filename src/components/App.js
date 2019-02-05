import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import Home from './Home';
import Recipe from './Recipe';
import { getRecipesList } from '../services/RecipesApi';
import './App.css';

const Error = () => <div>404 PAGE</div>;

export default class App extends PureComponent {
  state = {
    recipesHomeList: [],
  };

  componentDidMount() {
    this.fetchRecipesList();
  }

  async fetchRecipesList() {
    const recipesHomeList = await getRecipesList();
    this.setState({
      recipesHomeList,
    });
  }

  render() {
    const { recipesHomeList } = this.state;
    const loadingElement = recipesHomeList.length === 0 && (
      <div>
        <i className="fas fa-3x fa-spinner fa-pulse" />
      </div>
    );
    return (
      loadingElement || (
        <BrowserRouter>
          <div>
            <Header />
            <main>
              <SearchBar />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home {...props} recipesHomeList={recipesHomeList} />
                  )}
                />
                <Route
                  exact
                  path="/recipe/:recipeUri"
                  render={props => <Recipe {...props} />}
                />
                <Route path="/" component={Error} />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      )
    );
  }
}
