/* MB&Co. — newsletter signup
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Hands off to Beehiiv's hosted subscribe page with the address carried in
 * the query string. Two steps rather than one, but it genuinely works.
 *
 * A direct POST to Beehiiv's /create endpoint was tried and silently failed
 * — Cloudflare sits in front of it and drops cross-origin form posts. Do not
 * reinstate that approach: it reports success without subscribing anyone.
 * The single-step signup needs Beehiiv's own iframe embed.
 * ─────────────────────────────────────────────────────────────────────────
 */
const BEEHIIV_SUBSCRIBE_URL = "https://newsletter.mbarton.co.uk/subscribe";

const form = document.getElementById("signup-form");
const input = document.getElementById("email");
const status = document.getElementById("signup-status");
const button = form.querySelector("button");

function setStatus(message, state) {
  status.textContent = message;
  if (state) {
    status.setAttribute("data-state", state);
  } else {
    status.removeAttribute("data-state");
  }
}

form.addEventListener("submit", async (event) => {
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

  try {
    await fetch(BEEHIIV_CREATE_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    form.hidden = true;
    setStatus("You're in. Check your inbox.");
  } catch (err) {
    // Could not reach Beehiiv at all — hand off rather than lose the signup.
    const url = new URL(BEEHIIV_SUBSCRIBE_URL);
    url.searchParams.set("email", email);
    window.location.assign(url.toString());
  }
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
