import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/Navbar/navBar';
import HomePage from './components/Home/home';
import Courses from "./pages/courses";
import CreateCourse from "./pages/create-course";
import CourseItems from "./pages/courses/[id]";

function App() {
  const [sideBarStats, setSideBarStats] = useState(true)
  function handleState() {
    setSideBarStats(!sideBarStats);
 }
 
  return (
    <Router>
      <div className="App">
        <div className='main'>
            <NavBar sideBarStats={sideBarStats} changeState={handleState}/>
            
            <section id="main_screen" className={`${sideBarStats === true ? 'nav_is_closed' : ''}`}>
              {/* <div className="main_screen_wrapper position-absolute w-100"> */}
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/courses' element={<Courses/>}/>
                  <Route path='/create_course' element={<CreateCourse />} />
                  <Route path='/course/:id' element={<CourseItems />} />

                </Routes>
              {/* </div> */}
            </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
