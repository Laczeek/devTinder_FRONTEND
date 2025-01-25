function Input({ type, label, value, onChangeHandler, id, error }) {
	return (
		<label className='form-control w-full mb-2'>
			<div className='label'>
				<span className='label-text'>{label}</span>
			</div>
			<input
				type={type}
				className='input input-bordered w-full'
				name={id}
				value={value}
				onChange={onChangeHandler}
			/>
			<p className='text-error text-xs mt-1 ml-2'>{error}</p>
		</label>
	);
}

export default Input;
