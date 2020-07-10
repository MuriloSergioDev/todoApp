import { Schema, Document} from 'mongoose';
import connectionDb from '../connection';

interface UserInterface extends Document{
    username: string,
    password: string
}

const UserSchema = new Schema({
    username: {
        type : String,
        minlength:[2, 'Username must have at least 2 chacteres'],
        required : [true, 'Username cannot be null']
    },
    password: {
        type: String,
        minlength:[5, 'Password must have at least 5 chacteres'],
        required : [true, 'Password cannot be null']
    }
},{
    timestamps: true
});

const User = connectionDb.model<UserInterface>('User', UserSchema);

export default User;