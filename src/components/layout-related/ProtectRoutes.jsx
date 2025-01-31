import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import authContext from '../../contexts/auth';
import LoadingBall from './LoadingBall';

export default function ProtectRoutes({ children }) {
	const authCTX = useContext(authContext);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (authCTX.auth.isAuthenticated) return;

		const fetchUserData = async () => {
			try {
				authCTX.changeLoadingStatus(true);
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/users/me`,
					{ credentials: 'include' }
				);
				const data = await response.json();

				if (!response.ok) {
					navigate('/login');
					throw new Error(
						data.error.message || 'Something went wrong.'
					);
				}

				authCTX.login(data.user);
				if (location.pathname === '/login') {
					navigate('/');
				}
			} catch (err) {
				console.error(err.message);
			} finally {
				authCTX.changeLoadingStatus(false);
			}
		};

		fetchUserData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (
		(!authCTX.auth.isAuthenticated && location.pathname !== '/login') ||
		authCTX.auth.isLoading
	)
		return (
			<div className='text-center mt-24'>
				<LoadingBall />
			</div>
		);

	return children;
}
