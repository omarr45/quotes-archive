import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeContract } from './utils/near';

window.nearInitPromise = initializeContract()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch(console.error);
