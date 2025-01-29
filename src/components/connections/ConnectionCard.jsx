import { Link } from 'react-router';

export default function ConnectionCard({ connection }) {
	const { ourMatch, createdAt } = connection;

	return (
		<div className='card card-side bg-base-300 p-4 gap-x-6'>
			<figure>
				<img
					src={connection.ourMatch.photoURL}
					alt='User image'
					className='w-20 h-20 object-cover rounded-full'
				/>
			</figure>
			<div className='grow'>
				<h3 className='font-bold text-lg'>
					{ourMatch.firstName} {ourMatch.lastName}
				</h3>
				{ourMatch.gender && ourMatch.age && (
					<p>
						{ourMatch.gender}, {ourMatch.age}
					</p>
				)}
				<p className='my-1'>{ourMatch.about}</p>
				<p className='text-xs text-yellow-200'>
					Connected since {new Date(createdAt).toLocaleDateString()}
				</p>
			</div>
			<Link
				className='btn btn-primary self-center'
				to={`/chat/${ourMatch._id}`}
			>
				Chat
			</Link>
		</div>
	);
}
