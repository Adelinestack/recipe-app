import React, { PureComponent } from 'react';
import { getRecipeDatasByUri } from '../services/RecipesApi';

export default class Recipe extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recipeDatas: [],
      recipeUri: this.props.match.params.recipeUri,
    };
  }

  componentDidMount() {
    this.fetchRecipeDataByUri(this.props.match.params.recipeUri);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.recipeUri !== state.recipeUri) {
      return {
        recipeDatas: [],
        recipeUri: props.match.params.recipeUri,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.recipeDatas.length === 0) {
      this.fetchRecipeDataByUri(this.props.recipeUri);
    }
  }

  async fetchRecipeDataByUri(recipeUri) {
    const recipeDatas = await getRecipeDatasByUri(recipeUri);
    this.setState({
      recipeDatas,
    });
  }

  render() {
    const { recipeUri } = this.props.match.params;
    const loadingElement = this.state.recipeDatas.length === 0 && (
      <div>
        <i className="fas fa-3x fa-spinner fa-pulse" />
      </div>
    );
    const recipeDatas = this.state.recipeDatas[0];

    return (
      loadingElement || (
        <div>
          <section key={recipeUri}>
            <h2>{recipeDatas.label}</h2>
            <div>
              <img src={recipeDatas.image} alt={recipeDatas.label} />
            </div>
            <div>
              <a href={recipeDatas.url}>Voir la recette</a>
              <p>{recipeDatas.calories} calories</p>
            </div>
          </section>
        </div>
      )
    );
  }
}
