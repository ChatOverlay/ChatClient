import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const PreventPullToRefresh = ({ children }) => {
  useEffect(() => {
    const preventPullToRefresh = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);

  return children;
};

root.render(
  <React.StrictMode>
    <PreventPullToRefresh>
      <App />
    </PreventPullToRefresh>
  </React.StrictMode>
);