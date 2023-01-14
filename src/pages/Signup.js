import { useState} from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/sign', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        }) 
        
    };


    return (
        <div className="signup">
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Your email</span>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="username"
                    />                </label>
                <label>
                    <span>Your password</span>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                    />                </label>
                {/* <label>
                    <span>Retype password</span>
                    <input
                        type="password"
                        name="repassword"
                        value={formData.repassword}
                        onChange={handleChange}
                        placeholder="Password"
                    />                </label> */}
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}