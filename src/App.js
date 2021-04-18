import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ProtectedRouter from "./Components/Helper/ProtectedRouter";
import Photo from "./Components/PhotoContent/Photo";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Page404 from "./Pages/NotFound/Page404";
import User from "./Pages/User/User";
import UserProfile from "./Pages/User/UserProfile";
import { UserStorage } from "./UserContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="AppBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <ProtectedRouter path="conta/*" element={<User />} />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
