import React from 'react';
import ListIcon from '@mui/icons-material/ViewList';
import GridIcon from '@mui/icons-material/ViewModule';
import './ViewToggle.css';

const ViewToggle = ({ isGridView, setIsGridView }) => {
  return (
    <div className="view-toggle">
      <button
        className={`toggle-button ${!isGridView ? 'active' : ''}`}
        onClick={() => setIsGridView(false)}
      >
        <GridIcon />
      </button>
      <button
        className={`toggle-button ${isGridView ? 'active' : ''}`}
        onClick={() => setIsGridView(true)}
      >
        <ListIcon />
      </button>
    </div>
  );
};

export default ViewToggle;
