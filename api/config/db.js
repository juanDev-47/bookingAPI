import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   };

let connect = () => {
    try {
        mongoose.connect(process.env.MONGO,  () => {
            console.log(`Conected success to ${process.env.MONGO}`);
        });
        } catch (error) {
            console.log(error);
        }
}


export default connect;
