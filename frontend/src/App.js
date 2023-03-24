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

function App() {
    const { currentUser } = useContext(AuthContext);

    // const queryClient = new QueryClient();
    //console.log(darkMode);
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
        },
        {
            path: "/admin",
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/admin/profile",
                    element: <Profile />,
                },
                {
                    path: "/admin/dashboard",
                    element: <Dashboard />,
                }
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },

    ]);


    return (
        <div>
            <RouterProvider router={router} />

        </div>
    );
}

export default App;