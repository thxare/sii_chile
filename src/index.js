import express from "express";
import { getInfoSii } from "./services/browser.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.json("Hola mundo"));
app.post("/", async (req, res) => {
  try {
    const { rut, dv } = req.body;
    console.log(rut)
    console.log(dv)
    const data = await getInfoSii(rut, dv);
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error al obtener la información");
  }
});

app.listen(3030, () => {
  console.log("Escuchando en puerto 3030");
});

//import { getInfoSii } from './services/browser.js';

//getInfoSii("12345678", "9");
//rut example: 12345678-9
//data
// {
//     companyName: 'JUAN PEDRO GONZALEZ',
//     dateIni: '22-10-2014',
//     activityIni: true,
//     rut: '12345678-9'
//   }
