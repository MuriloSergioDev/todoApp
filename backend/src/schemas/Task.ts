import { Schema, Document} from 'mongoose';
import connectionDb from '../connection';

interface TaskInterface extends Document{
    title: string,
    status: string,
    deadline: string,
    userId: string,
    description: string,
    checklist: Array<string>
}

const TaskSchema = new Schema({
    title: {
        type :String,
        maxlength:[21, 'Title cannot have more than 21 characteres'],
        required : [true, 'Title cannot be null']
    },
    status: {
        type :String,
        required : [true, 'Status cannot be null'],
        enum: ['Undone', 'Done', 'Doing', 'Paused']
    },
    deadline: {
        type :String,
        required : [true, 'Deadline cannot be null']
    },
    userId: {
        type :String,
        required : [true, 'UserId cannot be null']
    },
    description: {
        type :String,
        required : [true, 'description cannot be null']
    },
    checklist: Array
},{
    timestamps: true
});

const Task = connectionDb.model<TaskInterface>('Task', TaskSchema);

export default Task;