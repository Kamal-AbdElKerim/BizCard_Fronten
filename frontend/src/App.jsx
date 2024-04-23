import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes ,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register/Register';

import { router } from "./router/index";


function App() {
  return (
    <div>
  <RouterProvider router={router} />
  </div>
  )
}

export default App;
