# Valkyr Tactical

A choose-your-own-adventure web game: grimdark military sci-fi with a romantasy twist, following an all-female mercenary outfit — Valkyr Tactical — on a contract that turns into a fight for their lives.

Plain HTML/CSS/JS. No build step, no dependencies.

## Play it on your iPhone

**Option A — GitHub Pages (recommended):**
1. In this repo on GitHub: **Settings → Pages → Source → Deploy from a branch**, pick the branch this was merged into (e.g. `main`) and folder `/ (root)`, then Save. This is a one-time manual step in the GitHub web UI.
2. After a minute, your game will be live at `https://yarry2323.github.io/ValkyrTactical/`. Open that URL in Safari on your iPhone.
3. Tap the Share icon → **Add to Home Screen** to get an app icon that launches full-screen, no browser bar.

**Option B — local preview (for testing on a computer):**
```
python3 -m http.server 8000
```
then open `http://localhost:8000` in a browser.

## Project structure

```
index.html          # page shell: title screen + game screen
manifest.json        # PWA manifest (Add to Home Screen / standalone mode)
css/style.css         # visual style
js/story.js           # the story itself — all scenes, choices, branching
js/engine.js           # game engine (rendering, state, save/continue/restart)
images/                # scene art goes here (see below)
```

To edit or expand the story, edit `js/story.js` only — you don't need to touch `engine.js` or the HTML/CSS.

## Adding real artwork

The game runs today with no art at all (scenes fall back to a stylized dark gradient). To add real images, drop a file into `images/` with the **exact filename** each scene already expects — no code changes needed:

Filenames below use `.jpg` as a placeholder extension — `.png` works too, just make sure the extension in `js/story.js`'s `image:` field for that scene matches the actual file you drop in.

Three scenes (`romance_scene`, `ending_triumph`, `ending_pyrrhic`, `ending_retreat`) personalize their text based on which squadmate you bonded with, so each needs **two image variants** — one per partner — picked automatically at runtime by `js/story.js`.

| Filename | Scene |
|---|---|
| `briefing.png` | Mission Briefing (done ✅) |
| `approach_stealth.png` | Into the Dark (stealth route, done ✅) |
| `approach_assault.png` | Guns Up (assault route, done ✅) |
| `combat_encounter.png` | Contact (done ✅) |
| `intel_discovery.png` | What the Walls Remember (done ✅) |
| `squad_confrontation.png` | A Fork in the Contract (done ✅) |
| `path_rogue_early.png` | Off the Leash (done ✅) |
| `romance_scene_kestrel.png` | Before the Storm — Kestrel variant (done ✅) |
| `romance_scene_vex.png` | Before the Storm — Vex variant (done ✅) |
| `final_battle.png` | The Reckoning (done ✅) |
| `battle_choice_press.png` | No Ground Given (done ✅) |
| `battle_choice_regroup.png` | Hold the Line (done ✅) |
| `ending_triumph_kestrel.png` | Ending: Exposed and Bonded — Kestrel variant |
| `ending_triumph_vex.png` | Ending: Exposed and Bonded — Vex variant |
| `ending_pyrrhic_kestrel.png` | Ending: Pyrrhic — Kestrel variant |
| `ending_pyrrhic_vex.png` | Ending: Pyrrhic — Vex variant |
| `ending_rogue_solo.jpg` | Ending: No Contract, No Colors |
| `ending_retreat_kestrel.png` | Ending: Fight Another Day — Kestrel variant |
| `ending_retreat_vex.png` | Ending: Fight Another Day — Vex variant |

Recommended size: portrait, roughly 3:4 (e.g. 1122×1402 or similar ratio), JPG or PNG.

### Art direction

Anime style: cel-shaded, manga/mecha-anime key-visual look, dynamic action poses, dark grimdark-tinted palette with crimson/neon accent lighting. Characters should read as striking, confident, adventurous "action-anime heroine" designs — exciting and a little sexy in presentation, kept tasteful rather than explicit.

### Character reference (keep consistent across prompts)

- **You / the Lieutenant (protagonist)**: long wavy dark hair, sharp features, dark tactical armor with a red-lined black cloak/cape. Recurring in nearly every scene so far.
- **Captain Osana Draeger**: dark hair in twin ponytails, same house armor.
- **Kestrel** (sniper/medic, quiet intensity): silver/white hair, calm and composed — she's the silver-haired squadmate already visible in the background of `briefing.png`, `approach_stealth.png`, and `squad_confrontation.png`.
- **Vex** (hotshot pilot, roguish charm): blonde undercut hair, tattoos, confident smirk — established in `romance_scene_vex.png`.

Mention the relevant character(s) by name/look in future prompts so the generator stays consistent instead of drawing a generic new face each time.

### Image prompts

Use these with your image-generation tool of choice. Style prefix to prepend to every prompt:

> *Anime key visual, cel-shaded, dynamic lighting, dark grimdark military sci-fi palette with crimson and neon accents, dramatic composition, confident and striking character design —*

| File | Prompt |
|---|---|
| `romance_scene_kestrel.png` | the Lieutenant (long dark wavy hair, black cloak) sharing a quiet intimate moment with Kestrel (silver/white hair, calm expression, sniper rifle nearby) on a cargo ramp at dusk, soft warm light against a cold industrial backdrop, romantic tension |
| `final_battle.jpg` | the Lieutenant and her squad dug into a ruined black-site facility as black gunships descend from a starry sky, dramatic wide shot, muzzle flashes |
| `battle_choice_press.jpg` | the Lieutenant and squadmates charging forward through gunfire and debris in a full-frontal assault, motion blur, intense action |
| `battle_choice_regroup.jpg` | the Lieutenant and squadmates taking defensive cover inside a fortified corridor, tactical formation, tense standoff lighting |
| `ending_triumph_kestrel.png` | the Lieutenant and Kestrel (silver/white hair) embracing triumphantly at sunrise over a battle-scarred moon base, romantic and victorious mood |
| `ending_triumph_vex.png` | the Lieutenant and Vex (blonde undercut, tattoos) embracing/kissing triumphantly at sunrise over a battle-scarred moon base, romantic and victorious mood |
| `ending_pyrrhic_kestrel.png` | the Lieutenant kneeling beside Kestrel's (silver/white hair) fallen body on a smoke-filled battlefield, grief and quiet victory, somber lighting |
| `ending_pyrrhic_vex.png` | the Lieutenant kneeling beside Vex's (blonde undercut, tattoos) fallen body on a smoke-filled battlefield, grief and quiet victory, somber lighting |
| `ending_rogue_solo.jpg` | the Lieutenant walking alone into a starship's shadow, silhouette against a distant explosion, isolated and resolute |
| `ending_retreat_kestrel.png` | the Lieutenant and Kestrel (silver/white hair) among the battered squad boarding their shuttle at dawn as it lifts off from the ash-fields, weary but alive, hopeful lighting |
| `ending_retreat_vex.png` | the Lieutenant and Vex (blonde undercut, tattoos) among the battered squad boarding their shuttle at dawn as it lifts off from the ash-fields, weary but alive, hopeful lighting |
| App icon (`icon-180.png` / `icon-192.png` / `icon-512.png`) | a minimalist emblem: a stylized crimson "V" wing/valkyrie insignia on a near-black background, flat icon style, clean edges |

The current `images/icon-*.png` files are simple code-generated placeholders (a crimson chevron on dark background) so "Add to Home Screen" works today — swap them out with real art any time using the same filenames.
