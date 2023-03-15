import './App.css';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Login from './pages/Login';
import Header from "./components/Header";
import Forgotpassword from './pages/Forgotpassword';
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";




const App = ()=> {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className='text-center'>
          <h1>Home page</h1>
          <Link to="login" className='btn btn-primary'>Login</Link>
        </div>
      ),
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "forgotpassword",
      element: <Forgotpassword />,
    },
    {
      path: "/*",
      element: <Error />,
    },
  ]);
  
  createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );
  

  return(
  <>
<Header />
    
  </> 
  );
}

export default App;
