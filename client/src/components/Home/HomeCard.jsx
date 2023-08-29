import { AiOutlineArrowRight } from "react-icons/ai";
const HomeCard = ({ title, number, name }) => {
  return (
    <div className="home-card">
      <div className="home-card-title">
        <p>{title}</p>
        <h4>
          {number}
          <span> {name}</span>
        </h4>
      </div>
      {/* <hr /> */}
      {/* <div className="d-flex justify-content-between home-detail-card">
        <p>View Detail</p>
        <AiOutlineArrowRight />
      </div> */}
    </div>
  );
}

export default HomeCard