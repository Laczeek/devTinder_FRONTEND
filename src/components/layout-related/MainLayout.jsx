import { Outlet } from 'react-router';

import ProtectRoutes from './ProtectRoutes';
import Toast from './Toast';
import NavBar from './NavBar';

function MainLayout() {
	return (
		<div className='min-h-[100vh] flex flex-col'>
			<NavBar />
			<Toast />
			<main className='grow container p-2 mx-auto'>
				<ProtectRoutes>
					<Outlet />
				</ProtectRoutes>
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
