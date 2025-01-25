import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import LoadingBall from '../components/layout-related/LoadingBall';
import RequestCard from '../components/connections/RequestCard';

export default function RequestsPage() {
	const { sendRequest, isLoading } = useFetch();
	const { sendRequest: sendUpdateRequest } = useFetch();
    
	const [requests, setRequests] = useState(null);
	const [hideButtons, setHideButtons] = useState(null);

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const data = await sendRequest('/connections/requests');
				setRequests(data.connections);
			} catch (err) {
				console.error(err.message);
			}
		};
		fetchRequests();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const reviewRequest = async (status, connectionId) => {
		setHideButtons(connectionId);
		try {
			await sendUpdateRequest(`/connections/${status}/${connectionId}`, {
				method: 'PATCH',
			});

			setRequests((prevState) =>
				prevState.filter((req) => req._id !== connectionId)
			);
		} catch (err) {
			console.error(err.message);
		} finally {
			setHideButtons(null);
		}
	};

	if (isLoading || !requests)
		return (
			<div className='mt-24 text-center'>
				<LoadingBall />
			</div>
		);

	return (
		<section>
			<h2 className='text-center text-2xl font-bold mt-2 mb-4'>
				Connection Requests
			</h2>
			{requests.length === 0 && (
				<p className='text-center text-green-200'>
					No one has tried to make a connection with you yet.
				</p>
			)}
			{requests.length > 0 && (
				<ul className='flex flex-col gap-y-2 max-w-[700px] mx-auto'>
					{requests.map((request) => (
						<li key={request._id}>
							<RequestCard
								request={request}
								reviewRequest={reviewRequest}
								isLoading={hideButtons === request._id}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
