import React from 'react'
import {AiOutlineEdit} from "react-icons/ai"

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
      <div className="edit_total_duration">
        <span><AiOutlineEdit/></span>
      </div>
    </div>
  );
};

export default ModuleCard;