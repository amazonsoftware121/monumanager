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
import Search from "../src/pages/dashboard/search/Search"
import './style.scss';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import ErrorPage from './error-page';
import Customers from './pages/dashboard/customers/Customers';
import Jobs from "./pages/dashboard/jobs/Jobs";
import Products from "./pages/dashboard/products/Products";
import Carvings from "./pages/dashboard/carvings/Carvings";
import Tasks from "./pages/dashboard/tasks/Tasks";
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
                        <div className='dashboardLeft col-md-3 col-xl-2 '> <LeftBar /></div>
                        <div className='dashboardRight col-md-9 col-xl-10 '>
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
                },
                {
                    path: "/dashboard/job/:id",
                    element: <Job />
                },
                {
                    path: "/dashboard/search",
                    element: <Search />
                },
                {
                    path: "/dashboard/customers",
                    element: <Customers />
                },
                {
                    path: "/dashboard/jobs",
                    element: <Jobs />
                },
                {
                    path: "/dashboard/tasks",
                    element: <Tasks />
                },
                {
                    path: "/dashboard/carvings",
                    element: <Carvings />
                },
                {
                    path: "/dashboard/products",
                    element: <Products />
                }



            ]
        }
    ]);


    return (
        <div className='app'>
            <div className=''>
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;