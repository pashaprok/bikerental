import React from 'react';

export default function CardButton(props) {
  let cls = "card-button" + props.style;
  return (
    <button className={cls}>
        {props.text}
    </button>
  );
}
