import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../register/register.css";

const Register = () => {
  const navigate = useNavigate();
 const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: null,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value || "" })); // Ensure value is always a string
  };

  const handleChangeImage = (e) => {
    setInput((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("phone", input.phone);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("image", input.image);

    try {
      const res = await axios.post("http://localhost:5000/cat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        alert("Registered Successfully");
        setInput({ name: "", email: "", password: "", phone: "", image: null }); // Reset form
        navigate("/login");
      } else {
        console.error("Error occurred while sending data");
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="form_section">
      <form onSubmit={handleSubmit}>
        <div className="l_input">
          <input
            type="text"
            name="name"
            value={input.name}
            required
            onChange={handleChange}
          />
          <label>Username</label>
        </div>
        <div className="l_input">
          <input
            type="email" // Use "email" instead of "mail"
            name="email"
            value={input.email}
            required
            onChange={handleChange}
          />
          <label>Email</label>
        </div>
        <div className="l_input">
          <input
            type="password"
            name="password"
            value={input.password}
            required
            onChange={handleChange}
          />
          <label>Password</label>
        </div>
        <div className="l_input">
          <input
            type="text"
            name="phone"
            required
            value={input.phone}
            maxLength={10}
            onChange={handleChange}
          />
          <label>Phone</label>
        </div>
        <div>
          <p  style={{ textAlign: "left" }}>Image</p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleChangeImage} 
          />
        </div>
        <button className="btn_Submit" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
