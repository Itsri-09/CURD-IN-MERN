import axios from "axios";
import { useEffect, useState } from "react";
import "../table/table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Table = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    image: "",
  });

  const [addUser, setAddUser] = useState({
    name: "",
    phone: "",
    email: "",
    image: null,
  });

  const fetchallUser = () => {
    axios.get("http://localhost:5000/cat/all").then((res) => {
      if (res.data.newData) {
        console.log(res.data.newData);
        setUser(res.data.newData);
      }
    });
  };

  useEffect(() => {
    fetchallUser();
  }, []);

  const handleEditable = (user) => {
    setSelectedData(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      image: user.image,
    });
    // setAddUser({
    //   name: addUser.name,
    //   phone: addUser.phone,
    //   email: addUser.email,
    //   image: addUser.image,
    // });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // user update
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const updatetoAdd = new FormData();
    updatetoAdd.append("_id", selectedData._id);
    updatetoAdd.append("name", formData.name);
    updatetoAdd.append("phone", formData.phone);
    updatetoAdd.append("email", formData.email);
    if (formData.image instanceof File) {
      updatetoAdd.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/cat/update/uploads",
        updatetoAdd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        fetchallUser();
        alert("Data Updated Successfully");
      }
    } catch (error) {
      console.log("Data is not Update Yet", error);
    }

    // if (selectedData) {
    //   axios
    //     .post(`http://localhost:5000/cat/update/`, formData)
    //     .then((res) => {
    //       console.log("User Updated Successfully", res.data);
    //       fetchallUser();
    //     })
    //     .catch((error) => {
    //       console.log("Error updating user:", error);
    //     });
    // }
  };

  // delete the user
  const handleDeleted = (userId) => {
    axios
      .delete(`http://localhost:5000/cat/delete/${userId}`)
      .then(() => {
        console.log("User Deleted Successfully");
        fetchallUser();
      })
      .catch((error) => {
        console.log("Error deleted user", error);
      });
  };

  // Handle changes for adding new user inputs
  const handleAddChange = (e) => {
    const { name, value, files } = e.target;
    setAddUser({
      ...addUser,
      [name]: files ? files[0] : value,
    });
    console.log("User data being sent:", addUser);
  };

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", addUser.name);
    formDataToSend.append("phone", addUser.phone);
    formDataToSend.append("email", addUser.email);
    if (addUser.image) {
      formDataToSend.append("image", addUser.image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/cat/create", // Remove the colon here
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        alert("Added New User Successfully");
        setAddUser({ name: "", phone: "", email: "", image: null });
        fetchallUser(); // Refresh the user list
      } else {
        console.error("Error occurred while sending data");
        alert("Error During Adding Process");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const imageStyle = {
    height: "150px",
    width: "250px",
    borderRadius: "8px",
    boxShadow: "2px 3px 4px 1px green ",
  };
  return (
    <div id="table_section">
      <h1>Mongodb </h1>
      <p>User Data is Below!</p>
      <div id="table_inner">
        <button
          type="button"
          className="btn btn-warning text-white"
          id="add_btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add User
        </button>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-dark"
                  id="exampleModalLabel"
                >
                  Add New User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body adduser">
                <form>
                  <div className="form_set">
                    <label className="label_sec" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={addUser.name}
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className="form_set">
                    <label className="label_sec" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={addUser.email}
                      onChange={handleAddChange}
                    />
                  </div>
                  <label className="label_sec" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control input_box"
                    id="phone"
                    name="phone"
                    maxLength={10}
                    value={addUser.phone}
                    onChange={handleAddChange}
                  />
                 <div className="add-image"> 
                 <p className="label_sec"> Images</p>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleAddChange}
                  /></div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Back
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={handleAddUser}
                  className="btn btn-success"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Gmail</th>
              <th>Phone</th>
              <th>Images</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {user
              .filter((each) => {
                return search === ""
                  ? each
                  : each.name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                      each.email
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase());
                        
              })
              .map((each, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{each.name}</td>
                  <td>{each.email}</td>
                  <td>{each.phone}</td>
                  <td>
                    {each.image && (
                      <img
                        src={`http://localhost:5000/uploads/${each.image}`}
                        alt="User_Image"
                        style={imageStyle}
                      />
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => handleEditable(each)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleted(each._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Update outside tbody */}
        <div
          className="modal fade "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title text-dark fs-5"
                  id="staticBackdropLabel"
                >
                  Update User:
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body model_bg">
                <form>
                  <div className="form_set">
                    <label className="label_sec" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form_set">
                    <label className="label_sec" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <label className="label_sec" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control input_box"
                    id="phone"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <p className="label_sec"> Images</p>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleInputChange}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Back
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={handleSaveChanges}
                  className="btn btn-success"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
