import { useState } from 'react';
import Layout from '../../components/Layout';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can add form validation logic
        if (!formData.name || !formData.email || !formData.message) {
            setError('All fields are required.');
            return;
        }
        // Simulate form submission
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setError('');
        // Reset form
        setFormData({ name: '', email: '', message: '' });
    };

    return (

        <Layout>
            <section className='lg:px-10 px-5 py-20'>
                <div className='min-h-[200px] bg-blue-300 flex justify-center items-center'>
                    <h1 className='text-[tomato] heading'>#contact us</h1>

                </div>

                <div className="contact-container mt-5">
                    <h2 className='heading'>Contact Us</h2>
                    {submitted && <p>Thank you for your message!</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className='input'
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className='input'
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                className='input'
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className='btn_2'>Submit</button>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
