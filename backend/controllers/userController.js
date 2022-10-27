const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill out all required fields')
  }
  if (password.length < 4) {
    res.status(400)
    throw new Error('Password must be at least 4 characters')
  }
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Email has already been registered')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  const token = generateToken(user._id)

  // send http-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expiresIn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: 'none',
  })

  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please fill out all required fields')
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('User not found, please register')
  }

  const passwordIsValid = await bcrypt.compare(password, user.password)

  const token = generateToken(user._id)

  // send http-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: 'none',
  })

  if (user && passwordIsValid) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
})

const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: 'none',
  })

  return res.status(200).json({
    message: 'Logged out',
  })
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// get logged in status

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json(false)
  }

  // verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  if (verified) {
    return res.json(true)
  }
  return res.json(false)
})

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
}
