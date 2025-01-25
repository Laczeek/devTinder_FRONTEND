import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthContextProvider } from './contexts/auth.jsx';
import { ToastContextProvider } from './contexts/toast.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthContextProvider>
			<ToastContextProvider>
				<App />
			</ToastContextProvider>
		</AuthContextProvider>
	</StrictMode>
);
