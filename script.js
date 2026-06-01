const galileoQuote = document.querySelector("#galileoQuote");

const galileoQuotes = [
  "No puedes ense\u00f1ar algo a alguien, solo puedes ayudarle a que lo encuentre en su interior.",
  "\u00bfQui\u00e9n se atrever\u00e1 a poner l\u00edmites al ingenio de los hombres?",
  "La pasi\u00f3n es la g\u00e9nesis del genio.",
  "Nunca he conocido un hombre tan ignorante que no haya podido aprender algo de \u00e9l.",
  "La filosof\u00eda est\u00e1 escrita en ese gran libro del universo, que est\u00e1 continuamente abierto ante nosotros para que lo observemos.",
];

galileoQuote.textContent = galileoQuotes[Math.floor(Math.random() * galileoQuotes.length)];

function loadScriptOnce(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

window.ml_webform_success_41981371 = function () {
  const formRows = document.querySelectorAll(".ml-subscribe-form-41981371 .row-form");
  const successRows = document.querySelectorAll(".ml-subscribe-form-41981371 .row-success");

  formRows.forEach((row) => {
    row.style.display = "none";
  });

  successRows.forEach((row) => {
    row.style.display = "block";
  });
};

loadScriptOnce("https://www.google.com/recaptcha/api.js");
loadScriptOnce("https://groot.mailerlite.com/js/w/webforms.min.js?vb397d78ebaa8a0f631d35384c46d781b");

fetch("https://assets.mailerlite.com/jsonp/2392501/forms/188927328421676787/takel").catch(() => {});
