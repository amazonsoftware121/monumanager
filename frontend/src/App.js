import Login from './pages/login/Login';
import './App.css';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    Navigate
} from "react-router-dom";
import Header from './components/header/Header';
import NavBar from './components/navbar/NavBar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import './style.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import ErrorPage from './error-page';

function App() {
    const { currentUser } = useContext(AuthContext);
    const { darkMode } = useContext(DarkModeContext);
    console.log(darkMode)
    const DashboardPanel = () => {
        return (
            <div className={`theme-${darkMode ? "dark" : "light"}`}>
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                   <Outlet />
                    <RightBar />
                </div>
            </div>
        );
    };
   /* const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }
        return children
    }*/

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        /*{
            path: "/",
            element:  <DashboardPanel />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard />
                },
                {
                    path: "/profile/:id",
                    element: <Profile />
                }
            ]
        },*/

        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/dashboard",
            element: <Dashboard />
        }

    ]);

    return (
        <div>
            <RouterProvider router={router} />

        </div>
    );
}

export default App;