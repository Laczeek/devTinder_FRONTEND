import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import authContext from '../../contexts/auth';

function NavBar() {
	const authCTX = useContext(authContext);
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			await authCTX.logout();
			navigate('/login');
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<nav>
			<div className='navbar bg-base-200'>
				<div className='flex-1'>
					{!authCTX.auth.isLoading && (
						<Link
							className='btn btn-ghost text-xl'
							to={authCTX.auth.isAuthenticated ? '/' : '/login'}
						>
							👨‍💻 Dev Tinder
						</Link>
					)}
				</div>
				{authCTX.auth.isAuthenticated && !authCTX.auth.isLoading && (
					<div className='flex-none gap-2'>
						<div className='dropdown dropdown-end'>
							<div
								tabIndex={0}
								role='button'
								className='btn btn-ghost btn-circle avatar'
							>
								<div className='w-10 rounded-full'>
									<img
										alt='User image'
										src={authCTX.auth.user.photoURL}
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
							>
								<li>
									<Link
										className='justify-between'
										to={'/profile'}
									>
										Profile
									</Link>
								</li>
								<li>
									<Link to='/connections'>Connections</Link>
								</li>
								<li>
									<Link to='/requests'>Requests</Link>
								</li>
								<li>
									<button onClick={logoutHandler}>
										Logout
									</button>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
