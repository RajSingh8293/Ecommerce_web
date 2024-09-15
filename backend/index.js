import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDb from "./db/conn.js";

// import dotenv from "dotenv";
// dotenv.config();
// or
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4501;

const corsOptions = {
  origin: ["http://localhost:5174"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

// routes
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";

app.get("/", (req, res) => {
  res.send("Job Portal Web!");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server connected on port : ", port);
    });
  })
  .catch((error) => {
    console.log("Server Error : ", error);
  });
