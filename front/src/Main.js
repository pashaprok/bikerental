import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'; 

//import states
import { fetchBikes, postBike, changeRentBike, deleteBike } from './redux/bikesActions';
import { actions } from 'react-redux-form';
import { connect } from 'react-redux';

//import components
import AppTitle from './components/AppTitle';
import NewRent from './components/NewRent';
import BoxContent from './components/BoxContent';
import BikeCard from './components/BikeCard';

const mapStateToProps = state => {
    return {
      bikes: state.bikes
    };   
}

const mapDispatchToProps = dispatch => ({
    fetchBikes: () => dispatch(fetchBikes()),
    postBike: (bike) => dispatch(postBike(bike)),
    deleteBike: (bike) => dispatch(deleteBike(bike)),
    changeRentBike: (bike) => dispatch(changeRentBike(bike)), 
    resetBikeForm: () => { dispatch(actions.reset('bike'))},
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchBikes();
    }

    render() {
        const bikesList = this.props.bikes.bikes;
        const rentedBikes = bikesList.map((bike) => {
            if(bike !== null && bike.isRented) {
                return  <BikeCard 
                            key={bike._id}
                            _id={bike._id}
                            name={bike.name}
                            type={bike.type}
                            price={bike.price}
                            isRented={bike.isRented}
                            changeBikeRent={this.props.changeRentBike}
                        />
            } else { return null}
        });

        const availableBikes = bikesList.map((bike) => {
            if(bike !== null && !bike.isRented) {
                return  <BikeCard 
                            key={bike._id}
                            _id={bike._id}
                            name={bike.name}
                            type={bike.type}
                            price={bike.price}
                            isRented={bike.isRented}
                            changeBikeRent={this.props.changeRentBike}
                            deleteBike={this.props.deleteBike}
                        />
            } else { return null}
        });

        //price counter
        function priceBikes(bikes) {
            const filter = bikes.filter((bike) => {
                return bike != null;
            }).map((bike) => {
                return bike.props.price;
            })

            var sum = 0;
            for(var i = 0; i < filter.length; i++){
                sum += filter[i];
            }
            return sum;
        }

        //counter variables
        const priceRentedBikes = priceBikes(rentedBikes);
        const countAvailableBikes = availableBikes.filter((bike) => {return bike != null;}).length;

        //content titles
        const availableTitle = `🚲 Available bisycles (${countAvailableBikes})`;
        const rentedTitle = `🤩 Your rent (Total: $${priceRentedBikes})`;

        return (
            <div className="app">
                <div className="container">
                    <AppTitle title="awesome bike rental" />
                    <BoxContent title="🤑 Create new rent">
                        <NewRent 
                            resetBikeForm={this.props.resetBikeForm} 
                            postBike={this.props.postBike} 
                        />
                    </BoxContent>
                    { priceRentedBikes === 0 ? '' :
                        <BoxContent title={rentedTitle}>
                            {rentedBikes}
                        </BoxContent>
                    }
                    <BoxContent title={availableTitle}>
                        {availableBikes}
                    </BoxContent>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));