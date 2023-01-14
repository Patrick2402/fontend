import { useState, useEffect} from 'react';


export default function Login() {



    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
   const [isLog, setIsLog] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/login_req', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
            alert('Invalid credentials')
            setFormData({username:'',password: ''})
            throw new Error('Invalid credentials');
        }
        const json = await res.json();
        console.log(json)
        document.cookie = "loggedIn=true; expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/";
        setIsLog(true);
    };
    const handleLogout = () => {
        document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        setIsLog(false);
      };

      useEffect(() => {
        const cookies = document.cookie;
        if (cookies.includes("loggedIn=true")) {
          setIsLog(true);
        }
      }, []);
    
    

    
    

    return (
       <div> 
        {!isLog &&  <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Your email</span>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />                </label>
                <label>
                    <span>Your password</span>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />                </label>
                <button type='submit'>Login</button>
            </form>
        </div>}
        {isLog && <button onClick={handleLogout}>Logout</button>}
       </div>
    )
}



 