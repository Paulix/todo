const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected");
    } catch (err) {
        console.log("something went wrong");
    }
};

module.exports = connect;
