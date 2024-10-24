import parseHtml from "../utils/parser.js";

const getHeaders = () => ({
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "es-419,es;q=0.9",
  "cache-control": "max-age=0",
  "content-type": "application/x-www-form-urlencoded",
  "sec-ch-ua":
    '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
});

export const postInfo = async (rut, dv, txtCaptcha, txtCode) => {
  const response = await fetch("https://zeus.sii.cl/cvc_cgi/stc/getstc", {
    headers: getHeaders(),
    body: `RUT=${rut}&DV=${dv}&txt_captcha=${txtCaptcha}&txt_code=${txtCode}&PRG=STC&OPC=NOR&ACEPTAR=%C2%A0%C2%A0%C2%A0%C2%A0Consultar+situaci%C3%B3n+tributaria%C2%A0%C2%A0%C2%A0%C2%A0`,
    method: "POST",
  });

  if (response.ok) {
    const html = await response.text();
    const data = parseHtml(html, rut, dv);
    return data;
  } else {
    console.error("Error:", response.status);
  }
};
