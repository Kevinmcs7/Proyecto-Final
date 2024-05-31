import App from "./App";
import Dashboard from "./Dashboard";


const routes = [
    {
        path:"/",
        element: <App/>,
      },
      {
        path: "Dashboard",
        element: <Dashboard/>,
      },
];


export default routes;