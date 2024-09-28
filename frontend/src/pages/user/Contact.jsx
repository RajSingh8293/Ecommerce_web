/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Layout from '../../components/Layout';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = {
            access_key: "935e65c2-9a4a-4e45-886b-5d8c9b4e5e38",
            name: data.name,
            email: data.email,
            message: data.message,
        }

        try {
            const { data } = await axios.post('https://api.web3forms.com/submit', userInfo)
            if (data) {
                toast.success("Message sent successfull")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <Layout>
            <section className='lg:px-10 px-5 py-20'>
                <div className='min-h-[200px] bg-blue-300 flex justify-center items-center'>
                    <h1 className='text-[tomato] heading'>#contact us</h1>

                </div>

                <div className="contact-container mt-5">
                    <h2 className='heading'>Contact Us</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className='input'
                                id="name"
                                name="name"
                                // value={formData.name}
                                // onChange={handleChange}
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-xs text-red-600">Name field is required</span>}
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className='input'
                                name="email"
                                // value={formData.email}
                                // onChange={handleChange}
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-xs text-red-600">Email field is required</span>}
                        </div>
                        <div>
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                className='input'
                                // value={formData.message}
                                // onChange={handleChange}
                                {...register("message", { required: true })}
                            />
                            {errors.message && <span className="text-xs text-red-600">Message field is required</span>}
                        </div>
                        <button type="submit" className='btn_2'>Submit</button>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
