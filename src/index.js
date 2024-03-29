import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function emitMessage(id){
  setInterval(() => {
    window.dispatchEvent(
      new CustomEvent(`user-${id}`,{
        detail: `Tin nhắn từ kênh ${id}`
      })
    )
  }, 2000)
}

// emitMessage(1)
// emitMessage(2)
emitMessage(3)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
