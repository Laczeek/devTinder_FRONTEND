import { useContext } from 'react';

import toastContext from '../../contexts/toast';

export default function Toast() {
	const toastCTX = useContext(toastContext);
	if (!toastCTX.toast) return null;

	return (
		<div className='toast toast-top top-12 z-20 toast-end'>
			<div
				className={`alert ${
					toastCTX.toast.status === 'success'
						? 'alert-success'
						: 'alert-error'
				}`}
			>
				<span>{toastCTX.toast.message}</span>
			</div>
		</div>
	);
}
