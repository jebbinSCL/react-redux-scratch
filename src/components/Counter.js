import React from 'react';
import PropTypes from 'prop-types'

const Counter = ({ count, increaseCounter, decreaseCounter }) => (
    <div>
        <p>
            Current count: {count}
            <button onClick={() => increaseCounter()}> + </button> 
            <button onClick={() => decreaseCounter()}> - </button>
        </p>
    </div>
);

Counter.propTypes = {
    count: PropTypes.number.isRequired,
    increaseCounter: PropTypes.func.isRequired,
    decreaseCounter: PropTypes.func.isRequired,
}

export default Counter