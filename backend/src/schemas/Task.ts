import { Schema, Document} from 'mongoose';
import connectionDb from '../connection';

interface TaskInterface extends Document{
    title: string,
    status: string,
    deadline: string,
    description: string,
    checklist: Array<string>
}

const TaskSchema = new Schema({
    title: {
        type :String,
        required : [true, 'Title cannot be null']
    },
    status: {
        type :String,
        required : [true, 'Status cannot be null']
    },
    deadline: {
        type :String,
        required : [true, 'Deadline cannot be null']
    },
    description: String,
    checklist: Array
},{
    timestamps: true
});

const Task = connectionDb.model<TaskInterface>('Task', TaskSchema);

export default Task;