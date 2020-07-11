import { Schema, Document } from 'mongoose';
import connectionDb from '../connection';

interface UserInterface extends Document {
    username: string,
    password: string
}

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: [2, 'Username must have at least 2 chacteres'],
        required: [true, 'Username cannot be null'],
        unique:true,
        trim: true,
    },
    password: {
        type: String,
        minlength: [5, 'Password must have at least 5 chacteres'],
        required: [true, 'Password cannot be null'],
        trim: true
    }
}, {
    timestamps: true
});

const User = connectionDb.model<UserInterface>('User', UserSchema);

const validateUniqueUsername = function (value: any, callback: Function) {
    User.find({ username: value }, function (err, user) {
        callback(err || user.length === 0);
    });
};

const teste =  async function (value: string) {
                
    const isUsernameDuplicate = await  User.find({ username: value })

    console.log(isUsernameDuplicate[0] !== undefined);
    if (isUsernameDuplicate[0] !== undefined) {
        console.log('1')
        return(false)
    }
    console.log('2')
    return(true)
}

export default User;