import mongoose, { Schema } from "mongoose";



const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true,
    validate: {
      validator: function(value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value); // Simple email validation
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: { 
    type: String, 
    required: true 
  },
  fullName: { 
    type: String, 
    required: true 
  },
  // Removed phoneNumber and address as per the request
  cart: { 
    type: Schema.Types.ObjectId, 
    ref: 'Cart' 
  }, // Reference to Cart model
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});



const User = mongoose.model('User', userSchema);


// Product schema
const ProductSchema = new Schema({
    id: { type: Number, required: true, unique: true }, // Ensure 'id' is unique
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true }, // Added color field
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    brand: { type: String, required: true },
    ratings: { type: Number, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Product = mongoose.model("Product", ProductSchema);

// Cart schema
const cartSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Reference to User model
    required: true 
  },
  items: [{
    productId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product', // Reference to the Product model
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      default: 1 
    },
    price: { 
      type: Number, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Cart = mongoose.model('Cart', cartSchema);

// Address schema
const addressSchema = new Schema({
    fName: {
        type: String,
        required: true,
        trim: true
    },
    lName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  // Regular expression for 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    locality: {
        type: String,
        trim: true
    },
    zipcode: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /\d{5,6}/.test(v);  // Regular expression for 5 or 6 digit postal code
            },
            message: props => `${props.value} is not a valid zipcode!`
        }
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    }
});

const Address = mongoose.model('Address', addressSchema);

export { Cart, Product, Address, User };
