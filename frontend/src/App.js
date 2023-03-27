import Login from './pages/login/Login';
import './App.css';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    Navigate
} from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile'
import Dashboard from './pages/dashboard/Dashboard';
import './style.scss';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from './error-page';
import Customer from './pages/customer/Customer';

function App() {
    const { currentUser } = useContext(AuthContext);

    // const queryClient = new QueryClient();
    //console.log(darkMode);



    const Layout = () => {
        return (
            <div className="adminDashboard">
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                        <Outlet />
                    </div>
                    <RightBar />
                </div>
            </div>
        )
    }




    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/login",
            element: <Login />,
        },
    {
        path: "/dashboard",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            {
                path: "/dashboard/customer",
                element: <Dashboard />
            }
        ]
    }
    ]);


    return (
        <div>
            <RouterProvider router={router} />

        </div>
    );
}

export default App;