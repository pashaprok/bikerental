import React from 'react';
import CardButton from './CardButton';
import './styles/bikeCard.css';

export default function BikeCard({_id, name, type, price, isRented, changeBikeRent, deleteBike}) {
  function changeRent(e) {
    e.preventDefault();
    const change = !isRented;
    const bike = {
      name: name,
      type: type, 
      price: price, 
      isRented: change,
      _id: _id
    }

    changeBikeRent(bike);
  }

  function deleteSelectedBike(e) {
    e.preventDefault();
    const bike = {
      name: name,
      type: type, 
      price: price, 
      _id: _id
    }

    deleteBike(bike);
  }

  return (
    <div className="bike-card">
      <div className="bike-card-info">
        <span>{name}</span> / <span>{type}</span> / <span>${price}</span>
      </div>
      <div className="bike-card-action">
        { isRented ? 
          <CardButton text="Cancel rent" cls="red rented" onClick={changeRent} /> :
          <>
            <CardButton text="Rent" cls="blue available" onClick={changeRent} />
            <CardButton text="Delete" cls="red available" onClick={deleteSelectedBike} />
          </>
        }
      </div>
    </div>
  );
}
