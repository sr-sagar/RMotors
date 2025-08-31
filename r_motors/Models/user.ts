import mongoose,{ Document,Schema,Model} from "mongoose";
interface IUser extends Document {
    userName: string,
    userEmail: string,
    userPassword: string,
    userPhoneNumber: string,
}
const UserSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userPhoneNumber: {
        type: String,
        required: true,
    },
    
},{timestamps: true})


const UserModel:Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;