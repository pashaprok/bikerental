import React from 'react';
import './styles/cardButton.css';

export default function CardButton(props) {
  let cls = "card-button " + props.cls;
  return (
    <button className={cls} onClick={props.onClick}>
        {props.text}
    </button>
  );
}