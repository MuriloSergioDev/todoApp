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
    title: String,
    status: String,
    deadline: String,
    description: String,
    checklist: Array
},{
    timestamps: true
});

const Task = connectionDb.model<TaskInterface>('Task', TaskSchema);

export default Task;