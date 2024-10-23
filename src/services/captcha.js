export const decodeCaptcha = (captchaValue) => {
  const decodedString = atob(captchaValue);
  const result = decodedString.substring(36, 40);
  return result;
};
