import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = (props) => {
  return (
    <div className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-toggle" to="#">
            <div className="icon-bar"></div>
            <div className="icon-bar"></div>
            <div className="icon-bar"></div>    
          </Link>
          <Link className="navbar-brand" to="#">{props.name}</Link>
        </div>
      </div>
    </div>  
  );
};

export default TopBar;