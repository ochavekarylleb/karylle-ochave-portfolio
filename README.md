# Karylle Ochave Portfolio

A responsive, one-page editorial portfolio for Karylle B. Ochave. The site uses semantic HTML, modern CSS, and vanilla JavaScript, with no build step or backend. Contact calls to action open a direct WhatsApp conversation.

Recommended public URL: `karylle-ochave-portfolio` (for example, `username.github.io/karylle-ochave-portfolio`). This is more professional and searchable than a generic “Karylle portfolio” slug.

## Preview locally

Open this folder in VS Code, install the free Live Server extension, then right-click `index.html` and choose **Open with Live Server**. The site also works by opening `index.html` directly, though Live Server gives more consistent local behavior.

## File structure

- `index.html` contains the semantic page structure.
- `css/style.css` contains the complete responsive design system.
- `js/content.js` contains the frequently edited portfolio details.
- `js/script.js` renders content and powers navigation, filters, dialogs, tabs, counters, and form validation.
- `assets/Karylle-Ochave-Resume.pdf` is retained as a private project asset but is not linked from the website.
- `assets/images/` is for portrait, project, and social preview images.
- `assets/projects/` is for website and app screenshots.
- `assets/references/` holds design references only; these are not displayed on the site.
- `favicon.svg` is the browser icon.

## Update content

Edit `js/content.js` for Karylle’s biography details, experience descriptions, skills, accounts, campaigns, website projects, UI/UX case study, social links, and contact details. Placeholder copy is intentionally explicit so unpublished claims cannot be mistaken for completed work.

To replace the portrait placeholders, add an optimized image to `assets/images/`, then replace the corresponding `.portrait-placeholder` elements in `index.html` with an `img` element. Include useful alt text, `width`, `height`, and `loading="lazy"` for below-the-fold images.

To add portfolio work, duplicate an item inside `socialAccounts`, `campaigns`, or `websites` in `js/content.js`. Keep the same fields. Use only approved brand names, public links, and verified metrics.

Contact information can be updated in the `personal` object inside `js/content.js`. Personal social-profile links and résumé downloads are intentionally not displayed.

## Publish free with GitHub Pages

1. Create a public GitHub repository named `karylle-ochave-portfolio`.
2. Upload the contents of this folder to the repository root.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. GitHub will provide a URL such as `https://username.github.io/karylle-ochave-portfolio/`.

No absolute asset paths are used, so the site works from a repository subdirectory.

## Vercel or Netlify

Import the GitHub repository into Vercel or Netlify. Use the repository root as the site directory and leave the build command empty. Both services provide a free temporary domain. A custom domain can be connected later from the hosting provider’s domain settings after updating the domain’s DNS records.

## Contact

Conversation buttons use Karylle's `wa.me` link to open WhatsApp directly. Update the WhatsApp URL in `index.html` if the contact number changes.
