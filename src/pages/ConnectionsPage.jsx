import { useEffect, useState } from 'react';

import LoadingBall from '../components/layout-related/LoadingBall';
import useFetch from '../hooks/useFetch';
import ConnectionCard from '../components/connections/ConnectionCard';

export default function ConnectionsPage() {
	const { isLoading, sendRequest } = useFetch();
	const [connections, setConnections] = useState(null);

	useEffect(() => {
		const fetchConnections = async () => {
			try {
				const data = await sendRequest('/connections/accepted');

				setConnections(data.connections);
			} catch (err) {
				console.error(err.message);
			}
		};

		fetchConnections();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading || !connections)
		return (
			<div className='mt-24 text-center'>
				<LoadingBall />
			</div>
		);

	return (
		<section>
			<h2 className='text-center text-2xl font-bold mt-2 mb-4'>
				Your Connections
			</h2>
			{connections.length === 0 && (
				<p className='text-center text-lg'>
					<span className='block text-5xl'>🙇‍♂️</span>
					You don&apos;t have any connections yet.
				</p>
			)}
			{connections.length > 0 && (
				<ul className='flex flex-col gap-y-2 max-w-[600px] mx-auto'>
					{connections.map((connection) => (
						<li key={connection._id}>
							<ConnectionCard connection={connection} />
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
