# Role & Task Specification: Premium Profile Card Component

## ROLE
You are a senior front-end engineer who specializes in modern, cutting-edge CSS. You write production-quality, standards-compliant code and you justify every architectural decision with technical reasoning — not just working code, but code you can defend in a review.

## THE TASK
Build a single, self-contained Profile Card component. It must contain exactly these five elements:
* An image
* A category badge (e.g. "Design", "Engineering")
* A headline
* A short description paragraph (2–3 sentences)
* A "Read Article" button

Deliver it as one runnable HTML file with all CSS in a `<style>` block and any JavaScript (needed only for the dark mode toggle) in a `<script>` block at the bottom. Use semantic HTML5 (`<article>`, `<figure>`, `<h3>` or similar, `<p>`, `<button>` or `<a>` styled as a button). Include a visible, keyboard-operable dark mode toggle control on the page so both themes can be inspected.

---

## MANDATORY CSS ARCHITECTURE
You must build the CSS using these four techniques. Do not treat them as optional flourishes — they are the core requirement of this task, and I will check for each one explicitly.

### 1. The Modern Cascade & Inheritance — CSS Custom Properties on `:root`
* Declare every design token (colors, spacing scale, radii, font sizes, line-heights, transition timing) as a CSS custom property on `:root`.
* Every component rule must consume a token via `var(--token-name)` — no hardcoded values duplicated inline once a token exists for it.
* The card's entire look must be re-themeable by editing only the `:root` block.

### 2. Perceptual Color — `oklch()` everywhere
* Every color in the stylesheet — background, text, borders, badge fill/text, button fill/text, hover/focus states — must be defined using `oklch(L C H)`. No hex, `rgb()`, or `hsl()` anywhere.
* Implement a dark mode theme by redefining the color custom properties inside a `[data-theme="dark"]` attribute selector (toggled via the JS button), not via `prefers-color-scheme` alone.
* Where light and dark variants of the "same" color exist (e.g. surface, accent), keep hue (H) and ideally chroma (C) consistent between themes and vary primarily on lightness (L), and say so in a code comment — this is what makes the palette feel like one coherent system rather than two unrelated palettes.

### 3. Fluid Typography — `clamp()` on the headline
* The headline's font-size must use `clamp(MIN, PREFERRED, MAX)`.
* MIN should be sized for a ~320px viewport, MAX for a ~1440px+ viewport, and PREFERRED must be a `vw`-based (or container-relative) fluid expression that interpolates between them — not a fixed value.
* Add a code comment showing the arithmetic you used to derive the `vw` coefficient (i.e. how you solved for the slope between the two viewport/font-size pairs).
* Do not use a media query to adjust the headline size at any breakpoint — `clamp()` alone must handle the scaling.

### 4. Optical Text Trimming — `text-box`
* Apply `text-box: trim-both cap alphabetic;` to the badge text and the button label, to remove the invisible half-leading above/below the glyphs.
* Because `text-box` has limited browser support, wrap its usage so the layout degrades gracefully where it's unsupported (e.g. via `@supports`), and add a comment explaining what visually changes when it's active vs. inactive (the trimmed vs. untrimmed vertical space around the text).

---

## HARD CONSTRAINTS
These are non-negotiable rules I will audit your output against:
* **Low specificity only:** Single class selectors. No ID selectors. No unnecessary descendant/nested chains. No `!important` anywhere in the stylesheet.
* **Relative units only:** All typography, padding, margin, gaps, and layout dimensions must use `rem`, `em`, `%`, `vw`, or `vh` — never `px`, with the sole justifiable exception of a 1px hairline border, which must be explicitly commented as an intentional exception.
* **WCAG AA contrast:** Every text/background color pair (in both light and dark themes) must meet at least a 4.5:1 contrast ratio for normal text (3:1 is acceptable only for large text or non-text UI components). You must actually calculate or closely estimate these ratios, not assume they pass because the colors "look" high-contrast.
* **Accessibility basics:** Meaningful alt text on the image, a `focus-visible` style on the button and toggle, sufficient touch target size, and an `aria-label` if any control lacks visible text.

---

## REQUIRED SELF-VERIFICATION SECTION
After the code block, write an explicit "Verification Report" that answers each of the following in turn — don't just assert compliance, show your work:

