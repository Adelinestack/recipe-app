import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { regEx } from '../utils/const';

function Home(props) {
  const { recipesHomeList } = props;
  const recipesToShowInHome = recipesHomeList.map(
    ({ recipe: { uri, image, label } }) => (
      <div key={uri}>
        <Link to={`/recipe/${uri.match(regEx)}`}>
          <img src={image} alt={label} />
          <div>
            <h3>{label}</h3>
          </div>
        </Link>
      </div>
    )
  );
  return (
    <section>
      <h2>Best lemon recipes</h2>
      <div>{recipesToShowInHome}</div>
    </section>
  );
}
export default memo(Home);
