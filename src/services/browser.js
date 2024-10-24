import puppeteer from "puppeteer";
import { decodeCaptcha } from "./captcha.js";
import { postInfo } from "./api.js";

export const getInfoSii = async (rut, dv, retries = 3) => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-images",
      "--disable-styles",
    ],
  });

  const page = await browser.newPage();
  await page.goto("https://zeus.sii.cl/cvc/stc/stc.html", {
    waitUntil: "networkidle2",
  });

  try {
    const captchaValue = await page.$eval(
      "#txt_captcha",
      (input) => input.value
    );
    const txtCode = decodeCaptcha(captchaValue);
    const result = await postInfo(rut, dv, captchaValue, txtCode);
    return result;
  } catch (err) {
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Esperar 1 segundo
      return getInfoSii(rut, dv, retries - 1);
    } else {
      console.error("Failed after retries");
    }
    console.log(err);
  } finally {
    await browser.close();
  }
};
