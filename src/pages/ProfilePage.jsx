import { useContext } from 'react';

import ProfileForm from '../components/profile-related/ProfileForm';
import authContext from '../contexts/auth';

export default function ProfilePage() {
	const authCTX = useContext(authContext);

	return (
		<section className='mt-10'>
			<ProfileForm user={authCTX.auth.user} updateUserContext={authCTX.updateUserData}/>
		</section>
	);
}
