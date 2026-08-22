/* MB&Co. — newsletter signup
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Posts straight to the Beehiiv subscribe endpoint on Matthew's own custom
 * domain, so the reader enters their address once and never leaves the page.
 *
 * The request goes out with mode:"no-cors" because Beehiiv does not send
 * CORS headers for this endpoint. The POST is delivered, but the response is
 * opaque — meaning we cannot read success or failure back. The form therefore
 * confirms optimistically. Genuine failures (already subscribed, blocked
 * address) are invisible here and only show up in Beehiiv's Audience list.
 * That is the cost of keeping the reader on the page; the alternative is
 * Beehiiv's iframe embed, which reports properly but brings its own styling.
 *
 * If the request cannot be sent at all, we fall back to the hosted subscribe
 * page rather than leaving anyone stranded.
 * ─────────────────────────────────────────────────────────────────────────
 */
const BEEHIIV_CREATE_URL = "https://newsletter.mbarton.co.uk/create";
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

  button.disabled = true;
  setStatus("Signing you up…");

  // Field names mirror Beehiiv's own form. double_opt=false means no
  // confirmation step, so the subscriber is live immediately.
  const body = new URLSearchParams({
    email,
    sent_from_orchid: "true",
    double_opt: "false",
    auto_login_enabled: "true",
    is_js_enabled: "true",
    utm_source: "mbarton.co.uk",
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
