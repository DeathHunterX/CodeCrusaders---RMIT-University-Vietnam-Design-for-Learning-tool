import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./components/Home/home";
import PageRender from "./customRouter/PageRender";

import Download from "./components/DownloadPDF/Download";
import PrivateRouter from "./customRouter/PrivateRouter";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";


import { getRefreshToken } from "./utils/CookieSetUp";
function App() {
  const isAuth = getRefreshToken();
  return (
    <Router>
      <div className="App">
        <div className="main">

          <Layout>
            <Routes>
              {/* Authentication an Authorization */}
              <Route exact path="/login" element={isAuth ? <Navigate to="/" /> : <LoginPage />} />
              <Route exact path="/register" element={isAuth ? <Navigate to="/" /> : <RegisterPage />} />

              <Route exact path="/" element={<PrivateRouter />}>
                <Route exact path="/" element={<HomePage />} />

                <Route exact path="/down-preview" element={<Download />} />

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
          </Layout>

        </div>
      </div>
      <ToastContainer
        position="bottom-right"
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
