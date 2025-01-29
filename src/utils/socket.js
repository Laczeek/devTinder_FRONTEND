import { io } from 'socket.io-client';

let socket = null;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const createSocketConnection = () => {
	if (socket) {
		console.warn('Socket connection already exists.');
		return socket;
	}

	try {
		if (location.hostname === 'localhost') {
			socket = io(BACKEND_URL, { withCredentials: true });
		} else {
			socket = io('/', {
				path: `${BACKEND_URL}/socket.io`,
				withCredentials: true,
			});
		}
	} catch (err) {
		console.error(err.message);
	}

	return socket;
};

const getSocket = () => {
	if (!socket) {
		console.warn('Socket conection is not estabilished.');
	}
	return socket;
};

const closeSocketConnection = () => {
	socket.disconnect();

	socket = null;
};

export { createSocketConnection, getSocket, closeSocketConnection };
