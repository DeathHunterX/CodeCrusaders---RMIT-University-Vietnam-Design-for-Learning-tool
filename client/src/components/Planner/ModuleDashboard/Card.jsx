import React from 'react'

const ModuleCard = ({ title, number, numberDuration }) => {
    return (
        <div className="module-card">
          <h4>{title}</h4>
          <h6>
            Number of Activity:
            <span> {number}</span>
          </h6>
          <h6>
            Duration: <span> {numberDuration}</span>
            <span> mins</span>
          </h6>
        </div>
    );
}

export default ModuleCard