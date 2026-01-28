import { createBrowserRouter } from "react-router";
import MainElement from "../../MainElement";
import Home from "../Pages/Home";
import Auth from "../Auth";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddServices from "../Pages/AddServices";
import PetSupplies from "../Pages/PetSupplies";
import MyServices from "../Pages/MyServices";
import PetDetails from "../Component/PetDetails";
import PrivateRoute from "../Provider/PrivateRoute";
import MyOrders from "../Pages/MyOrders";
import EditPets from "../Component/EditPets";
import Error from "../Component/Error";
import DashboardLayout from "../Component/Dashboard";
import DashboardHome from "../Component/DashBoardHome";
import Profile from "../Pages/ProfilePage";
import About from "../Pages/extra/About";
import Blog from "../Pages/extra/Blog";
import Contact from "../Pages/extra/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainElement></MainElement>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/add-services",
        element: <AddServices></AddServices>,
      },
      {
        path: "/pet-supplies",
        element: <PetSupplies></PetSupplies>,
        loader: () =>
          fetch("https://pawmart-two.vercel.app/services").then((res) =>
            res.json(),
          ),
        hydrateFallbackElement: (
          <span className="loading loading-spinner text-error"></span>
        ),
      },
      {
        path: "/my-services",
        element: <MyServices></MyServices>,
      },
      {
        path: "/pet-details/:id",
        element: (
          <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://pawmart-two.vercel.app/services/${params.id}`).then(
            (res) => res.json(),
          ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-service/:id",
        element: (
          <PrivateRoute>
            <EditPets></EditPets>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "", 
        element: <DashboardHome />,
      },
      {
        path:"dashboard/profile",
        element: <Profile></Profile>
      }
    ]
  },
  

  {
    path: "/auth",
    element: <Auth></Auth>,
    children: [
      { path: "/auth/login", Component: Login },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path:"/about",
    element: <About></About>
  },
  {
    path:"/blog",
    element: <Blog></Blog>
  },
  {
    path:"/contact",
    element: <Contact></Contact>
  }
]);

export default router;
