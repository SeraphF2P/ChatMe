import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { lazy } from "react";

const Register = lazy(() => import("./pages/register/Page"));
const Home = lazy(() => import("./pages/home/Page"));
const Master = lazy(() => import("./layout/Master"));

export const App = () => {
	const { currentUser } = useAuthContext();
	const router = createBrowserRouter([
		{
			element: <Master />,

			children: [
				{
					path: "/register",
					element: currentUser ? <Navigate to="/" /> : <Register />,
					// element: <Register />,
				},
				{
					path: "/",
					element: currentUser ? <Home /> : <Navigate to="/register" />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};
