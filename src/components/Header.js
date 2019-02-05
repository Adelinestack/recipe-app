import React, { memo } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Recipe App</h1>
      </Link>
    </header>
  );
}

export default memo(Header);
