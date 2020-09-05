import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'; 

//import states
import { fetchBikes } from './redux/bikesActions';
import { connect } from 'react-redux';

//import components
import AppTitle from './components/AppTitle';
import BoxContent from './components/BoxContent';

const mapStateToProps = state => {
    return {
      bikes: state.bikes
    };   
}

const mapDispatchToProps = dispatch => ({
    fetchBikes: () => dispatch(fetchBikes())
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchBikes();
    }

    render() {
        return (
            <div className="app">
                <div className="container">
                    <AppTitle title="awesome bike rental" />
                    <BoxContent title="🤑 Create new rent">
                        create new rent form
                    </BoxContent>
                    <BoxContent title="🤩 Your rent">
                        your rent list
                    </BoxContent>
                    <BoxContent title="🚲 Available bisycles">
                        available bisycles list
                    </BoxContent>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));