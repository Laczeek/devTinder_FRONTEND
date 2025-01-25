import { createContext, useState } from 'react';

const initialValue = {
	isLoading: false,
	user: null,
	isAuthenticated: false,
};

const authContext = createContext({
	login: () => {},
	logout: async () => {},
	changeLoadingStatus: () => {},
	updateUserData: () => {},
	clearContext: () => {},
	auth: initialValue,
});

export function AuthContextProvider({ children }) {
	const [auth, setAuth] = useState(initialValue);

	const login = (data) => {
		setAuth({ isLoading: false, user: data, isAuthenticated: true });
	};

	const logout = async () => {
		await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
			credentials: 'include',
		});
		setAuth(initialValue);
	};

	const clearContext = () => {
		setAuth(initialValue);
	};

	const updateUserData = (data) => {
		setAuth({ isLoading: false, user: data, isAuthenticated: true });
	};

	const changeLoadingStatus = (status) => {
		setAuth((prevState) => ({ ...prevState, isLoading: status }));
	};

	return (
		<authContext.Provider
			value={{
				auth,
				login,
				logout,
				clearContext,
				changeLoadingStatus,
				updateUserData,
			}}
		>
			{children}
		</authContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export default authContext;
