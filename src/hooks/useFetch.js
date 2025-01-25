import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import authContext from '../contexts/auth';
import toastContext from '../contexts/toast';

export default function useFetch() {
	const authCTX = useContext(authContext);
	const toastCTX = useContext(toastContext);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({});
	const navigate = useNavigate();

	const sendRequest = async (url, options) => {
		setIsLoading(true);
		setError({});

		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}${url}`,
			{ ...options, credentials: 'include' }
		);

		const data = await response.json();

		if (!response.ok && response.status === 401) {
			navigate('/login');
			authCTX.clearContext();
			if (options?.method && options?.method !== 'GET') {
				toastCTX.showToast(
					'Your session has expired. Please log in.',
					'error'
				);
			}
		}

		if (!response.ok) {
			setError(data.error || {});
			setIsLoading(false);
			throw new Error(data.error?.message || 'Something went wrong.');
		}

		setIsLoading(false);

		return data;
	};

	return {
		isLoading,
		sendRequest,
		error,
	};
}
