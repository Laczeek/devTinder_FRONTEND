import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import Input from '../components/forms/Input';
import authContext from '../contexts/auth';
import useFetch from '../hooks/useFetch';
import toastContext from '../contexts/toast';

const initialState = {
	email: '',
	firstName: '',
	lastName: '',
	password: '',
};

export default function LoginPage() {
	const [inputsValues, setInputsValues] = useState(initialState);
	const [isLoginForm, setIsLoginForm] = useState(true);
	const authCTX = useContext(authContext);
	const toastCTX = useContext(toastContext);

	const navigate = useNavigate();
	const { sendRequest, isLoading, error } = useFetch();

	const toggleForm = () => {
		setIsLoginForm((prevState) => !prevState);
		setInputsValues(initialState);
	};

	const inputChangeHandler = (event) => {
		const { name, value } = event.target;
		setInputsValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		try {
			const data = await sendRequest(
				`/auth/${isLoginForm ? 'login' : 'signup'}`,
				{
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(inputsValues),
				}
			);

			authCTX.login(data.user);
			if (!isLoginForm) {
				toastCTX.showToast(
					'Account created successfully! Please update your profile.',
					'success'
				);

				return navigate('/profile');
			}

			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<section className='mt-10'>
				<form
					className='card bg-base-300 max-w-[600px] mx-auto p-4'
					onSubmit={submitHandler}
				>
					<h2 className='text-2xl text-center'>
						{isLoginForm ? 'Login' : 'Create account'}
					</h2>
					<Input
						type='email'
						label='Enter email:'
						id='email'
						value={inputsValues.email}
						onChangeHandler={inputChangeHandler}
						error={error.email}
					/>

					{!isLoginForm && (
						<>
							<Input
								type='text'
								label='Enter first name:'
								id='firstName'
								value={inputsValues.firstName}
								onChangeHandler={inputChangeHandler}
								error={error.firstName}
							/>
							<Input
								type='text'
								label='Enter last name:'
								id='lastName'
								value={inputsValues.lastName}
								onChangeHandler={inputChangeHandler}
								error={error.lastName}
							/>
						</>
					)}

					<Input
						type='password'
						label='Enter password:'
						id='password'
						value={inputsValues.password}
						onChangeHandler={inputChangeHandler}
						error={error.password}
					/>

					<p className='text-error text-center my-2 min-h-[24px]'>
						{error.message}
					</p>

					<button
						className='btn btn-primary w-fit mx-auto'
						type='submit'
						disabled={isLoading}
					>
						{isLoginForm ? 'Login' : 'Create account'}
						{isLoading && (
							<span className='loading loading-spinner loading-sm'></span>
						)}
					</button>
				</form>
			</section>
			<section className='text-center mt-6'>
				<h2 className='mb-2'>Don&apos;t have an account yet?</h2>
				<button
					className='btn btn-outline btn-accent'
					onClick={toggleForm}
				>
					{isLoginForm ? 'Create account' : 'Login'}
				</button>
			</section>
		</>
	);
}
