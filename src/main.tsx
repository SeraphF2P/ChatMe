import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { AuthanticationProvider } from "./contexts/AuthanticationProvider.tsx";
import "./index.css";
import { ErrorBoundary } from "./ui/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<AuthanticationProvider>
				<App />
			</AuthanticationProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
