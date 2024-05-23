import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import reportWebVitals from "../reportWebVitals";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
]);
    

reportWebVitals()