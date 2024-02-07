import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const VerifyPhone = () => {
	const [otpOptions, setOtpOptions] = useState({
		step: 1,
		phone: '',
		retryCount: 0,
		message: '',
		otp: ''
	});

	const validatePhoneNumber = (phoneNumber) => {
		var phonePattern = /^\d{10}$/;
		return phonePattern.test(phoneNumber);
	}

	const handleCheckNumber = () => {
		if (!validatePhoneNumber(otpOptions.phone)) {
			setOtpOptions({ ...otpOptions, message: 'Enter a valid phone number.', phone: '' });
			return;
		}
		axios.post(`${process.env.API_URL}/otp/send`, { phone: otpOptions.phone }).then(res => {
			console.log(res);
			setOtpOptions(pr => ({
				...pr,
				step: 2,
				otp: '',
				message: res.data.message
			}));
		}).catch(err => {
			console.log(err);
			setOtpOptions(pr => ({
				...pr,
				otp: '',
				message: err.message
			}));
		});
		
	}

	const handleVerifyOTP = () => {
		if (otpOptions.otp.length != 6) {
			setOtpOptions(prevState => ({
				...prevState,
				message: "Put a valid otp"
			}));
			return;
		}
		axios.post(`${process.env.API_URL}/otp/verify`, {
			phone: otpOptions.phone,
			otp: otpOptions.otp
		}).then(res => {
			console.log(res);
			setOtpOptions(prevState => ({
				...prevState,
				step: 3,
				message: res.data.message,
			}));
			storeToken(res.data.token);
		}).catch(err => {
			console.log(err);
			setOtpOptions(prevState => ({
				...prevState,
				retryCount: prevState.retryCount + 1,
				otp: '',
				message: err.message
			}));
		});
	};

	const storeToken=(_t)=>{
		Cookies.set('token', _t);
	}

	useEffect(() => {
		if (otpOptions.message) {
			const timeoutId = setTimeout(() => {
				setOtpOptions(pr => ({ ...pr, message: '' }));
			}, 5000);
			return () => clearTimeout(timeoutId);
		}
	}, [otpOptions.message]);

	useEffect(() => {
		if (otpOptions.step == 3) {
			const timeoutId = setTimeout(() => {
				location.reload();
			}, 2000);
			return () => clearTimeout(timeoutId);
		}
	}, [otpOptions.step])



	return (
		<div className='min-h-[80vh] flex justify-center items-center mx-2'>
			<div className='w-full md:max-w-[400px]'>
				{otpOptions.step == 1 &&
					<div className="sign">
						<h3 className='text-2xl font-semibold text-slate-600'>Sign in / Sign up</h3>
						<p className="text-xs text-slate-500">
							Sign up or Sign in to access your orders, special offers, health tips and more!
						</p>
						<div className="flex flex-col gap-4 my-6">
							<label className='text-xs uppercase text-teal-700 font-bold' htmlFor="number">Phone Number</label>

							<div className="flex items-center border-b border-gray-300 px-4 py-2">
								<span className="mr-2">+91</span>
								<input
									type="text"
									className='w-full focus:outline-none'
									value={otpOptions.phone}
									onChange={(e) => setOtpOptions({ ...otpOptions, phone: e.target.value, message: '' })}
								/>
							</div>

							{otpOptions.message && (
								<p className="text-xs text-red-500">
									{otpOptions.message}
								</p>
							)}
							<button
								className="bg-teal-700 text-white py-2"
								onClick={handleCheckNumber}
							>
								Send OTP
							</button>
						</div>
					</div>
				}
				{otpOptions.step == 2 &&
					<div className="sign">
						<h3 className='text-2xl font-semibold text-slate-600'>Verify OTP</h3>
						<p className="text-xs text-slate-500">
							Please enter the 6-digit OTP which we have sent to <span className='text-red-700'>{otpOptions.phone}</span>.
						</p>
						<span className="text-xs my-4">Have not recieved OTP ? 
							<button onClick={()=>setOtpOptions({...otpOptions, step:1})} className="umderline text-blue-800 font-bold">Retry</button> 
						</span>
						<div className="flex flex-col gap-4 my-6">
							<label className='text-xs uppercase text-teal-700 font-bold' htmlFor="otp">One Time Password</label>

							<div className="flex items-center border-b border-gray-300 px-4 py-2">
								<input
									type="text"
									className='w-full text-center focus:outline-none'
									value={otpOptions.otp}
									onChange={(e) => setOtpOptions({ ...otpOptions, otp: e.target.value, message: '' })}
								/>
							</div>

							{otpOptions.message && (
								<p className="text-xs text-red-500">
									{otpOptions.message}
								</p>
							)}
							<button
								className="bg-teal-700 text-white py-2"
								onClick={handleVerifyOTP}
							>
								Verify
							</button>
						</div>
					</div>
				}

				{otpOptions.step == 3 &&
					<div className="sign">
						<h3 className='text-xl text-center font-semibold text-slate-600'>Account is verified</h3>
					</div>
				}

				<div className="footer text-center mt-6">
					<span className='text-xs mx-6 font-bold text-slate-400'>&copy;2024</span>
					<p className="text-xs mx-6 ">
						By continuing you agree to our
						<a className='text-orange-600 pl-1 underline' href="#">Terms of service</a> and
						<a className='text-orange-600 pl-1 underline' href="#">Privacy policy.</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default VerifyPhone