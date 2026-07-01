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

| Filename | Scene |
|---|---|
| `briefing.png` | Mission Briefing (done ✅) |
| `approach_stealth.png` | Into the Dark (stealth route, done ✅) |
| `approach_assault.png` | Guns Up (assault route, done ✅) |
| `combat_encounter.png` | Contact (done ✅) |
| `intel_discovery.png` | What the Walls Remember (done ✅) |
| `squad_confrontation.png` | A Fork in the Contract (done ✅) |
| `path_rogue_early.jpg` | Off the Leash |
| `romance_scene.jpg` | Before the Storm |
| `final_battle.jpg` | The Reckoning |
| `battle_choice_press.jpg` | No Ground Given |
| `battle_choice_regroup.jpg` | Hold the Line |
| `ending_triumph.jpg` | Ending: Exposed and Bonded |
| `ending_pyrrhic.jpg` | Ending: Pyrrhic |
| `ending_rogue_solo.jpg` | Ending: No Contract, No Colors |
| `ending_retreat.jpg` | Ending: Fight Another Day |

Recommended size: portrait, roughly 3:4 (e.g. 1122×1402 or similar ratio), JPG or PNG.

### Art direction

Anime style: cel-shaded, manga/mecha-anime key-visual look, dynamic action poses, dark grimdark-tinted palette with crimson/neon accent lighting. Characters should read as striking, confident, adventurous "action-anime heroine" designs — exciting and a little sexy in presentation, kept tasteful rather than explicit.

### Image prompts

Use these with your image-generation tool of choice. Style prefix to prepend to every prompt:

> *Anime key visual, cel-shaded, dynamic lighting, dark grimdark military sci-fi palette with crimson and neon accents, dramatic composition, confident and striking character design —*

| File | Prompt |
|---|---|
| `briefing.jpg` | a female mercenary captain in tactical armor leaning over a glowing holotable star-map inside a gunmetal-grey briefing room, other armored women visible in the background, tense mood |
| `approach_stealth.jpg` | two female soldiers in matte-black stealth armor moving low through a dust-storm at night on an alien moon, one carrying a sniper rifle, dramatic rim lighting |
| `approach_assault.jpg` | a squad of female mercenaries breaching a blast door in a fiery explosion, weapons raised, ash and sparks flying, high action energy |
| `combat_encounter.jpg` | a wounded enemy technician raising her hands in surrender inside a dark server-room corridor lit by red emergency lights, a female soldier's rifle aimed at her from foreground |
| `intel_discovery.jpg` | a female soldier reading classified files on a cracked terminal screen in a dim black-site server room, red warning lights reflected on her armor, ominous mood |
| `squad_confrontation.jpg` | a female mercenary captain and her lieutenant facing off in an ash-covered courtyard under a dying sun, tension between them, rest of the squad watching |
| `path_rogue_early.jpg` | a lone female mercenary lieutenant walking away from her squad's shuttle into darkness, defiant posture, storm clouds overhead |
| `romance_scene.jpg` | two female mercenaries sharing a quiet intimate moment on a cargo ramp at dusk, one field-stripping a rifle, soft warm light against a cold industrial backdrop, romantic tension |
| `final_battle.jpg` | a squad of female mercenaries dug into a ruined black-site facility as black gunships descend from a starry sky, dramatic wide shot, muzzle flashes |
| `battle_choice_press.jpg` | female mercenaries charging forward through gunfire and debris in a full-frontal assault, motion blur, intense action |
| `battle_choice_regroup.jpg` | female mercenaries taking defensive cover inside a fortified corridor, tactical formation, tense standoff lighting |
| `ending_triumph.jpg` | two female mercenaries embracing triumphantly at sunrise over a battle-scarred moon base, romantic and victorious mood |
| `ending_pyrrhic.jpg` | a female mercenary kneeling beside a fallen squadmate's body on a smoke-filled battlefield, grief and quiet victory, somber lighting |
| `ending_rogue_solo.jpg` | a lone female mercenary walking into a starship's shadow, silhouette against a distant explosion, isolated and resolute |
| `ending_retreat.jpg` | a battered squad of female mercenaries boarding their shuttle at dawn as it lifts off from the ash-fields, weary but alive, hopeful lighting |
| App icon (`icon-180.png` / `icon-192.png` / `icon-512.png`) | a minimalist emblem: a stylized crimson "V" wing/valkyrie insignia on a near-black background, flat icon style, clean edges |

The current `images/icon-*.png` files are simple code-generated placeholders (a crimson chevron on dark background) so "Add to Home Screen" works today — swap them out with real art any time using the same filenames.
