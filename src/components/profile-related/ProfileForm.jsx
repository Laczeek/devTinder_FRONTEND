import { useContext, useState } from 'react';

import Input from '../forms/Input';

import UserCard from '../feed-related/UserCard';
import useFetch from '../../hooks/useFetch';
import toastContext from '../../contexts/toast';

export default function ProfileForm({ user, updateUserContext }) {
	const { sendRequest, error, isLoading } = useFetch();
	const { showToast } = useContext(toastContext);

	const [inputsValues, setInputsValues] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		age: user.age || '',
		gender: user.gender || '',
		photoURL: user.photoURL,
		skills: user.skills.join(', '),
		about: user.about,
	});

	const changeInputHandler = (event) => {
		const { name, value } = event.target;

		setInputsValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const uptadeData = { ...inputsValues };
		const skillsArr = uptadeData.skills.split(',');

		uptadeData.skills = skillsArr;

		try {
			const data = await sendRequest('/users', {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(uptadeData),
			});

			updateUserContext(data.user);
			showToast('Profile successfully updated.', 'success');
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
			<form
				className='card bg-base-300 max-w-[600px]  p-4'
				onSubmit={submitHandler}
			>
				<h2 className='text-2xl text-center'>Edit profile</h2>
				<Input
					type='text'
					label='First name:'
					id='firstName'
					onChangeHandler={changeInputHandler}
					value={inputsValues.firstName}
					error={error.firstName}
				/>
				<Input
					type='text'
					label='Last name:'
					id='lastName'
					onChangeHandler={changeInputHandler}
					value={inputsValues.lastName}
					error={error.lastName}
				/>
				<Input
					type='number'
					label='Age:'
					id='age'
					onChangeHandler={changeInputHandler}
					value={inputsValues.age}
					error={error.age}
				/>

				<label className='form-control w-full mb-2'>
					<div className='label'>
						<span className='label-text'>Gender:</span>
					</div>
					<select
						id='gender'
						name='gender'
						className='select select-bordered'
						value={inputsValues.gender}
						onChange={changeInputHandler}
					>
						<option disabled value=''>
							Pick one
						</option>
						<option value='male'>male</option>
						<option value='female'>female</option>
						<option value='others'>others</option>
					</select>
					<p className='text-error text-xs mt-1 ml-2'>
						{error.gender}
					</p>
				</label>

				<Input
					type='text'
					label='Photo URL:'
					id='photoURL'
					onChangeHandler={changeInputHandler}
					value={inputsValues.photoURL}
					error={error.photoURL}
				/>

				<Input
					type='skills'
					label='Skills:'
					id='skills'
					onChangeHandler={changeInputHandler}
					value={inputsValues.skills}
					error={error.skills}
				/>

				<label className='form-control mb-2'>
					<div className='label'>
						<span className='label-text'>About:</span>
					</div>
					<textarea
						className='textarea textarea-bordered h-24'
						value={inputsValues.about}
						onChange={changeInputHandler}
						name='about'
						id='about'
					></textarea>
					<p className='text-error text-xs mt-1 ml-2'>
						{error.about}
					</p>
				</label>

				<p className='text-error text-center my-2 min-h-[24px]'>
					{error.message}
				</p>

				<button
					className='btn btn-primary w-fit mx-auto'
					type='submit'
					disabled={isLoading}
				>
					Save Profile{' '}
					{isLoading && (
						<span className='loading loading-spinner loading-sm'></span>
					)}
				</button>
			</form>
			<section>
				<h3 className='text-2xl text-center mb-2'>Profile Preview</h3>
				<UserCard user={inputsValues} />
			</section>
		</div>
	);
}
