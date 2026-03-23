// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Auth from "./pages/Auth";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Auth />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Public (guest-only) */}
        <Route
          path="/"
          element={
            <PublicRoutes>
              <Auth />
            </PublicRoutes>
          }
        />

        {/* Private (auth-only) */}
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
