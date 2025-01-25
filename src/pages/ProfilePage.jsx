import { useContext } from 'react';

import ProfileForm from '../components/profile-related/ProfileForm';
import authContext from '../contexts/auth';
import LoadingBall from '../components/layout-related/LoadingBall';

export default function ProfilePage() {
	const authCTX = useContext(authContext);

	if (!authCTX.auth.isAuthenticated)
		return (
			<div className='mt-24 text-center'>
				<LoadingBall />
			</div>
		);

	return (
		<section className='mt-10'>
			<ProfileForm user={authCTX.auth.user} updateUserContext={authCTX.updateUserData}/>
		</section>
	);
}
