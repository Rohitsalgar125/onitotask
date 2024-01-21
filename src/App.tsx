import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonalDetails from "./scenes/PersonalDetails/PersonalDetails";
import AddressDetails from "./scenes/AddressDetails/AddressDetails";
// import userList from "./scenes/userList/userList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={PersonalDetails} />
        <Route path="/addressdetails" Component={AddressDetails} />
        {/* <Route path="/userlist" Component={userList} /> */}
      </Routes>

    </BrowserRouter>

  )
}

export default App
