import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from '../components/Login';
import Register from '../components/Register/Register';
// import Not_fond_page from "../pages/not_fond_page";
import Layout from "../layout/layout";
import Favoris from "../components/Favoris";


export const router = createBrowserRouter([
    {
       
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/Favoris",
                element: <Favoris />,
            },
           
            {
                path: "*",
                element: <h1>no data</h1>,
            },
        ]
            
    }
   
]);