1. **Cascade & Specificity:** List every CSS selector you used. Confirm none exceed a single class (or a simple attribute selector for theming), and confirm there is zero use of `!important`.
2. **Relative Units Audit:** Produce a short table of every dimension declared in the stylesheet (property, value, element) and confirm the unit type for each.
3. **Color Logic:** State the exact `oklch()` values used for every text/background pair, in both themes, and calculate the resulting contrast ratio for each pair against the 4.5:1 (or 3:1) threshold.
4. **Fluid Math:** Restate the `clamp()` expression you used for the headline and break down the minimum floor, the fluid scaling formula, and the maximum ceiling, confirming all three are present and correctly ordered.
5. **Text-Box Fallback:** Describe, concretely, what the badge/button text looks like with `text-box` active vs. what it falls back to when unsupported (i.e., what the `@supports` fallback path renders), so the difference is visually verifiable.

---

## SCENARIO WALKTHROUGH
Finally, add a "Scenario Walkthrough" section presenting a checklist of exactly 3 normal cases and 3 edge cases, explaining precisely how the card's HTML/CSS handles each one. You may substitute equally rigorous scenarios, but these are the baseline expectation:

### Normal Cases
1. A standard card — short headline (~40 characters), a 2–3 line description, a normal-aspect-ratio image, light theme active.
2. The same card with the dark mode toggle switched on — confirm colors re-map via the `[data-theme="dark"]` tokens and contrast still holds.
3. A card with a longer but still realistic category badge label (e.g. "Machine Learning" instead of "AI") — confirm the badge doesn't break its layout or wrap awkwardly.

### Edge Cases
1. An extremely long, unbroken headline (no spaces, e.g. a long URL-like string) rendered at the narrowest supported viewport (~320px) — confirm the `clamp()` floor and word-break/overflow handling keep the card intact.
2. A broken/missing image `src` — confirm there's a graceful fallback (visible alt text and/or a placeholder background) rather than a collapsed or broken-looking card.
3. The user has zoomed browser text to 200% (simulating a low-vision accessibility setting) — confirm that because everything is `rem`/relative-unit based, the layout reflows correctly and the `clamp()` ceiling doesn't defeat the zoom (this is a WCAG 1.4.4 reflow concern, not just a visual one).

## OUTPUT FORMAT
Structure your response in this order:
1. The complete, commented, runnable HTML/CSS/JS code block.
2. The Verification Report (five numbered subsections above).
3. The Scenario Walkthrough (checklist format, 3 normal + 3 edge cases).

Keep the written sections precise and technical — prioritize demonstrating correctness over prose length.

 >ROLE

You are a senior front-end engineer who specializes in modern, cutting-edge CSS. You write production-quality, standards-compliant code and you justify every architectural decision with technical reasoning — not just working code, but code you can defend in a review.


THE TASK

Build a single, self-contained Profile Card component. It must contain exactly these five elements:


An image

A category badge (e.g. "Design", "Engineering")

A headline

A short description paragraph (2–3 sentences)

A "Read Article" button

Deliver it as one runnable HTML file with all CSS <style> block and any JavaScript (needed only for the dark mode toggle) in a <script> block at the bottom. Use semantic HTML5 (<article>, <figure>, <h3> or similar, <p>, <button> or <a> styled as a button). Include a visible, keyboard-operable dark mode toggle control on the page so both themes can be inspected.


MANDATORY CSS ARCHITECTURE

You must build the CSS using these four techniques. Do not treat them as optional flourishes — they are the core requirement of this task, and I will check for each one explicitly.


1. The Modern Cascade & Inheritance — CSS Custom Properties on :root

Declare every design token (colors, spacing scale, radii, font sizes, line-heights, transition timing) as a CSS custom property on :root.

Every component rule must consume a token via var(--token-name) — no hardcoded values duplicated inline once a token exists for it.

The card's entire look must be re-themeable by editing only the :root block.

2. Perceptual Color — oklch() everywhere

Every color in the stylesheet — background, text, borders, badge fill/text, button fill/text, hover/focus states — must be defined using oklch(L C H). No hex, rgb(), or hsl() anywhere.

Implement a dark mode theme by redefining the color custom properties inside a [data-theme="dark"] attribute selector (toggled via the JS button), not via prefers-color-scheme alone.

Where light and dark variants of the "same" color exist (e.g. surface, accent), keep hue (H) and ideally chroma (C) consistent between themes and vary primarily on lightness (L), and say so in a code comment — this is what makes the palette feel like one coherent system rather than two unrelated palettes.

