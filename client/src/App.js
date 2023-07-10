import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/navBar";
import HomePage from "./components/Home/home";
import PageRender from "./customRouter/PageRender";

import Download from "./components/DownloadPDF/Download";
import PrivateRouter from "./customRouter/PrivateRouter";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [sideBarStats, setSideBarStats] = useState(true);
  const [pathname, setPathname] = useState('')

  function handleState() {
    setSideBarStats(!sideBarStats);
  }

  return (
    <Router>
      <div className="App">
        <div className="main">
          <NavBar sideBarStats={sideBarStats} changeState={handleState} getPathname={setPathname} />

          <section
            id="main_screen"
            className={`${sideBarStats === true ? "nav_is_closed" : ""}`}
            style={{paddingLeft: `${(pathname === "/login" || pathname === "/register") && 0 }`}}
          >
            <Routes>
              {/* Authentication an Authorization */}
              <Route exact path="/login" element={<LoginPage/>} />
              <Route exact path="/register" element={<RegisterPage/>} />
              
              <Route exact path="/" element={<PrivateRouter />}>
                
                    <Route exact path="/" element={<HomePage />} />

                    <Route exact path="/down-preview" element={<Download />} />

                    
                    <Route exact path="/:page" element={<PageRender />} />
                    <Route exact path="/:page/:id" element={<PageRender />} />
                    <Route exact path="/:page/:id/:subPage" element={<PageRender />} />
                    <Route exact path="/:page/:id/:subPage/:subId" element={<PageRender />}/>
                    
              </Route>
            </Routes>
          </section>


        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </Router>
  );
}

export default App;
