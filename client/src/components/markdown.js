import React from 'react';
import MDReactComponent from 'markdown-react-js';


const MarkDown = (props) => {
  if (props.show) {
    return (
      <div>
        <h3>Markdown Preview:</h3>
        <MDReactComponent text={props.text}/>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
};

export default MarkDown;