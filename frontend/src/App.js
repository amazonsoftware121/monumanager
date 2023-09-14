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
import Job from "../src/pages/dashboard/job/Job";
import { Carving, Customer, Order, OrderServices, Product, Status, Task } from './pages/dashboard/customer/Customer';
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
import AddCustomer from './pages/dashboard/customer/AddCustomer';
import { CustomerDetails } from './pages/dashboard/customer/Customer';
import { EditProduct } from './pages/dashboard/customer/Customer';
import Forgotpassword from './pages/forgotpassword/Forgotpassword';

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
            path: "/forgotpassword",
            element: <Forgotpassword />
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
                    path: "/dashboard/customer/addcustomer",
                    element: <Customer />
                },
                {
                    path: "/dashboard/customer/:customerId",
                    element: <Customer />
                },
                {
                    path: "/dashboard/customer/:customerId/addorder",
                    element: <Order />
                },
                
                {
                    path: "/dashboard/customer/:customerId/order/:orderid",
                    element: <Order />
                },
                {
                    path: "/dashboard/customer/:customerId/order/edit/:orderid",
                    element: <Order />
                },
                {
                    path: "/dashboard/customer/:customerId/order/:orderid/orderservices",
                    element: <OrderServices />
                },
                {
                    path: "/dashboard/customer/:customerId/order/:orderid/addtask",
                    element: <Task />
                },
                {
                    path: "/dashboard/customer/:customerId/order/:orderid/task/:taskid",
                    element: <Task />
                },
                {
                    path: "/dashboard/tasks/addtask/",
                    element: <Task />
                },
                {
                    path: "/dashboard/task/edit/:taskId",
                    element: <Task />
                },
                {
                    path: "/dashboard/customer/:customerId/order/:orderid/addcarving",
                    element: <Carving />
                },
                {
                    path: "/dashboard/carving/edit/:carvingId",
                    element: <Carving />
                },
                {
                    path: "/dashboard/carvings/addcarving",
                    element: <Carving />
                },
                {
                    path: "/dashboard/customer/:customerId/order/:orderid/addproduct",
                    element: <Product />
                },
                {
                    path: "/dashboard/products/addproduct",
                    element: <Product />
                },
                {
                    path: "/dashboard/product/edit/:productId",
                    element: <Product />
                },
                {
                    path: "/dashboard/customer/:customerId/order/:orderid/status",
                    element: <Status />
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
                    path: "/dashboard/carving",
                    element: <Carving />
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