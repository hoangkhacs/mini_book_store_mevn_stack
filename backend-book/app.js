const express = require("express")
const cors = require("cors")
const appRouter = require("./app/routes/route")
const ApiError = require("./app/api-error")
const contactsRouter = require("./app/routes/route")

const app = express()

app.use(cors());
app.use(express.json({ limit: '50mb' }));
// app.use(express.bodyParser({ limit: '50mb' }))

app.get("/", (req, res) => {
    res.json({
        message: "Welcome!"
    });
});

app.use("/api/shop", contactsRouter);

//Xu ly loi
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"))
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    })
})
module.exports = app;