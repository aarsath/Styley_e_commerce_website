const db = require("../models");
const User = db.user;
const firebase = require('firebase-admin');

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password || !req.body.phone_number) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const email = String(req.body.email).toLowerCase();
  const isAdmin = email === 'admin@gmail.com' || String(req.body.isAdmin) === 'true';

  try {
    await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: false,
      disabled: false,
      displayName: req.body.name
    })
    .then((userCredential) => {
      const user = new User({
        name: userCredential.displayName,
        email: userCredential.email,
        phone_number: req.body.phone_number,
        address: req.body.address,
        uid: userCredential.uid,
        isAdmin
      });
      user
      .save(user)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
    })
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
};

exports.validateUser = async(req, res) => {
  try {
    const { uid, email, displayName, phoneNumber } = req.body || {};

    if (!uid || !email) {
      return res.status(400).send({ message: "UID and email are required." });
    }

    const normalizedEmail = String(email).toLowerCase();
    const isAdminUser = normalizedEmail === 'admin@gmail.com';

    let user = await User.findOne({
      $or: [
        { uid: uid },
        { email: normalizedEmail }
      ]
    });

    if (!user) {
      user = new User({
        name: displayName || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        phone_number: phoneNumber || "",
        address: "",
        uid,
        isAdmin: isAdminUser
      });

      await user.save();
    } else if (isAdminUser && !user.isAdmin) {
      user.isAdmin = true;
      await user.save();
    }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while fetching the User."
    });
  }
}

exports.fetchAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
        message:
          err.message || "Some error occurred while fetching the User."
    });
  }
}

exports.vaidateToken = async (req, res) => {
  try {
    const decodedToken = await firebase.auth().verifyIdToken(req.body.authToken);
    res.status(200).send(decodedToken);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while fetching the User."
  });
  }
}