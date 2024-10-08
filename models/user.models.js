import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already taken"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password length should be greadter then 6 character"],
    },
    address: {
        type: String,
        required: [true, "address is required"],
    },
   
    phone: {
        type: String,
        required: [true, "phone no is required"],
    },
    profilePic: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },

    answer: {
        type: String,
        required: [true," answer is required"] 
    },

    role: {
        type: String,
        default: "user",
    }
    
}, { timestamps: true })



// userSchema.pre('save', async function (n) {
//     if(!this.isModified("password")) return next()
//     this.password = await bcryptjs.hash(this.password, 10)
// });

// userSchema.methods.camparePassword = async function () {
//     return await bcryptjs.compare(this.plainPassword, this.password)
    
// }


export const userModel = mongoose.model("User", userSchema);


