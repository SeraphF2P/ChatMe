import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { App } from "./App.tsx";
import { AuthanticationProvider } from "./contexts/AuthanticationProvider.tsx";
import "./index.css";
import { ErrorBoundary } from "./ui/ErrorBoundary.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ErrorBoundary>
		<AuthanticationProvider>
			<ToastContainer position="top-center" theme="dark" />
			<App />
		</AuthanticationProvider>
	</ErrorBoundary>
);
