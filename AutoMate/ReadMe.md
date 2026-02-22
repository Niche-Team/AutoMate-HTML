# 🚘 AutoMate - Landing Page UI

> **"The End of Car Buying Anxiety."** > Nigeria's premier marketplace for vetted, inspected, and guaranteed used cars.

Omo, the landing page is finally done. I've wrestled with the CSS flexboxes, absolute positioning, and gradient text masking so you guys don't have to. The UI is pixel-perfect, completely responsive, and ready to be sliced up. 

To you bastards: I've left breadcrumbs in the HTML and CSS. Read this guide before you start tearing the code apart else i go tuwo your shinkafa oo.

## 🛠 Tech Stack
* **Markup:** HTML5 (Semantic and grouped for easy React slicing)
* **Styling:** CSS3 (Pure Vanilla—Flexbox, CSS Variables, custom keyframes)
* **Icons:** FontAwesome 7.0.1
* **Typography:** `Inter`, `Roboto Mono`, `Archivo`, `Tangerine`, `Tourney`

---

## 🧩 The Component Architecture

I structured the HTML specifically to make your lives easy. Here is exactly how you should break this down into React components:

* `<Navbar />` 
  * Features sticky positioning and a glassmorphism backdrop-blur. 
* `<Hero />` 
  * `<HeroText />` - Contains the massive H1. 
  * `<HeroStats />` - The 15k+ | 98% | 24/7 row.
  * `<HeroImage />` - The 3D car image with the floating verification tags.
* `<TrustFeatures />` 
  * Just build one `<TrustCard />` and map through an array of data for the 4 items. Keep it DRY.
* `<TokunboTrap />` 
  * The section with the radar HUD effect. The red warning pills use `position: absolute`. Do not strip the wrapper divs or they will fly off the screen.
* `<SolidDrive />`
  * `<CssReportCard />` - The report card on the right is built 100% with CSS (no background images). Hook this up to accept dynamic props (e.g., Engine: 98%, Price: ₦85M).
* `<Footer />` 
  * Simple functional component. Contains a topography background SVG overlay.

---

## 🎨 Global Styles & The AutoMate Copper

Check the very top of `LandingPage.css`. I mapped out all our core theme colors as CSS variables. Drop these into your global CSS file or extend your Tailwind config with them.

```css
:root {
  --primary-color: #b87363; /* AutoMate Copper */
  --secondary-color: #e85a10;
  --background-light: #f9fafb;
  --surface-dark: #1f2937;
  /* ... etc */
}