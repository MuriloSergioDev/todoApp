import { Schema, Document} from 'mongoose';
import connectionDb from '../connection';

interface UserInterface extends Document{
    username: string,
    password: string
}

const UserSchema = new Schema({
    username: String,
    password: String
},{
    timestamps: true
});

const User = connectionDb.model<UserInterface>('User', UserSchema);

export default User;