/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Main.css';

function Main_Header(props) {
  return (
    <div className="main_header_wrap">
      <nav className="main_nav">
        <Link to="/main">
          {' '}
          {/* main 페이지에서는 보이지 않아야 한다. */}
          {/* <h3>이전 페이지로(아이콘)</h3> */}
        </Link>
        <div>
          <Link to="/" onClick={props.handleLogout}>
            {' '}
            {/* 또는, /login */}
            <h5>LOGOUT</h5>
          </Link>
          <Link to="/wordbook">
            <h5>MY WORDBOOK</h5>
          </Link>
        </div>
      </nav>
    </div>
  );
}
export default Main_Header;
