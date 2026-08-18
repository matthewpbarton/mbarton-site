/* MB&Co. — newsletter signup
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TO GO LIVE WITH BEEHIIV: set BEEHIIV_SUBSCRIBE_URL below to your
 * publication's subscribe URL, e.g. "https://iterations.beehiiv.com/subscribe"
 * (Beehiiv → Settings → Publication → Web, or just the /subscribe path of
 * your public site). That is the only change needed.
 *
 * While it is left empty the form stays fully usable and falls back to the
 * LinkedIn newsletter, which is where subscribers go today — so there is no
 * dead end on the page in the meantime.
 * ─────────────────────────────────────────────────────────────────────────
 */
const BEEHIIV_SUBSCRIBE_URL = "";

const LINKEDIN_FALLBACK =
  "https://www.linkedin.com/newsletters/iterations-by-matthew-barton-7289678221522952192/";

const form = document.getElementById("signup-form");
const input = document.getElementById("email");
const status = document.getElementById("signup-status");

function setStatus(message, state) {
  status.textContent = message;
  if (state) {
    status.setAttribute("data-state", state);
  } else {
    status.removeAttribute("data-state");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = input.value.trim();

  if (!email || !input.checkValidity()) {
    setStatus("Please enter a valid email address.", "error");
    input.focus();
    return;
  }

  if (BEEHIIV_SUBSCRIBE_URL) {
    const url = new URL(BEEHIIV_SUBSCRIBE_URL);
    url.searchParams.set("email", email);
    setStatus("Taking you to confirm your subscription…");
    window.location.assign(url.toString());
    return;
  }

  setStatus("Opening the newsletter on LinkedIn…");
  window.open(LINKEDIN_FALLBACK, "_blank", "noopener");
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
