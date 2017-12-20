import React from 'react';
import { render } from 'react-dom';

function Hello() {
    return (
        <div>
          Hello from react
        </div>
    );
}

render(<Hello />, document.getElementById('root'));
