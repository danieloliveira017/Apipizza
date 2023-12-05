import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";

import { router } from "./routes";


const app = express();

app.use(express.json());


app.use(router);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
app.use(cors);

// Midleware para tratamento de erros em rotas

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  
  if (err instanceof Error) {
    
    return res.status(400).json({
      error: err.message,
    });
  }

  /* Erro no servidor */
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error.",
  });
});

// A porta 3333
app.listen(3333, () => console.log(`Servidor ON`));
