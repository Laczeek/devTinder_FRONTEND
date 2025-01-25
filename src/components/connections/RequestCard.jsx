export default function RequestCard({ request, reviewRequest, isLoading }) {
	const { sender, createdAt, _id } = request;

	return (
		<div className='card card-side bg-base-300 p-4 gap-x-6'>
			<figure>
				<img
					src={sender.photoURL}
					alt='User image'
					className='w-20 h-20 object-cover rounded-full'
				/>
			</figure>
			<div className='grow'>
				<h3 className='font-bold text-lg'>
					{sender.firstName} {sender.lastName}
				</h3>
				{sender.gender && sender.age && (
					<p>
						{sender.gender}, {sender.age}
					</p>
				)}
				<p className='my-1'>{sender.about}</p>
				<p className='text-xs text-yellow-200'>
					Request send {new Date(createdAt).toLocaleDateString()}
				</p>
			</div>
			<div className='flex flex-col gap-y-2 w-24 justify-center text-center'>
				{!isLoading && (
					<>
						<button
							className='btn btn-error'
							onClick={reviewRequest.bind(null, 'rejected', _id)}
						>
							Reject
						</button>
						<button
							className='btn btn-accent '
							onClick={reviewRequest.bind(null, 'accepted', _id)}
						>
							Accept
						</button>
					</>
				)}
				{isLoading && (
					<span className='loading loading-ring loading-lg'></span>
				)}
			</div>
		</div>
	);
}
