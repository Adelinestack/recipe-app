import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends PureComponent {
  render() {
    const { recipesHomeList } = this.props;
    const recipesToShowInHome = recipesHomeList.map(({ recipe }) => (
      <div key={recipe.uri}>
        <Link to={`/recipe/${recipe.uri.match(/recipe.*/)}`}>
          <img src={recipe.image} alt={recipe.label} />
          <div>
            <h3>{recipe.label}</h3>
          </div>
        </Link>
      </div>
    ));
    return (
      <section>
        <h2>Best lemon recipes</h2>
        <div>{recipesToShowInHome}</div>
      </section>
    );
  }
}
