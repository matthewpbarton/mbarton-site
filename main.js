/* MB&Co.
 *
 * The newsletter signup is Beehiiv's embedded form — it renders and submits
 * itself, so there is no form handling here any more. Earlier attempts to
 * post to Beehiiv from our own form failed silently behind their Cloudflare
 * layer; do not reinstate that.
 */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
