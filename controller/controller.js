import { Cart, Product, User } from "../modals/Products.js"

import bcrypt from "bcrypt"

// route to get all Productes 
const getProducts = async (req, res) => {

    try {
        const response = await Product.find();
        if (response) {
            res.json({ data: response, message: "successful" }).status(200)
        }
    } catch (err) {
        res.json({ message: "product not found" }).status(500)
    }


}

const addProduct = async (req, res) => {
    try {
        // Assuming the products data is sent in the request body
        const products = await Product.insertMany(req.body.products);

        // Send success response with the added products
        res.status(200).send({
            message: "Products added successfully",
            data: products
        });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).send({
            message: "Request to add products failed",
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {

    try {
        const id = req.params.id
        const response = await Product.findOne({ id: id });
        if (response) {
            res.json({ data: response, message: "Product found", request: "successfull" }).status(200)
        }
    } catch (err) {
        res.json({ message: "unable to found the product" }).status(500)
    }


}

const signup = async (req, res) => {
    const { email, password, confirmPassword, fullName } = req.body;
    console.log(req.body);

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).send({ message: 'Passwords do not match' });
    }

    // Password validation regex: at least one uppercase, one lowercase, one number, one special character, and minimum length of 8
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Validate password against the regex
    if (!passwordRegex.test(password)) {
        return res.status(400).send({
            message: 'Password is not strong enough. '
        });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already in use' });
        }

        // Hash the password using bcrypt
        const bcryptPass = await bcrypt.hash(password, 10);

        // Create a new user with the provided data
        const newUser = new User({
            email,
            password: bcryptPass,
            fullName,
        });

        // Save the user to the database
        const response = await newUser.save();
        console.log('New user created:', req.body);

        // Send success response with the user data
        return res.status(201).send({
            message: 'User successfully registered!',
            data: response,
        });
    } catch (error) {
        console.error('Error while creating user:', error);

        // Send error response
        return res.status(500).send({
            message: 'Error registering user. Please try again later.',
            error: error.message,
        });
    }
};






const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // If the user is not found, return an "Email not registered" message
            return res.status(400).send({ message: 'Email not registered' });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (isMatch) {
            // If the password matches
            return res.status(200).send({
                message: 'Login successful!',
                user,
                status: "success",
                redirectTo: '/'
            });
        } else {
            // If the password doesn't match
            return res.status(200).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ message: 'Server error' });
    }
};







const addToCartProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Cart.findById({ id }, { $set: { data: req.body } }, { upsert: true, new: true })

    } catch (error) {

    }
}


export default getProducts
export { getProductById, addProduct, addToCartProduct, signup ,login}


