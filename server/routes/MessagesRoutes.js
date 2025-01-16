import {Router} from "express";
import { getMessage, uploadFile } from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
const messageRoutes = Router();
const upload = multer({dest:"uploads/files/"});
messageRoutes.post("/get-messages",verifyToken,getMessage);
messageRoutes.post("/upload-file",verifyToken,upload.single("file"),uploadFile)
export default messageRoutes;