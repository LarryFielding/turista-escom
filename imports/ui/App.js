import React, { Component } from 'react';
import PropTypes from 'prop-types';

// App component - represents the whole app
export default class App extends Component {

    render() {
        return (
            <div>
                <header>
                    <h1>Pantalla de prueba</h1>
                </header>
            </div>
        );
    }
}

App.propTypes = {
    rooms: PropTypes.array.isRequired
};
