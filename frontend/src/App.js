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
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Job from "../src/pages/dashboard/job/Job"
import './style.scss';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';


//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from './error-page';
import Customer from './pages/dashboard/customer/Customer';
import { QueryClient, QueryClientProvider } from 'react-query'


function App() {
    const { currentUser } = useContext(AuthContext);

    // const queryClient = new QueryClient();
    //console.log(darkMode);

    const queryClient = new QueryClient();


    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
            <div className="adminDashboard">
                <NavBar />
                <div className='row'>
                   <div className='dashboardLeft col-auto col-md-3 col-xl-2 px-sm-2 px-0'> <LeftBar /></div>
                    <div className='dashboardRight col-auto col-md-9 col-xl-9 px-sm-9 px-0'>
                        <Outlet />
                    </div>
                   
                </div>
            </div>
            </QueryClientProvider>
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
                path: "/dashboard",
                element: <Dashboard />
            },
            
           
            {
                path: "/dashboard/job",
                element: <Job />
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