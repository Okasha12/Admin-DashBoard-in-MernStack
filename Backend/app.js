import  express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import adminRouter from"./src/routes/admin.routes.js"
import productRouter from"./src/routes/product.routes.js"

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())



 app.use("/api/v1/product", productRouter)
app.use("/api/v1/admin", adminRouter)

export {app}