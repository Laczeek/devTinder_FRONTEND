import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import {
	createSocketConnection,
	closeSocketConnection,
	getSocket,
} from '../../utils/socket';
import authContext from '../../contexts/auth';
import LoadingBall from '../layout-related/LoadingBall';
import toastContext from '../../contexts/toast';
import BubbleStart from './BubbleStart';
import BubbleEnd from './BubbleEnd';

export default function Chat() {
	const { uid } = useParams();
	const [textInput, setTextInput] = useState('');
	const [chatObj, setChatObj] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [onlineUsers, setOnlineUsers] = useState([]);

	const listRef = useRef(null);

	const authCTX = useContext(authContext);
	const toastCTX = useContext(toastContext);

	const participant = chatObj?.participants.find((p) => p._id === uid);
	const isParticipantOnline = onlineUsers.includes(participant?._id);

	const submitHandler = (event) => {
		event.preventDefault();
		const socket = getSocket();

		socket.emit('sendMessage', { text: textInput, userId: uid });
		setTextInput('');
	};

	useEffect(() => {
		setIsLoading(true);
		const socket = createSocketConnection(authCTX);

		//NOTE -  LISTENERS
		socket.on('connect_error', (err) => {
			toastCTX.showToast(err.message, 'error');
			setIsLoading(false);
		});
		socket.on('errorEvent', (err) => {
			toastCTX.showToast(err.message, 'error');
			setIsLoading(false);
		});

		socket.on('joinChat', (data) => {
			setChatObj(data.chat);
			setIsLoading(false);
		});

		socket.on('receiveMessage', (data) => {
			setChatObj((prevState) => ({
				...prevState,
				messages: [...prevState.messages, data.message],
			}));
		});

		socket.on('onlineUsers', (data) => {
			setOnlineUsers(data.onlineUsers);
		});

		//NOTE -  EMITERS
		socket.emit('joinChat', { userId: uid });

		return () => {
			socket.emit('leaveRoom', { userId: uid });

			closeSocketConnection();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTo(0, listRef.current.scrollHeight);
		}
	}, [chatObj]);

	if (isLoading || !chatObj) {
		return (
			<div className='text-center mt-14'>
				<LoadingBall />
			</div>
		);
	}

	return (
		<div className='mt-2 bg-base-300 rounded-md max-w-[800px] mx-auto p-2'>
			<div className='flex justify-between items-center px-2 py-4 border-b-2 border-gray-500'>
				<div className='flex items-center gap-x-4'>
					<img
						src={participant.photoURL}
						className='w-12 h-12 object-cover rounded-full'
					/>
					<p className='text-xl text-white'>
						{participant.firstName} {participant.lastName}
					</p>
				</div>

				<div
					className={`w-5 h-5 rounded-full ${
						isParticipantOnline ? 'bg-green-500' : 'bg-gray-500'
					}  `}
				></div>
			</div>

			<ul className='h-[50vh] overflow-y-auto m-4' ref={listRef}>
				{chatObj.messages.map((msg) => {
					if (msg.sender === authCTX.auth.user._id) {
						return <BubbleEnd key={msg._id} message={msg} />;
					} else {
						return (
							<BubbleStart
								key={msg._id}
								message={{
									...msg,
									photoURL: participant.photoURL,
								}}
							/>
						);
					}
				})}
			</ul>

			<form className='flex items-stretch' onSubmit={submitHandler}>
				<input
					className=' grow rounded-l-lg text-white px-2'
					value={textInput}
					onChange={(e) => setTextInput(e.target.value)}
				/>
				<button
					className='btn btn-secondary rounded-l-none'
					type='submit'
				>
					<span className='pl-1 text-3xl flex justify-center items-center'>
						⌲
					</span>
				</button>
			</form>
		</div>
	);
}