3. Fluid Typography — clamp() on the headline

The headline's font-size must use clamp(MIN, PREFERRED, MAX).

MIN should be sized for a ~320px viewport, MAX for a ~1440px+ viewport, and PREFERRED must be a vw-based (or container-relative) fluid expression that interpolates between them — not a fixed value.

Add a code comment showing the arithmetic you used to derive the vw coefficient (i.e. how you solved for the slope between the two viewport/font-size pairs).

Do not use a media query to adjust the headline size at any breakpoint — clamp() alone must handle the scaling.

4. Optical Text Trimming — text-box

Apply text-box: trim-both cap alphabetic; to the badge text and the button label, to remove the invisible half-leading above/below the glyphs.

Because text-box has limited browser support, wrap its usage so the layout degrades gracefully where it's unsupported (e.g. via @supports), and add a comment explaining what visually changes when it's active vs. inactive (the trimmed vs. untrimmed vertical space around the text).

HARD CONSTRAINTS

These are non-negotiable rules I will audit your output against:


Low specificity only. Single class selectors. No ID selectors. No unnecessary descendant/nested chains. No !important anywhere in the stylesheet.

Relative units only. All typography, padding, margin, gaps, and layout dimensions must use rem, em, %, vw, or vh — never px, with the sole justifiable exception of a 1px hairline border, which must be explicitly commented as an intentional exception.

WCAG AA contrast. Every text/background color pair (in both light and dark themes) must meet at least a 4.5:1 contrast ratio for normal text (3:1 is acceptable only for large text or non-text UI components). You must actually calculate or closely estimate these ratios, not assume they pass because the colors "look" high-contrast.

Accessibility basics. Meaningful alt text on the image, a focus-visible style on the button and toggle, sufficient touch target size, and an aria-label if any control lacks visible text.

REQUIRED SELF-VERIFICATION SECTION

After the code block, write an explicit "Verification Report" that answers each of the following in turn — don't just assert compliance, show your work:


Cascade & Specificity — List every CSS selector you used. Confirm none exceed a single class (or a simple attribute selector for theming), and confirm there is zero use of !important.

Relative Units Audit — Produce a short table of every dimension declared in the stylesheet (property, value, element) and confirm the unit type for each.

Color Logic — State the exact oklch() values used for every text/background pair, in both themes, and calculate the resulting contrast ratio for each pair against the 4.5:1 (or 3:1) threshold.

Fluid Math — Restate the clamp() expression you used for the headline and break down the minimum floor, the fluid scaling formula, and the maximum ceiling, confirming all three are present and correctly ordered.

Text-Box Fallback — Describe, concretely, what the badge/button text looks like with text-box active vs. what it falls back to when unsupported (i.e., what the @supports fallback path renders), so the difference is visually verifiable.

SCENARIO WALKTHROUGH

Finally, add a "Scenario Walkthrough" section presenting a checklist of exactly 3 normal cases and 3 edge cases, explaining precisely how the card's HTML/CSS handles each one. You may substitute equally rigorous scenarios, but these are the baseline expectation:

Normal cases


A standard card — short headline (~40 characters), a 2–3 line description, a normal-aspect-ratio image, light theme active.

The same card with the dark mode toggle switched on — confirm colors re-map via the [data-theme="dark"] tokens and contrast still holds.

A card with a longer but still realistic category badge label (e.g. "Machine Learning" instead of "AI") — confirm the badge doesn't break its layout or wrap awkwardly.

Edge cases


An extremely long, unbroken headline (no spaces, e.g. a long URL-like string) rendered at the narrowest supported viewport (~320px) — confirm the clamp() floor and word-break/overflow handling keep the card intact.

A broken/missing image src — confirm there's a graceful fallback (visible alt text and/or a placeholder background) rather than a collapsed or broken-looking card.

The user has zoomed browser text to 200% (simulating a low-vision accessibility setting) — confirm that because everything is rem/relative-unit based, the layout reflows correctly and the clamp() ceiling doesn't defeat the zoom (this is a WCAG 1.4.4 reflow concern, not just a visual one).

OUTPUT FORMAT

Structure your response in this order:


The complete, commented, runnable HTML/CSS/JS code block.

The Verification Report (five numbered subsections above).

The Scenario Walkthrough (checklist format, 3 normal + 3 edge cases).

Keep the written sections precise and technical — prioritize demonstrating correctness over prose length. 
