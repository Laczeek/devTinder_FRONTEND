import { createContext, useState } from 'react';

const toastContext = createContext({
	toast: null,
	showToast: () => {},
});

let timeout = null;

export const ToastContextProvider = ({ children }) => {
	const [toast, setToast] = useState(null);

	const showToast = (message, status) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		setToast({ message, status });
		timeout = setTimeout(() => {
			setToast(null);
		}, 3500);
	};

	return (
		<toastContext.Provider value={{ toast, showToast }}>
			{children}
		</toastContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default toastContext;
