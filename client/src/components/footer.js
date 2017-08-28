import React from 'react';

const Footer = (props) => {
  return (
    <footer className="container-fluid text-center">
      <p>{props.text}</p>
    </footer>
  );
};

export default Footer;