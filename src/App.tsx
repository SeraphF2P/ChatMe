import { lazy } from "react";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

const Register = lazy(() => import("./pages/register/Page"));
const Home = lazy(() => import("./pages/home/Page"));
const Master = lazy(() => import("./layout/Master"));

export const App = () => {
	const { session } = useAuthContext();
	const router = createBrowserRouter([
		{
			element: <Master />,

			children: [
				{
					path: "/register",
					element: session ? <Navigate to={"/"} /> : <Register />,
				},
				{
					path: "/",
					element: session ? <Home /> : <Navigate to={"/register"} />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};
