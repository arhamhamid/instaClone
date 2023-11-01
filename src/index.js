import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'
import Modal from 'react-modal'; // Import Modal from react-modal
Modal.setAppElement('#root'); // Set the app element

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  
reportWebVitals();
