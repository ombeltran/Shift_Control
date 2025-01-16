import React, { useState, useContext } from 'react';
import { UserContext } from "../context/UserProvider";
import { Card } from '../components/Card';
import { Botton } from '../components/Botton';
import { postValidatePassword, putUpdatePassword } from '../api/api.routes.users';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los iconos de ojo

const Login = () => {
    const [fieldPassword, setFieldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { setloginUser } = useContext(UserContext);

    const alert = useAlert();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const handleClick = () => {
        setFieldPassword(!fieldPassword);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const onSubmit = async (data) => {
        try {
            const response = await postValidatePassword(data);
            if (response.status === 'Successfully login' && !fieldPassword) {
                setloginUser(data.username);
                navigate('/employees');
            } else if (fieldPassword && response.status === 'Successfully login') {
                await putUpdatePassword(data.username, data);
                alert.success('Password update successful!');
                setTimeout(() => {
                    navigate('/employees');
                }, 2000);
            }
        } catch (error) {
            console.error('Error validating password:', error);
        }
    };

    return (
        <div className='flex justify-center items-center w-full h-screen '>
            <Card className={`flex w-[300px] ${fieldPassword ? 'h-[360px]' : 'h-[320px]'}`}>
                <div>
                    {!fieldPassword ? <h1 className='text-3xl text-center mb-4 font-bold'>Login</h1> : <h1 className='text-3xl text-center mb-4 font-bold'>Updating</h1>}

                    <form className='flex flex-col w-64 gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col font-bold relative'>
                            <label htmlFor='username'>User</label>
                            <input type='text' name='username' className='rounded-lg px-2 text-black' {...register('username')} required autoComplete="username"/>
                        </div>

                        <div className='flex flex-col font-bold relative'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                className='rounded-lg px-2 text-black pr-10'
                                {...register('password')}
                                required
                                autoComplete="new-password"
                            />
                            <div className='absolute top-7 right-2 cursor-pointer text-black' onClick={handleShowPassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>

                        <div className={`flex flex-col font-bold relative ${fieldPassword ? 'block' : 'hidden'}`}>
                            <label htmlFor='password'>New password</label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                name='newPassword'
                                className='rounded-lg px-2 text-black' {...register('newPassword')} min={8}
                                autoComplete="new-password"
                            />
                            <div className='absolute top-7 right-2 cursor-pointer text-black' onClick={handleShowNewPassword}>
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>

                        <Botton className={`flex items-center justify-center w-20 h-8 ${fieldPassword ? 'hidden' : 'block'}`}>Enter</Botton>

                        <div className='flex justify-end gap-2'>
                            <label htmlFor='checkNewPassword'>Update password?</label>
                            <input type='checkbox' name='checkNewPassword' onClick={handleClick} />
                        </div>

                        <Botton className={`flex items-center justify-center w-20 h-8 ${fieldPassword ? 'block' : 'hidden'}`}>Update</Botton>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default Login;
