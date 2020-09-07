import React, { Component } from 'react'
import { Control, Form, Errors } from 'react-redux-form'
import CardButton from './CardButton'
import './styles/newRent.css'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

export default class NewRent extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //post new bike
    handleSubmit(values) {
        this.props.postBike(values);
        this.props.resetBikeForm();
    }

    render() {
        return (
            <div className="new-rent-wrapper">
                <Form model="bike" onSubmit={(values) => this.handleSubmit(values)}>
                    <div className="form-group name">
                        <label htmlFor="name">Bike name</label>
                        <Control.text model=".name" id="name" name="name"
                            placeholder="Ex. Cannondale S6"
                            className="form-control"
                            validators={{
                                minLength: minLength(3), maxLength: maxLength(20)
                            }}
                        />
                        <Errors
                            className="invalid-text"
                            model=".name"
                            show="touched"
                            messages={{
                                minLength: 'too small(must be > 2)',
                                maxLength: 'too big(must be < 20)'
                            }}
                        />
                    </div>
                    <div className="form-group type">
                        <label htmlFor="type">Bike type</label>
                        <Control.select 
                            model=".type" id="type" name="type"
                            className="form-control">
                                        <option>Road</option>
                                        <option>Mountain</option>
                                        <option>Cross-country</option>
                                        <option>Child</option>
                        </Control.select>
                    </div>
                    <div className="form-group price">
                        <label htmlFor="price">Rent price</label>
                        <Control.text model=".price" id="price" name="price"
                            placeholder="99.00"
                            className="form-control"
                            validators={{
                                isNumber
                            }}
                        />
                        <Errors
                            className="invalid-text"
                            model=".price"
                            show="touched"
                            messages={{
                                isNumber: 'Must be a number'
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <CardButton type="submit" text="Submit rent" cls="green" />
                    </div>
                </Form>
            </div>
        )
    }
}
