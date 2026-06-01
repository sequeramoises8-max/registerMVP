const galileoQuote = document.querySelector("#galileoQuote");
const mailerLiteEmbed = document.querySelector(".ml-embedded");
const mailerLiteForm = document.querySelector(".ml-block-form");
const mailerLiteLoader = document.querySelector("[data-form-loading]");
const mailerLiteSubmitButton = document.querySelector(".ml-form-embedSubmit button.primary");
const minimumLoaderMs = 1500;
const loaderExitMs = 320;
let submitLoaderTimeout;
let loaderTransitionTimeout;
let submitStartedAt = 0;

const galileoQuotes = [
  "No puedes ense\u00f1ar algo a alguien, solo puedes ayudarle a que lo encuentre en su interior.",
  "\u00bfQui\u00e9n se atrever\u00e1 a poner l\u00edmites al ingenio de los hombres?",
  "La pasi\u00f3n es la g\u00e9nesis del genio.",
  "Nunca he conocido un hombre tan ignorante que no haya podido aprender algo de \u00e9l.",
  "La filosof\u00eda est\u00e1 escrita en ese gran libro del universo, que est\u00e1 continuamente abierto ante nosotros para que lo observemos.",
];

galileoQuote.textContent = galileoQuotes[Math.floor(Math.random() * galileoQuotes.length)];

function showSubmitLoader() {
  if (!mailerLiteEmbed || !mailerLiteLoader) return;

  window.clearTimeout(submitLoaderTimeout);
  window.clearTimeout(loaderTransitionTimeout);
  submitStartedAt = window.performance.now();
  mailerLiteEmbed.classList.add("is-submitting");
  mailerLiteEmbed.setAttribute("aria-busy", "true");
  mailerLiteLoader.classList.remove("is-leaving");
  mailerLiteLoader.hidden = false;
  window.requestAnimationFrame(() => {
    mailerLiteLoader.classList.add("is-visible");
  });

  if (mailerLiteSubmitButton) {
    mailerLiteSubmitButton.disabled = true;
    mailerLiteSubmitButton.setAttribute("aria-disabled", "true");
  }

  submitLoaderTimeout = window.setTimeout(() => {
    const successIsVisible = [...document.querySelectorAll(".ml-subscribe-form-41981371 .row-success")].some(
      (row) => row.style.display !== "none" && window.getComputedStyle(row).display !== "none",
    );

    if (!successIsVisible) hideSubmitLoader();
  }, 14000);
}

function hideSubmitLoader({ enableButton = true, keepSubmitState = false } = {}) {
  if (!mailerLiteEmbed || !mailerLiteLoader) return Promise.resolve();

  window.clearTimeout(submitLoaderTimeout);
  window.clearTimeout(loaderTransitionTimeout);
  if (!keepSubmitState) {
    mailerLiteEmbed.classList.remove("is-submitting", "is-completing");
    mailerLiteEmbed.removeAttribute("aria-busy");
  }
  mailerLiteLoader.classList.remove("is-visible");
  mailerLiteLoader.classList.add("is-leaving");

  if (enableButton && mailerLiteSubmitButton) {
    mailerLiteSubmitButton.disabled = false;
    mailerLiteSubmitButton.removeAttribute("aria-disabled");
  }

  return new Promise((resolve) => {
    loaderTransitionTimeout = window.setTimeout(() => {
      mailerLiteLoader.hidden = true;
      mailerLiteLoader.classList.remove("is-leaving");
      mailerLiteEmbed.classList.remove("is-submitting", "is-completing");
      mailerLiteEmbed.removeAttribute("aria-busy");
      resolve();
    }, loaderExitMs);
  });
}

function revealSuccessRows(successRows) {
  successRows.forEach((row) => {
    row.classList.remove("is-visible");
    row.style.display = "block";
    row.offsetHeight;
    window.requestAnimationFrame(() => {
      row.classList.add("is-visible");
    });
  });
}

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
  const elapsed = submitStartedAt ? window.performance.now() - submitStartedAt : minimumLoaderMs;
  const remainingLoaderMs = Math.max(minimumLoaderMs - elapsed, 0);

  window.setTimeout(() => {
    formRows.forEach((row) => {
      row.style.display = "none";
    });

    mailerLiteEmbed?.classList.add("is-completing");
    revealSuccessRows(successRows);

    window.setTimeout(() => {
      hideSubmitLoader({ enableButton: false, keepSubmitState: true });
    }, 180);
  }, remainingLoaderMs);
};

if (mailerLiteForm) {
  mailerLiteForm.addEventListener("submit", () => {
    if (!mailerLiteForm.checkValidity()) return;

    window.requestAnimationFrame(showSubmitLoader);
  });
}

loadScriptOnce("https://www.google.com/recaptcha/api.js");
loadScriptOnce("https://groot.mailerlite.com/js/w/webforms.min.js?vb397d78ebaa8a0f631d35384c46d781b");

fetch("https://assets.mailerlite.com/jsonp/2392501/forms/188927328421676787/takel").catch(() => {});
