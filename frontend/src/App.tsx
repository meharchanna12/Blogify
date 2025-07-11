import { BrowserRouter,Route,Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog"
import Publish from "./pages/Publish"
import Profile from "./pages/Profile"
import EditPost from "./pages/EditPost"
import { ToastContainer } from "react-toastify"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path = "/" element = {<Signin />}></Route>
          <Route path = "/signup" element = {<Signup />}></Route>
          <Route path = "/signin" element = {<Signin />}></Route>
          <Route path="/blogs" element = {<Blogs />}></Route>
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element ={<Publish />}></Route>
          <Route path="/profile" element = {<Profile />}></Route>
          <Route path="/edit/:id" element = {<EditPost />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

    </>
  )
}

export default App
