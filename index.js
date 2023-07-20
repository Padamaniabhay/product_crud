const express = require("express")
require("dotenv").config();

const connectDB = require("./Utils/connection");
const { userRoutes } = require("./Routes/user.routes");
const { productRoutes } = require("./Routes/product.routes");

const app = express();


// middleware
app.use(express.json());

app.use("/user", userRoutes)
app.use("/product", productRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

app.listen(process.env.PORT, async () => {
    try {
        await connectDB();
        console.log("Server is Up and Running");

    } catch (error) {
        console.log("DB connection Failed ");
    }
})