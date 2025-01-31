import { useEffect, useState } from 'react';

import useFetch from '../hooks/useFetch';
import UserCard from '../components/feed-related/UserCard';
import LoadingBall from '../components/layout-related/LoadingBall';

export default function FeedPage() {
	const [users, setUsers] = useState(null);
	const [hideButtons, setHideButtons] = useState(null);

	const { sendRequest, isLoading } = useFetch();
	const { sendRequest: sendConnectionRequest } = useFetch();

	useEffect(() => {
		const fetchFeed = async () => {
			try {
				const data = await sendRequest('/users/feed');

				setUsers(data.users);
			} catch (err) {
				console.error(err.message);
			}
		};
		fetchFeed();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleConnectionRequest = async (status, receiverId) => {
		setHideButtons(receiverId);
		try {
			await sendConnectionRequest(
				`/connections/${status}/${receiverId}`,
				{ method: 'POST' }
			);

			setUsers((prevState) => prevState.slice(1));
		} catch (err) {
			console.error(err.message);
		} finally {
			setHideButtons(null);
		}
	};

	if (isLoading || !users)
		return (
			<div className='text-center mt-24'>
				<LoadingBall />
			</div>
		);

	return (
		<section className='mt-10'>
			{users.length === 0 && (
				<h2 className='text-xl text-center '>
					<span className='block text-5xl'>🤷‍♂️</span>
					There are no users to show.
				</h2>
			)}
			{users.length > 0 && (
				<div>
					<UserCard
						user={users[0]}
						handleConnectionRequest={handleConnectionRequest}
						isLoading={hideButtons === users[0]._id}
					/>
				</div>
			)}
		</section>
	);
}
