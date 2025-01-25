import { useContext } from 'react';

import toastContext from '../../contexts/toast';

export default function Toast() {
	const toastCTX = useContext(toastContext);
	if (!toastCTX.toast) return null;

	const toastColor = `alert-${toastCTX.toast.status}`;

	return (
		<div className='toast toast-top top-12 z-20 toast-end'>
			<div className={`alert ${toastColor}`}>
				<span>{toastCTX.toast.message}</span>
			</div>
		</div>
	);
}
