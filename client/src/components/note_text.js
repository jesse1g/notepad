import React from 'react';

const NoteText = (props) => {
  const lines = props.notes.split('\n').map((e) => {
    if (e === '') {
      return (<br key={Math.random()}></br>);
    } else {
      return (<p key={Math.random()} className='note-content'>{e}</p>);
    }
  });
  return (
    <div>
      {lines}
    </div>
  );
};

export default NoteText;