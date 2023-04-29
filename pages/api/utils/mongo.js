import mongoose from 'mongoose';

const connectMongo = async (req, res) => {
    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Server");
    } catch (error) {
        console.log("MongoDB Error: "+error);
        process.exit(1);
    }
}

module.exports = connectMongo;