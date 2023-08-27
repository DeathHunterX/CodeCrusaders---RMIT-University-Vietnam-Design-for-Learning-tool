const ModuleCard = ({ title, number, numberDuration, numTotal }) => {
  return (
    <div className="module-card">
      <h4>{title}</h4>
      <div className="d-flex justify-content-between">
        <div className="info-info">
          <h6>Number of Activity:</h6>
          <h6>{number}</h6>
        </div>
        <div className="info-info">
          <h6>Duration:</h6>
          <h6>
            {numberDuration}
            <span> mins</span>
          </h6>
        </div>
        <div className="info-info">
          <h6>Total Duration:</h6>
          <h6>
            {numTotal}
            <span> mins</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
