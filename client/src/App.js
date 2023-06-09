import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/navBar";
import HomePage from "./components/Home/home";
import PageRender from "./customRouter/PageRender";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DownloadPDF from "./pages/downloadPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./components/DownloadPDF/PDFFile";
import { PDFViewer } from "@react-pdf/renderer";
import Download from "./components/DownloadPDF/Download";

// import Login from "./pages/login";
// import RegisterPage from "./pages/register";

function App() {
  const [sideBarStats, setSideBarStats] = useState(true);
  function handleState() {
    setSideBarStats(!sideBarStats);
  }

  return (
    <Router>
      <div className="App">
        <div className="main">
          <NavBar sideBarStats={sideBarStats} changeState={handleState} />

          <section
            id="main_screen"
            className={`${sideBarStats === true ? "nav_is_closed" : ""}`}
          >
            <Routes>
              <Route exact path="/" element={<HomePage />} />

              <Route exact path="/down-preview" element={<Download />} />

              <Route exact path="/pdf" element={<HomePage />} />
              <Route exact path="/">
                <Route exact path="/:page" element={<PageRender />} />
                <Route exact path="/:page/:id" element={<PageRender />} />
                <Route
                  exact
                  path="/:page/:id/:subPage"
                  element={<PageRender />}
                />
                <Route
                  exact
                  path="/:page/:id/:subPage/:subId"
                  element={<PageRender />}
                />
              </Route>
            </Routes>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
