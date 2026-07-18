# Verification Report — Resume-Themed Profile Card

## Deliverable scope

The implementation target is `profile-card-refactored.html`. The supplied resume files, `index.html` and `style.css`, were used only as the design and destination reference and were copied into the package unchanged. SHA-256 comparisons confirmed that both packaged copies are byte-for-byte identical to the uploaded files.

The card now defaults to the resume's dark terminal/dashboard presentation, uses the same orange primary accent and cyan secondary accent, and links the **Read Resume** action to `index.html`.

## 1. Custom properties and cascade

**Result: Pass.**

All reusable visual values are declared on `:root` and consumed through custom properties, including:

- typography and font families;
- spacing and text-trim compensation;
- radii and the sanctioned one-pixel hairline border;
- card width, image aspect ratio, accent-rail width, control heights, lift distance, and z-index layers;
- transition timings;
- shadow color and complete shadow geometry;
- all colors used by the dark, light, and print themes.

The previous shadow declarations and control-height declarations are retained as commented-out `OLD` lines beside their replacements. The replacement comments explain why each value was centralized or renamed.

No active component declaration duplicates the former inline shadow values `0.5rem`, `1.5rem`, or an un-tokenized shadow color. The primary action consumes `--control-height-primary`; the theme toggle and technology tags consume `--control-height`.

## 2. OKLCH gamut and contrast verification

**Result: Pass.**

A script extracted every active `oklch()` declaration after removing CSS comments, converted each value through the OKLab → linear-sRGB matrices, and checked every channel against the inclusive 0–1 range. All **40 unique active OKLCH values** are inside the sRGB gamut. Commented-out legacy colors were intentionally excluded because they do not render.

No active hex, `rgb()`, `rgba()`, `hsl()`, or `hsla()` color is present in the embedded stylesheet.

WCAG contrast calculations used linear-sRGB relative luminance:

| Pair | Dark theme | Light theme | Result |
|---|---:|---:|---|
| Primary text / card surface | 15.65:1 | 17.06:1 | Pass |
| Secondary text / card surface | 10.37:1 | 10.70:1 | Pass |
| Muted text / card surface | 7.30:1 | 7.32:1 | Pass |
| Badge accent / elevated surface | 6.32:1 | 5.20:1 | Pass |
| CTA text / accent fill | 7.46:1 | 5.67:1 | Pass |
| CTA text / hover fill | 8.98:1 | 7.30:1 | Pass |
| Cyan focus color / card surface | 9.44:1 | 7.11:1 | Pass |

The tightest checked pair is the light-theme badge at **5.20:1**, still above the 4.5:1 WCAG AA threshold for normal text.

## 3. Fluid headline verification

**Result: Pass.**

The headline retains the mathematically correct declaration:

```css
font-size: clamp(1.25rem, 1.0714rem + 0.8929vw, 1.875rem);
```

The CSS comment now includes the required derivation:

- 320px viewport → 20px headline;
- 1440px viewport → 30px headline;
- slope = `(30 − 20) / (1440 − 320) = 10 / 1120 = 0.0089286`;
- viewport coefficient = `0.0089286 × 100 = 0.89286vw`;
- intercept = `20 − (0.0089286 × 320) = 17.143px = 1.0714rem`.

No media query changes the headline font size.

## 4. `text-box` optical trimming

**Result: Pass with standards-based fallback.**

The invalid `-webkit-text-box` declaration is present only inside the commented-out legacy explanation and is not active CSS. The live feature query is:

```css
@supports (text-box: trim-both cap alphabetic)
```

The adjacent comment explains the visual behavior:

- unsupported state: the font's default half-leading leaves additional vertical space above and below the glyphs;
- supported state: the line box trims to cap-height and alphabetic edges;
- tokenized compensation padding restores deliberate, consistent breathing room after trimming.

The card remains fully usable when the feature is unsupported.

## 5. Structure, accessibility, and code validation

**Result: Pass.**

- The CTA is an anchor with the exact visible label **Read Resume** and `href="index.html"`.
- The theme control is a native `<button>` with synchronized visible text, `aria-label`, and `aria-pressed` state.
- Both interactive controls have `:focus-visible` treatment.
- Compact controls meet a 44px minimum; the primary CTA uses 48px.
- The image has meaningful alternative text, `loading="lazy"`, and `decoding="async"`.
- The `onerror` handler removes `src` after a real load failure, activating the CSS fallback for missing, empty, 404, or timed-out images.
- No HTML comment is placed inside an element's attribute list.
- The card heading is the document's `<h1>` and is associated with the article through `aria-labelledby`.
- Reduced-motion and print scenarios are included.
- The embedded stylesheet produced **zero TinyCSS2 parse errors**.
- The HTML parsed successfully and exposed one active `Read Resume` CTA linking to `index.html`.

# Scenario Walkthrough

## Normal scenario 1 — Dark resume theme

Opening `profile-card-refactored.html` with no saved preference produces the resume's dark obsidian canvas, dark card surface, orange primary accent, cyan focus color, terminal-style labels, left orange-to-cyan accent rail, and strong dashboard shadow. The heading, summary, skill tags, and CTA all meet the verified contrast ratios above.

## Normal scenario 2 — Light theme toggle

Activating **Light Theme** changes only custom-property values through `[data-theme="light"]`. The button updates to **Dark Theme**, its accessible name changes to “Switch to dark theme,” and `aria-pressed` becomes `true`. A permitted storage failure does not block theme switching.

## Normal scenario 3 — Resume navigation

Activating **Read Resume** navigates to `index.html`. The package keeps the card, resume HTML, and resume stylesheet in one directory, so the relative destination resolves without changing the resume files.

## Edge case 1 — Broken or missing image

If the image URL returns 404, times out, or otherwise fails, `onerror` removes the `src` attribute. The image becomes hidden and the media panel exposes the centered “Resume preview unavailable” fallback. The browser's native broken-image icon does not cover the fallback.

## Edge case 2 — Narrow viewport and long content

At widths below 30rem, body and card padding reduce, the fixed theme control moves inward, technology tags can share or occupy full rows, and all long text uses `overflow-wrap: anywhere`. The card width remains `width: 100%` under its max-width, preventing intentional horizontal overflow.

## Edge case 3 — Keyboard, motion preference, and print

Keyboard users can tab to the theme toggle and CTA and receive the cyan focus ring. Users requesting reduced motion receive near-instant transitions. Printing hides the theme toggle, removes decorative canvas imagery and shadows, switches to an in-gamut monochrome-forward print palette, and preserves the card as a single break-resistant block.

## Validation note

The code and color checks above were automated static validations. A Chromium screenshot attempt in this execution environment did not complete reliably, so this report does not claim a browser-screenshot comparison. The stylesheet and HTML syntax checks, gamut conversion, contrast calculations, DOM checks, and file-integrity checks all completed successfully.
