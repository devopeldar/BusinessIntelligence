// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { MaterialUIControllerProvider } from './context';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <MaterialUIControllerProvider>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </MaterialUIControllerProvider>

// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Router } from "react-router-dom";
import App from "./Appwww";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";
import Confirmacion from "./components/authentication/Confirmacion";
import { Switch } from "@mui/material";
import Login from "./components/authentication/Login";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
      {/* <Route path="" component={ <Confirmacion />} /> */}
    </BrowserRouter>
   
);