# Plan: Pizza Taco Eventos Landing Page Redesign

## Overview
This project involves redesigning the existing landing page for "Pizza Taco Eventos" from a Neo-Brutalist Pop-Art theme to an elegant, premium, rustic-modern visual aesthetic, matching the layout, typography, components, and text details shown in the user's reference image.

## Project Type
- **Type**: WEB (Single page landing page: HTML, CSS, JavaScript)
- **Primary Agent**: `frontend-specialist`

## Success Criteria
1. Landing page layout completely updated to match the reference image.
2. Premium fonts (Playfair Display, Great Vibes, Inter) properly integrated and styled.
3. Colors matching the elegant palette (dark olive green, mustard/gold, cream).
4. All section layouts structured precisely: Navbar, Hero, Sobre Nós, Sabores slider, Eventos card, and Footer.
5. Interactive features (Menu Tabs, Event Quiz, Polaroid Sandbox) fully functional and styled in the new visual theme.
6. Responsive visual consistency on mobile, tablet, and desktop viewports.

## Tech Stack
- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS (CSS Custom Properties, Flexbox, Grid, CSS Transitions)
- **Interactivity**: Vanilla JavaScript (ES6+, Intersection Observer)
- **Fonts**: Google Fonts (`Playfair Display`, `Great Vibes`, `Inter`)
- **Assets**: Custom AI-generated high-resolution images (`hero_party.jpg`, `chef_cooking.jpg`, 5 flavors of pizza-tacos, `event_setup.jpg`)

## File Structure
No new files in structure except assets:
```plaintext
Pizza Taco Eventos - LP/
├── assets/
│   ├── pizza.png (existing)
│   ├── tacos.png (existing)
│   ├── hero_party.jpg [NEW]
│   ├── chef_cooking.jpg [NEW]
│   ├── pizza_taco_margherita.jpg [NEW]
│   ├── pizza_taco_pepperoni.jpg [NEW]
│   ├── pizza_taco_rucula.jpg [NEW]
│   ├── pizza_taco_4queijos.jpg [NEW]
│   ├── pizza_taco_picante.jpg [NEW]
│   └── event_setup.jpg [NEW]
├── index.html (modified)
├── styles.css (modified)
├── script.js (modified)
└── docs/
    └── PLAN.md [THIS PLAN]
```

## Task Breakdown

### Task 1: Generate Visual Assets
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P0
- **Dependencies**: None
- **Description**: Generate high-quality JPG assets using the image generation tool to match the rustic/elegant styling of the catering site.
- **INPUT**: Prompts for hero dinner, cooking chef, 5 pizza-tacos, and event setup.
- **OUTPUT**: `hero_party.jpg`, `chef_cooking.jpg`, 5 pizza-taco images, and `event_setup.jpg` saved in the `assets/` folder.
- **VERIFY**: Check the `assets/` directory to ensure all 8 images exist and are properly sized.

### Task 2: Configure Stylesheet Design Tokens and Fonts
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`, `ui-ux-pro-max`
- **Priority**: P0
- **Dependencies**: Task 1
- **Description**: Update the global CSS variables and typography system in `styles.css`. Remove all neo-brutalist variables.
- **INPUT**: Google Font links for `Playfair Display`, `Great Vibes`, and `Inter`. Color palette details.
- **OUTPUT**: Modified `styles.css` with updated `:root` variables, font assignments, and reset styles.
- **VERIFY**: View `styles.css` structure; check that headers use Playfair Display, cursive class uses Great Vibes, and body uses Inter.

### Task 3: Implement Header and Hero Section Layout
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 2
- **Description**: Update `index.html` and `styles.css` for the navbar and hero section.
- **INPUT**: Reference image layouts.
- **OUTPUT**: Header with new logo "PIZZA TACO CATERING & EVENTOS", clean navigation list, CTA buttons, and the two-column hero layout with cursive title and right-side image.
- **VERIFY**: Check code elements; verify background colors and Flex/Grid parameters align with the template.

### Task 4: Implement "Sobre Nós" Section Layout
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 3
- **Description**: Update `index.html` and `styles.css` for the "Sobre Nós" section to match the three-part layout (Beige text card, Chef cooking image, Green pillars card).
- **INPUT**: Reference image layout.
- **OUTPUT**: HTML structure and CSS grids for the three columns.
- **VERIFY**: Confirm the middle image is `chef_cooking.jpg` and the right card contains the 4 icon blocks with correct texts.

### Task 5: Implement "Sabores" Slider Section Layout
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 4
- **Description**: Update `index.html` and `styles.css` for the "Sabores" section. Configure the horizontal scrolling container for the 5 pizza-taco cards.
- **INPUT**: Reference image layout.
- **OUTPUT**: Two-column layout with left text/button block and right sliding cards containing pizza taco images and green overlay labels.
- **VERIFY**: Check that cards display correctly and the scroll container allows horizontal movement.

### Task 6: Implement "Eventos" Section Layout
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: Task 5
- **Description**: Update `index.html` and `styles.css` for the "Eventos" section to show the left evening image and right block.
- **INPUT**: Reference image layout.
- **OUTPUT**: HTML structure and styling for the two columns.
- **VERIFY**: Confirm categories (Casamentos, Aniversários, Corporativos, Festas Privadas) display with correct circular icons, and the bottom CTA banner is styled.

### Task 7: Restyle Simulator Quiz, Polaroid Sandbox, and FAQ
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P2
- **Dependencies**: Task 6
- **Description**: Restyle the remaining interactive features of the current site (Event Quiz, Polaroid Sandbox, FAQ) to use the new elegant color palette, borders, and typography.
- **INPUT**: Existing logic in `index.html`, `styles.css`, and `script.js`.
- **OUTPUT**: Clean, updated design for these elements matching the new site theme.
- **VERIFY**: Open the page and verify that these interactive components function perfectly and align with the elegant visual style.

### Task 8: Implement Slider and Navigation Script Adjustments
- **Agent**: `frontend-specialist`
- **Skills**: `clean-code`
- **Priority**: P2
- **Dependencies**: Task 7
- **Description**: Adjust `script.js` to ensure the menu slider, scroll offsets, contact variables (phone/email), and simulator logic are properly synchronized.
- **INPUT**: Reference content.
- **OUTPUT**: Updated event handlers in `script.js`.
- **VERIFY**: Click navigation links and test sliders to ensure smooth behavior.

## Phase X: Final Verification
- [ ] No purple/violet hex codes used (Purple Ban compliance).
- [ ] No generic/basic template styling.
- [ ] Run quality checks:
  ```bash
  python .agent/scripts/lint_runner.py .
  python .agent/skills/frontend-design/scripts/ux_audit.py .
  ```
