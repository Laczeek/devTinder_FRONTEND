import { Outlet, useNavigate, useLocation } from 'react-router';
import { useContext, useEffect } from 'react';

import Toast from './Toast';
import NavBar from './NavBar';
import authContext from '../../contexts/auth';

function MainLayout() {
	const location = useLocation();
	const authCTX = useContext(authContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/login' || authCTX.auth.isAuthenticated)
			return;

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
			} catch (err) {
				console.error(err.message);
			} finally {
				authCTX.changeLoadingStatus(false);
			}
		};

		fetchUserData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='min-h-[100vh] flex flex-col'>
			<NavBar />
			<Toast />
			<main className='grow container p-2 mx-auto'>
				<Outlet />
			</main>

			<footer className='footer footer-center bg-base-200 text-base-content p-4'>
				<aside>
					<p>
						Copyright © {new Date().getFullYear()} - All right
						reserved by Dev Tinder
					</p>
				</aside>
			</footer>
		</div>
	);
}

export default MainLayout;
