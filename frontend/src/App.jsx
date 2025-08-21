import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserSignin from "./pages/UserSignin";
import CaptainSignIn from "./pages/CaptainSignIn";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import Navbar from "./components/Navbar";

function App() {
  return <>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/user-signin" element={<UserSignin/>}/>
    <Route path="/captain-signin" element={<CaptainSignIn/>}/>
    <Route path="/user-signup" element={<UserSignup/>}/>
    <Route path="/captain-signup" element={<CaptainSignup/>}/>

  </Routes>
  </>;
}

export default App;
