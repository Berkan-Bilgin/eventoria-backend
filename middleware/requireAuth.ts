import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";

declare module "express" {
  export interface Request {
    user?: any; // user özelliğini 'any' olarak tanımlıyoruz.
  }
}

// 'req', 'res' ve 'next' parametrelerini tiplemek için Express'in yerleşik tiplerini kullanıyoruz.
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1]; // "Bearer" şemasını varsayıyoruz.

  try {
    // 'jwt.verify' bir string veya JwtPayload dönebilir, bu yüzden sonucu doğru tipe zorlamalıyız.
    const decoded = jwt.verify(token, process.env.SECRET!) as
      | JwtPayload
      | string;

    // 'decoded' bir nesne ve içinde '_id' varsa, devam ediyoruz.
    if (typeof decoded === "object" && "_id" in decoded) {
      const { _id } = decoded;
      req.user = await User.findOne({ _id }).select("_id");

      next(); // Her şey yolundaysa, sonraki middleware'e geç.
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error(error); // Hataları loglamak için 'console.error' kullanmak daha uygun olabilir.
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
