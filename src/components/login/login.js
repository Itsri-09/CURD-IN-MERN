import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../login/login.css'

const Login = () => {
  const [input, setInput] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))};

    const handleLogin = (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/cat/login",input)
      .then((res)=>{
        if(res.data){
          console.log(res.data);

          alert("SuccessFully Logged In");
          setInput({password:"",email:""});
          navigate("/table");
          
        }
      })
    };
  return(
    <div className="form_section">
      <p className="heading">Login Page</p>
      <form onSubmit={handleLogin}>
        <div className="l_input">
          <input
            type="mail"
            name="email"
            required
            onChange={handleChange}
          />
          <label>Gmail</label>
        </div>
        <div className="l_input">
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
          <label>Password</label>
        </div>
        <button className="btn_login" type="submit">Login</button>
      </form>
    </div>
  )
};

export default Login;
