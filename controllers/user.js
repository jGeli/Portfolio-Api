import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Content from "../models/Content.js";
import { defaultContent } from "../utils/commonData.js";

// @desc    Register new User
// @route   POST /api/v1/users
// @access  Public
export const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error("Field is required")
    }

    // Check if user exist
    const user = await User.findOne({email})

    if(user) {
        res.status(400)
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    


    // Create User
    const newUser = await User.create({
        email,
        password: hashedPassword,
        username: req.body.username
    });

    
    let profile = await Profile.create({
        ...req.body
    });



    let defaultContents = await Content.insertMany(defaultContent);
    let arrContents = defaultContents.map(a => { return a._id})
    newUser.contents = arrContents;
    newUser.profile = profile;
    newUser.save();

    if(newUser) {
        res.status(201).json({
            ...newUser._doc,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});

// @desc    Authenticate a User
// @route   POST /api/v1/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
    const { email, password} = req.body

    // Check for user email
    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})

// @desc    Get User data
// @route   GET /api/v1/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate([{
        path: 'contents',
        match: { isDeleted: false },
        populate: [
          {
            path: 'contents',
            match: { isDeleted: false }
          },
        ],
      }, {
        path: 'profile'
      }])

    res.status(200).json({
        ...user._doc
    })
})

// @desc    Update User Profile by id
// @route   POST /api/v1/users/profile/:id
// @access  Private
export const createProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate([{
        path: 'contents',
        match: { isDeleted: false },
        populate: [
          {
            path: 'contents',
            match: { isDeleted: false }
          },
        ],
      }, {
        path: 'profile'
      }])

    if(!user) {
        res.status(400)
        return next(new Error(`User with id of ${req.params.id} doesnt exist.`))
    }


        
    console.log(newObj)


    console.log(user)
    console.log("EXIST")
    res.json({ message: "Profile Created"})
});



// @desc    Update User Profile by id
// @route   POST /api/v1/users/profile/:id
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
    let id = req.user.profile;
    console.log(id)
    const doc = await Profile.findOneAndUpdate({
        _id: id
    }, req.body, { upsert: true, useFindAndModify: false });

    if(!doc) {
        res.status(400)
        return next(new Error(`User with id of ${req.params.id} doesnt exist.`))
    }

    res.json({ message: "Profile updated"})
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
}