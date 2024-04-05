import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MainPage from "./pages/MainPage/MainPage";
import TestAModal from "./ui/testAuthModal/TestAModal";
import RecipePage from "./pages/RecipePage/RecipePage";
import ProfilePages from "./pages/ProfilePages/ProfilePages";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import EditRecipePage from "./pages/EditRecipePage/EditRecipePage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestAModal />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/profile/:id" element={<ProfilePages />} />
        <Route path="/edit_page/:id" element={<EditRecipePage />} />
        <Route path="/my_profile" element={<MyProfilePage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
