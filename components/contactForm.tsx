import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
// import { Alert } from 'react-bootstrap'
// import DatePicker from 'react-datepicker'

// let renderCount = 0

type FormValues = {
	name: string
	email: string
	phone: string
	message: string
}

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			name: 'Steve',
			email: 'steve@mcqueen.com',
			phone: '7776665432',
			message: `SG Flying V Les Paul`,
		},
	})

	const [submitting, setSubmitting] = useState<boolean>(false)

	const onSubmit = async (formData) => {
		// setSubmitting(true)

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					message: formData.message,
					// token,
				}),
			})

			if (response.status === 200) {
				console.log('Success')
			}
			// const data = await response.json()
		} catch (error) {
			console.log(error)
		}

		// console.log('data: ', data)

		// setSubmitting(false)
	}

	return (
		<>
			<h2>Send us a message</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Name:</label>
				<input id="name" {...register('name', { required: 'Name is required.' })} />
				{errors.name && <p>{errors.name.message}</p>}

				<label htmlFor="email">Email:</label>
				<input
					id="email"
					{...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
				/>
				{errors.email && <p>{errors.email.message}</p>}

				<label htmlFor="phone">Phone:</label>
				<input
					id="phone"
					{...register('phone', {
						required: 'Phone number is required',
						minLength: 6,
						maxLength: 12,
					})}
				/>
				{errors.phone && <p>{errors.phone.message}</p>}

				<label htmlFor="message">Message:</label>
				<textarea
					id="message"
					// ref={register}
					{...register('message', {
						required: 'Message is required.',
						maxLength: 1000,
					})}
				/>
				{errors.message && errors.message.type === 'required' && <p>Message is required</p>}
				{errors.message && errors.message.type === 'maxLength' && (
					<p>Max length exceeded</p>
				)}
				<input type="submit" disabled={submitting} />
			</form>
		</>
	)
	// // const { register, handleSubmit, errors } = useForm()

	// // const onSubmit = (data) => {
	// // 	console.log(JSON.stringify(data))
	// // }

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm<FormValues>()

	// const onSubmit = (data: FormValues) => {
	// 	console.log(JSON.stringify(data))
	// }

	// return (
	// 	<>
	// 		<form onSubmit={handleSubmit(onSubmit)}>
	// 			<div className="form-group">
	// 				<label htmlFor="name">Name</label>
	// 				<input
	// 					// ref={register({
	// 					// 	required: true,
	// 					// })}
	// 					name="name"
	// 					type="text"
	// 					className="form-control"
	// 					id="name"
	// 					{...register('name', { required: 'This is required.' })}
	// 				/>
	// 				{/* {errors.name && (
	// 					<Alert variant="danger">
	// 						{errors.name?.type === 'required' && <p>Name is required</p>}
	// 					</Alert>
	// 				)} */}
	// 			</div>

	// 			{/* <div>
	// 				<label htmlFor="email">Email</label>
	// 				<input
	// 					// ref={register({ required: true })}
	// 					name="email"
	// 					type="text"
	// 					className="form-control"
	// 					placeholder="Email"
	// 					id="email"
	// 					{...register('email', { required: true, pattern: /^\S+@\S+$/i })}
	// 				/>
	// 			</div> */}

	// 			{/* <div className="form-group">
	// 				<label htmlFor="phone">Phone</label>
	// 				<input
	// 					ref={register({ required: true })}
	// 					name="phone"
	// 					type="text"
	// 					className="form-control"
	// 					id="phone"
	// 				/>
	// 			</div> */}

	// 			{/* <div className="form-group">
	// 				<label htmlFor="message">message</label>
	// 				<textarea name="message" id="message" ref={register} />
	// 			</div> */}
	// 			<button type="submit" className="btn btn-primary">
	// 				Create
	// 			</button>
	// 		</form>
	// 	</>
	// )
}
