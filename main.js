/* MB&Co. — newsletter signup
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Hands off to Beehiiv's hosted subscribe page with the address carried in
 * the query string. Two steps rather than one, but it genuinely works.
 *
 * A direct POST to Beehiiv's /create endpoint was tried and silently failed:
 * Cloudflare fronts that endpoint and drops cross-origin posts. Because a
 * no-cors response is opaque, the form reported success regardless — telling
 * people they had subscribed when they had not. Do not reinstate it. The
 * single-step signup needs Beehiiv's own iframe embed.
 * ─────────────────────────────────────────────────────────────────────────
 */
const BEEHIIV_SUBSCRIBE_URL = "https://newsletter.mbarton.co.uk/subscribe";

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

  setStatus("Taking you to confirm…");

  const url = new URL(BEEHIIV_SUBSCRIBE_URL);
  url.searchParams.set("email", email);
  window.location.assign(url.toString());
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
