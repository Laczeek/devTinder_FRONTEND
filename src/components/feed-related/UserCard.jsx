export default function UserCard({ user, handleConnectionRequest, isLoading }) {
	let actionButtons = (
		<>
			<button className='btn btn-error grow'>Ignore</button>
			<button className='btn btn-accent grow'>Interested</button>
		</>
	);

	if (handleConnectionRequest) {
		actionButtons = (
			<>
				<button
					className='btn btn-error grow'
					onClick={handleConnectionRequest.bind(
						null,
						'ignored',
						user._id
					)}
				>
					Ignore
				</button>
				<button
					className='btn btn-accent grow'
					onClick={handleConnectionRequest.bind(
						null,
						'interested',
						user._id
					)}
				>
					Interested
				</button>
			</>
		);
	}

	return (
		<div className='card bg-base-300 max-w-96 shadow-xl mx-auto'>
			<figure>
				<img
					src={user.photoURL}
					alt='User image'
					className='object-cover h-[280px] w-full'
				/>
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>
					{user.firstName} {user.lastName}, {user.age}
				</h2>
				<p className='text-'>{user.gender}</p>
				<p>{user.about}</p>
				<div className='card-actions justify-evenly mt-4 space-x-4 text-center'>
					{!isLoading && actionButtons}
					{isLoading && (
						<span className='loading loading-ring loading-lg'></span>
					)}
				</div>
			</div>
		</div>
	);
}
