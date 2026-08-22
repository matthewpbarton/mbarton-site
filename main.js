/* MB&Co. — newsletter signup
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Posts to Beehiiv with the typed address carried over as ?email=, so the
 * subscriber only has to confirm rather than type it twice.
 *
 * NOTE: this is still Beehiiv's auto-generated subdomain. When the slug is
 * changed to something readable (Settings → Publication → Web), update the
 * URL below — it is the only place it appears.
 *
 * Setting BEEHIIV_SUBSCRIBE_URL back to "" reinstates the LinkedIn fallback.
 * ─────────────────────────────────────────────────────────────────────────
 */
const BEEHIIV_SUBSCRIBE_URL = "https://matthews-newsletter-2f246d.beehiiv.com/subscribe";

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
