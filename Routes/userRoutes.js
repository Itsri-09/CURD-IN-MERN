const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const hari = require("../Models/userSchema");

// config for multer for multiple image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//post for images

router.post("/", upload.single("image"), async (req, res) => {
  const { name, password, phone, email } = req.body;

  if (!req.body) {
    res.status(200).json({ message: "No file uploads" });
  }

  try {
    const newUser = new hari({
      name: name,
      password: password,
      phone: phone,
      email: email,
      image: req.file.filename,
    });

    await newUser.save();
    res.status(200).json({ message: "Success", newUser });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error", error });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;
//     const newuser = new user({ name, email, password, phone });
//     await newuser.save();
//     res.status(200).json({
//       message: "successfully Inserted",
//       user: newuser,
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    const checkUser = await hari.find({ email });

    res.status(200).json({ message: "user found", checkUser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "user not found" });
  }
});

router.get("/all", async (req, res) => {
  const newData = await hari.find();

  res.status(200).json({ message: "successfully fetched", newData });
});

// // for Update a data
router.post("/update", upload.single("image"), async (req, res) => {
  try {
    const { _id, name, phone, email } = req.body; // Retrieve fields from request body
    const Img = req.file ? req.file.filename : req.body.image; // Use req.body.image as fallback if no file uploaded

    // Update user data
    const imageUpdate = await hari.findByIdAndUpdate(
      _id,
      { name, phone, email, image: Img },
      { new: true }
    );

    // Check if the update was successful
    if (imageUpdate) {
      res
        .status(200)
        .json({ message: "Image Updated Successfully", user: imageUpdate });
    } else {
      res.status(400).json({ message: "Failed To Update" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

//update the images

router.post("/update/uploads", upload.single("image"), async (req, res) => {
  //   const { id } = req.params;

  try {
    console.log("Request Body:", req.body);
  console.log("File:", req.file);
  const { _id, name, phone, email } = req.body;
  const Img = req.file ? req.file.filename : req.body.image;
  const imageUpdate = await hari.findByIdAndUpdate(
    _id,
    { name, phone, email, image: Img },
    {
      new: true,
    }
  );
  if (imageUpdate) {
    res.status(200).json({ message: "Image UptoDate" });
  } else {
    res.status(400).json({ message: "Failed To Update" });
  }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

// Create a new user
router.post("/create", upload.single("image"), async (req, res) => {
  const { name, password, phone, email } = req.body;

  const newUser = {
    name,
    phone,
    password,
    email,
  };

  if (req.file) {
    newUser.image = req.file.filename; // Save the filename to the database
  }

  try {
    const createdUser = await hari.create(newUser); // Create the user in the database
    return res
      .status(201)
      .json({ message: "User added successfully", user: createdUser });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error occurred while adding user", error });
  }
});

// // for delete a data from db

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await hari.findByIdAndDelete(id);
    if (User) {
      res.status(200).json({ message: "Deleted SuccessFully!" });
    } else {
      res.status(400).json({ message: "Not Found" });
    }
  } catch (error) {
    console.log("Error Deleting user:", error);
    res.status(400).json({ message: "Error Deleting user ", error });
  }
});

// add new user

// router.post("/create",upload.single('image'),async (req,res)=>{
//     const {name,phone,email} = req.body;

//     if (!req.body) {
//         res.status(200).json({ message: "No file uploads" });
//       }

//     try {
//         const image = req.file?req.file.filename:null;

//         const newUser = new hari({
//             name : name,
//             email : email,
//             phone : phone,
//             image :req.file?req.file.filename:null,
//         });

//         await newUser.save();
//         res.status(201).json({message:"Created successFully"})
//     } catch (error) {
//         res.status(400).json({message:"Not Created ",error})
//     }
// })

module.exports = router;
