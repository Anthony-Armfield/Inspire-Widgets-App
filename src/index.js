import React from 'react';
import ReactDom from 'react-dom';

import Quote from './Quote';
import Weather from './Weather';
import Clock from './Clock';

ReactDom.render(<Quote />, document.getElementById('quote'));
ReactDom.render(<Weather />, document.getElementById('weather'));
ReactDom.render(<Clock />, document.getElementById('clock'));