import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import Resume from './containers/Resume';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<Resume />, document.getElementById('root'));
registerServiceWorker();
