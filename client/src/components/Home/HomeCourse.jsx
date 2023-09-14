import HomeCourseImg from "../../images/Logo/passionplanner-86b0283fd91346c18d03c4e6ea3f9feb.jpeg"

export default function HomeCourse({ title, id, compFunction}) {
  return (
    <div className="home-course my-2">
      <div className="d-flex">

        <div className="col-3 pe-2">
            <img src={HomeCourseImg} alt="" />
        </div>

        <div className="col-6">
          <div className="home-course-info w-100">
            <h5>{title}</h5>
          </div>
        </div>

        <div className="col-3">
          <button className="home-course-button" onClick={() => compFunction(id)}>Analysis</button>
        </div>
      </div>
    </div>
  );
}
