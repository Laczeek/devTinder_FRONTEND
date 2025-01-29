export const getTimeString = (dateString) => {
	return new Date(dateString).toLocaleString('en-GB', {
		timeStyle: 'short',
		dateStyle: 'medium',
	});
};
