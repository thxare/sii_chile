import * as cheerio from "cheerio";

const parseHtml = (html, rut, dv) => {
  const $ = cheerio.load(html);
  const theText = $("div#contenedor").text();

  const nombreRegex = /Nombre o Razón Social\s*:(.*?)RUT/;
  const dateIniRegex = /Fecha de Inicio de Actividades:(.*?)Contribuyente/;
  const activityInitRegex =
    /Contribuyente presenta Inicio de Actividades:(.*?)Fecha/;

  const nombreMatch = theText.match(nombreRegex);
  const dateIniTxt = theText.match(dateIniRegex);
  const activityTxt = theText.match(activityInitRegex);

  return {
    companyName: nombreMatch ? nombreMatch[1].trim() : "No encontrado",
    dateIni: dateIniTxt ? dateIniTxt[1].trim() : "No encontrado",
    activityIni: activityTxt ? activityTxt[1].trim() === "SI" : false,
    rut: `${rut}-${dv}`,
  };
};

export default parseHtml;
