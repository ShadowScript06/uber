import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserSignin from "./pages/UserSignin";
import CaptainSignIn from "./pages/CaptainSignIn";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import UserProtectedWrapper from "./components/UserProtectedWrapper";

function App() {
  return <>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/user-signin" element={<UserSignin/>}/>
    <Route path="/captain-signin" element={<CaptainSignIn/>}/>
    <Route path="/user-signup" element={<UserSignup/>}/>
    <Route path="/captain-signup" element={<CaptainSignup/>}/>
    <Route path='/home' element={ <UserProtectedWrapper ><Home/> </UserProtectedWrapper>}/>
   
   

  </Routes>
  </>;
}

export default App;
