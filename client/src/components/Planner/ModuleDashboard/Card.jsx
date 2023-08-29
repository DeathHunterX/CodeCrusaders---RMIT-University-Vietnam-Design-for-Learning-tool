import React from 'react'

const ModuleCard = ({ title, number, numberDuration, totalDuration }) => {
  return (
    <div className="module-card">
      <h4>{title}</h4>
      <table className="table">
        <thead style={{verticalAlign: "middle"}}>
          <tr>
            <th scope="col">Number of Activity:</th>
            <th scope="col">Duration:</th>
            <th scope="col">Total Duration:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{number}</td>
            <td>{numberDuration} mins</td>
            <td>{totalDuration} mins</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default ModuleCard;