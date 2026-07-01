// Valkyr Tactical — story data.
// Pure data: no engine logic lives here. Each scene has:
//   id, title, text (string OR function(state) => string), image (filename in /images),
//   choices: [{ label, next, effects }], ending (bool)
const STORY = {
  start: "briefing",
  scenes: {

    briefing: {
      id: "briefing",
      title: "Mission Briefing",
      image: "briefing.png",
      text: `The Hyades Cluster doesn't do sunrises. It does slow grey dawns choked with ash from a hundred dead industries, and tonight the light bleeding through the hangar's blast shutters is the color of a healing bruise. Valkyr Tactical's dropship crouches on the deck like something asleep, hull plating scarred with eleven years of contracts that should have killed all of you twice over. A maintenance drone hisses coolant into the dark somewhere behind the crates. The air smells like ozone and gun oil and the particular staleness of recycled atmosphere that's been breathed by the same six women for far too many months.

Captain Osana Draeger stands over the holotable at the center of the bay, jaw tight, silver-shot hair scraped back hard enough to argue with gravity. She's got eleven years on you and every one of them shows in the set of her shoulders. The projection throws pale blue light across a corporate "research outpost" buried in the ash-fields of a nameless rock designated KX-19 — clean lines, sanitized signage, the kind of facility that looks perfectly innocent right up until you're standing inside it.

"Client wants extraction. No fuss, no fireworks," Draeger says, without looking up. Behind you, Vex snorts into her coffee. "No fuss," she echoes, just loud enough for the squad to catch. "That's what they said about the Corvid Station job. Kestrel still has the scar." "I have several scars from that job," Kestrel says without turning around, checking the action on her rifle with the unhurried patience of someone who has field-stripped it a thousand times and will do it a thousand more. "Try to be specific."

Draeger's eyes finally lift to yours, and whatever weariness lives in the rest of her face, it isn't in that look — that's still command, still trust, still the thing that's kept this outfit alive through worse contracts than this one promises to be. "How we go in, and who's got your back going in — that's your call, Lieutenant. Always is." Somewhere to your left, Kestrel's gaze finds yours and holds, steady as a scope reticle. To your right, Vex is already grinning like she knows exactly which way you're leaning, and finds it hilarious.`,
      choices: [
        { label: "Stealth in low — let Kestrel talk you through it first", next: "approach_stealth", effects: { bondedWith: "kestrel", approach: "stealth" } },
        { label: "Stealth in low — trade banter with Vex over comms first", next: "approach_stealth", effects: { bondedWith: "vex", approach: "stealth" } },
        { label: "Hit the front door hard — Kestrel steadies you beforehand", next: "approach_assault", effects: { bondedWith: "kestrel", approach: "assault" } },
        { label: "Hit the front door hard — Vex is already grinning", next: "approach_assault", effects: { bondedWith: "vex", approach: "assault" } }
      ]
    },

    approach_stealth: {
      id: "approach_stealth",
      title: "Into the Dark",
      image: "approach_stealth.png",
      text: (state) => {
        let out = `You cut the running lights and drop the shuttle through KX-19's ash storms, and the whole world goes the color of a dead television — grey static scrolling past the viewport, embers guttering somewhere below like the moon itself is smoldering. The engines throttle down to a whisper, then to nothing at all. Your pulse fills the silence instead.

Boots hit ash in a line, one after another, radio-silent, thruster-whisper quiet against the wind. Nobody talks above a breath. Nobody needs to — eleven years of contracts have taught this squad how to move like a single animal with twelve legs and one heartbeat.

`;
        if (state.bondedWith === "kestrel") {
          out += `Kestrel keeps pace at your shoulder, rifle broken down and slung rather than carried, because she doesn't need it assembled to still be the most dangerous person on this rock. Her voice is a thread in your ear, barely audible even over close comms: "Nice and slow, Lieutenant. I've got the exits." There's something almost unbearably intimate about that voice this close, this quiet — like she's speaking only to you, and the ash-storm is simply being polite by not listening. Her calm is the only warm thing on KX-19 tonight, and you find yourself matching your breathing to hers without ever deciding to.

`;
        } else {
          out += `Vex is a shadow two steps ahead, and even at a hush her voice carries the ghost of a grin: "Sneaking's boring, but fine — I'll make it look good." She hasn't gone a single day of her life without saying something reckless out loud. Tonight, somehow, for you, she's found the discipline to keep it to a whisper — and there's something almost more dangerous about a quiet Vex than a loud one, like watching a knife get sheathed instead of thrown.

`;
        }
        out += `The outpost's east maintenance hatch is exactly where the intel said it would be, unlocked, unguarded, and lit from within by a soft, expectant blue. Too exactly. Gift horses don't usually come with their mouths already open.`;
        return out;
      },
      choices: [{ label: "Continue", next: "combat_encounter" }]
    },

    approach_assault: {
      id: "approach_assault",
      title: "Guns Up",
      image: "approach_assault.png",
      text: (state) => {
        let out = `You come in loud, because subtlety was never actually on the table — thrusters flaring bright enough to paint the ash-fields gold, door charges primed before the shuttle's skids have finished kissing the ground. This is Valkyr Tactical's other language, the one that doesn't need translating: overwhelming, immediate, and profoundly uninterested in anyone's opinion about it.

`;
        if (state.bondedWith === "kestrel") {
          out += `Kestrel's beside you at the breach point, rifle up, stance perfect, eyes flat and utterly, terrifyingly ready. "On your mark," she says — two words, no tremor in them at all, or none she'll ever let you see. You've fought beside her through six contracts and you still don't know if that stillness is confidence or something colder. Either way, you trust it with your life. You already have, six times.

`;
        } else {
          out += `Vex struts down the ramp like she's arriving at a party she's certain she was invited to, sidearms drawn, laughing at absolutely nothing except her own nerves doing exactly what nerves do right before a fight. "Let's give 'em something to write home about," she says, and winks at you like the two of you are sharing a secret the rest of the squad isn't in on. Maybe you are.

`;
        }
        out += `The outpost's front doors blow inward in a gout of fire and shrapnel-bright light. Whatever's waiting for you inside knows you're coming now — the only question left is whether it's ready.`;
        return out;
      },
      choices: [{ label: "Continue", next: "combat_encounter" }]
    },

    combat_encounter: {
      id: "combat_encounter",
      title: "Contact",
      image: "combat_encounter.png",
      text: `Inside, the polite fiction of a "research outpost" dies fast. Corridors that should hold server racks and climate control instead hold restraint chairs bolted to the floor, drainage grates that have seen more than coolant, hardware humming at a frequency that makes your teeth ache — nothing on any manifest a client would show a mercenary company hired for something as simple as extraction.

Gunfire chases you deeper before it stops chasing you at all. Smoke curls from a ruptured conduit, red emergency light stuttering off wet floor tile. And then, stumbling out of a side corridor with her hands already rising, weaponless, bleeding from a scalp wound she probably doesn't know she has yet — a technician. Young. Terrified. Very obviously not a soldier.

Somewhere behind you, you hear Vex's rifle track her, then Kestrel's voice, quieter, unreadable: "Lieutenant. Call it."`,
      choices: [
        { label: "Lower your weapon. Take her alive.", next: "intel_discovery", effects: { sparedEnemy: true, morale: 1 } },
        { label: "No witnesses. Finish it.", next: "intel_discovery", effects: { sparedEnemy: false, morale: -1 } }
      ]
    },

    intel_discovery: {
      id: "intel_discovery",
      title: "What the Walls Remember",
      image: "intel_discovery.png",
      text: (state) => {
        if (state.sparedEnemy) {
          return `The technician talks fast, words tumbling over each other like she's been waiting months for someone to finally ask, hands still shaking even after you've lowered your weapon. Her name is Priya. She wasn't hired to build weapons — she was hired to build a filing system for something called PROJECT CERBERUS, and three weeks ago she finally understood exactly what she was filing.

"This was never a research post," she says, and now she won't stop talking, like the truth has been clawing at the inside of her teeth for weeks. "It's a black site. Valkyr Tactical wasn't hired to extract data — you were hired to make sure nobody survived to describe what happened here. That includes you. All of you. Once the job was done, you were the next line item."

Down the corridor, a comm crackles — Draeger, waiting for you to bring this back to her.`;
        }
        return `You don't get answers from the dead — but you get something better. A terminal, cracked open by whatever fight happened in this corridor before you arrived, still logged into a directory labeled PROJECT CERBERUS, CLEARANCE: OMEGA BLACK. Kestrel crouches beside you, expression unreadable in the red emergency light, and starts pulling files faster than you can read the headers.

The truth comes up in pieces, cold and clinical: this was never a research post. It's a black site. And Valkyr Tactical wasn't hired to extract data — you were hired to erase every witness. The contract's fine print, translated honestly for the first time, ends with your own squad's designation. Eventually, you were supposed to be the last file closed.

Down the corridor, a comm crackles — Draeger, waiting for you to bring this back to her.`;
      },
      choices: [{ label: "Continue", next: "squad_confrontation" }]
    },

    squad_confrontation: {
      id: "squad_confrontation",
      title: "A Fork in the Contract",
      image: "squad_confrontation.png",
      text: `You gather the squad in the ash-blasted courtyard between the outpost's shattered facade and the waiting dropship, tablet held out like evidence at a trial nobody asked to attend. Draeger reads it twice. Doesn't rush. When she finally looks up, her face has gone somewhere flat and careful — the expression of a woman doing arithmetic she doesn't like the answer to.

"If this is real—" she starts, and stops, because you both already know it's real. "The client's already planning our funeral." Beside her, Kestrel has gone very still, the particular stillness of someone counting how many ways this could go wrong and not liking any of the totals. Vex, for once, isn't smiling. "We report it up the chain," Draeger says. "Quiet. Careful. By the book." A pause, long enough to feel. "Or—" She doesn't finish the sentence. Eleven years of command has taught her exactly which silences do more work than words.

Every eye in that courtyard is on you now — Draeger's steady, Kestrel's searching, Vex's bright and reckless and already halfway to a decision of her own. Whatever you say next, it isn't just yours anymore.`,
      choices: [
        { label: "Trust the Captain. Do this by the book.", next: "romance_scene", effects: { trustedCaptain: true } },
        { label: "The book got people killed. Go around her — now.", next: "path_rogue_early", effects: { trustedCaptain: false, wentRogue: true, morale: -1 } }
      ]
    },

    path_rogue_early: {
      id: "path_rogue_early",
      title: "Off the Leash",
      image: "path_rogue_early.png",
      text: `You don't wait for permission. Two squadmates peel off with you without being asked twice — the kind of loyalty that isn't written into anyone's contract, the kind you don't get to keep testing forever. Draeger's voice cracks once over comms, sharp with a fury that's mostly fear wearing fury's clothes, and then goes silent in a way that feels heavier than shouting would have.

The ash-fields swallow the sound of your own footsteps. Whatever happens from here, there's no by-the-book fallback left to catch you. You made this choice. You get to own everything that comes after it — the victories and the price, both.`,
      choices: [{ label: "Continue", next: "final_battle" }]
    },

    romance_scene: {
      id: "romance_scene",
      title: "Before the Storm",
      image: (state) => state.bondedWith === "kestrel" ? "romance_scene_kestrel.png" : "romance_scene_vex.png",
      text: (state) => {
        if (state.bondedWith === "kestrel") {
          return `There's an hour before the counter-op — one hour, stolen out of a night that has no business giving you any — and Kestrel spends it beside you on the shuttle ramp, field-stripping her rifle with the unhurried precision of someone who does it as much for the quiet as for the maintenance. The ash-wind has died down to something almost gentle. For once, KX-19 isn't trying to kill you.

"You did the right thing back there," she says, not looking up, hands moving through the disassembly like a ritual she could perform blind. "Sparing her. Trusting the Captain. Both." Her voice carries none of the flatness it wears in a firefight — this is a different register entirely, low and unguarded, meant for exactly one person.

When she finally sets the rifle down and looks at you, really looks, the quiet intensity in her eyes says considerably more than the words did. You've spent months learning the language of Kestrel's silences — the ones that mean *watch that corner*, the ones that mean *I've got you*, the ones that mean nothing at all because she's simply chosen not to speak. This one is new. This one you feel in your sternum.

"Whatever happens tonight—" She stops. Reconsiders. Reaches out instead and tucks a strand of hair back from your face with a gentleness that doesn't belong anywhere near a sniper's hands, her fingers lingering half a second longer than the gesture strictly requires. Close enough now that you can count the flecks of grey in her eyes, feel the warmth coming off her skin in the cold ash-wind, hear the catch in her own breath that she can't quite discipline into stillness the way she disciplines everything else. "I'm glad it's you giving the orders," she finishes, quieter than before — and for a moment neither of you moves, the space between you charged enough that even the wind seems to be holding its breath, waiting to see which one of you closes it first.`;
        }
        return `There's an hour before the counter-op, and Vex finds you in the cargo bay, spinning a combat knife between her fingers with the idle, dangerous grace of someone who's never once considered dropping it. "Relax, Lieutenant, you look like you're about to propose," she says, grin sharp as the blade — and then, in the space of a single breath, drops the act entirely, and the grin goes somewhere softer and infinitely more dangerous.

"Hey." Just that, at first. She sheathes the knife, closes the distance between you without seeming to notice she's doing it, until there's barely a hand's width of humid cargo-bay air left between your bodies. "For what it's worth — I'd follow you into worse than this. Already have. Six times, if you're counting. I am."

Her hand finds yours, fingers lacing through with a boldness that doesn't match the sudden uncertainty flickering behind her eyes — Vex, who has never once hesitated before a firefight, hesitating now, here, in front of you. "I'm not good at the quiet parts," she admits, thumb tracing slow, absent circles over your knuckles that have nothing to do with comfort and everything to do with wanting an excuse to keep touching you. "Never have been. But I keep wanting to be quiet with you, specifically, and that's — that's new. That's a lot, actually."

She's close enough now that you can feel her breath against your jaw, warm and uneven, close enough that the ash-storms outside both fade to background noise beneath the much louder, much more urgent question of whether either of you is finally going to do something about a year of glances and near-misses and almost-touches. Her eyes drop to your mouth, then back up, silent permission and silent question both. "Tell me if I'm wrong," she murmurs. "I really, really don't want to be wrong about this one."`;
      },
      choices: [{ label: "Continue", next: "final_battle" }]
    },

    final_battle: {
      id: "final_battle",
      title: "The Reckoning",
      image: "final_battle.png",
      text: (state) => {
        let out = `The client's private security force arrives the way executions always do — efficiently, and without any interest in your opinion about it. Gunships black as the space between stars descend on the black site in a formation built for annihilation, not negotiation, running lights doused, intent written in the sheer overwhelming mathematics of their numbers. They haven't come to arrest you. They've come to bury the evidence, and the evidence is standing in a ruined courtyard with rifles in its hands.

`;
        if (state.wentRogue) {
          out += `You have no backup coming. No extraction on the board, no cavalry, nothing but the ship at your back, the squad at your sides, and whatever's left of a plan built in anger and revised at the speed of incoming fire. It should feel like less. Somehow, looking at the women dug in around you, it doesn't.`;
        } else {
          out += `Draeger got the warning out in time — static-laced, furious, and utterly, gloriously effective. Valkyr Tactical stands dug in around the black site's bones, weapons interlocking fields of fire the way eleven years of shared contracts teaches a unit to do without ever needing to discuss it. Whatever's coming down out of that sky, it's not going to find six easy kills.`;
        }
        out += `

Kestrel's already found her angle on the rooftop. Vex has the getaway shuttle's engines whining low, just in case. Somewhere in the smoke, Draeger is shouting orders that sound very much like *hold* and *now* in the same breath. It's time.`;
        return out;
      },
      choices: [
        { label: "Press the advantage — full frontal, right now.", next: "battle_choice_press" },
        { label: "Fall back, regroup, protect the squad first.", next: "battle_choice_regroup" }
      ]
    },

    battle_choice_press: {
      id: "battle_choice_press",
      title: "No Ground Given",
      image: "battle_choice_press.png",
      text: `There's no elegant tactic left worth pretending at — just violence in a straight line, and the desperate arithmetic that Valkyr Tactical, six mercenaries deep and one stolen black site's worth of proof richer, might actually hit harder than anyone descending on you expects. Muzzle flashes strobe the smoke into something almost beautiful. Somewhere close, someone is screaming orders that might be yours.

This is the part of the job nobody puts in the recruitment material — the part where the difference between a war story and a eulogy comes down to who commits harder, longer, past the point where committing stops making sense.`,
      choices: [
        { label: "Push through together — no one gets left in the dark.", next: "ending_triumph" },
        { label: "Buy the breakthrough with someone's cover fire.", next: "ending_pyrrhic" }
      ]
    },

    battle_choice_regroup: {
      id: "battle_choice_regroup",
      title: "Hold the Line",
      image: "battle_choice_regroup.png",
      text: `You pull the squad back into the black site's own architecture, turning someone else's black-ops corridors into a killbox built from someone else's blueprints — a petty, satisfying kind of justice. It buys time. Time to breathe, to reload, to look at the faces around you and take an inventory of exactly how much you have left to lose. It doesn't buy victory. Not yet. Maybe not at all.`,
      choices: [
        { label: "Hold here. Fight another day.", next: "ending_retreat" },
        { label: "This contract, this client, this life — walk away from all of it.", next: "ending_rogue_solo", effects: { wentRogue: true } }
      ]
    },

    ending_triumph: {
      id: "ending_triumph",
      title: "Exposed and Bonded",
      image: (state) => state.bondedWith === "kestrel" ? "ending_triumph_kestrel.png" : "ending_triumph_vex.png",
      ending: true,
      endingId: "triumph",
      text: (state) => {
        let out = `The black site's proof detonates across every open channel in the sector before the gunships can silence a single byte of it — encrypted, mirrored, unkillable the moment it leaves your hands. Valkyr Tactical didn't just survive the job. You took the client's carefully sanitized name and dragged it, screaming, into a light it will never recover from. By morning, "Project Cerberus" will be a word senators use to end each other's careers. By morning, you'll be a legend with a body count and a receipt.

`;
        if (state.bondedWith === "kestrel") {
          out += `That night — the first full night in longer than either of you can remember without an op hanging over it — Kestrel finds you on the ramp again, rifle finally, deliberately set aside for good. No maintenance ritual to hide behind this time. Just her, steady as ever, and a silence that has clearly run out of reasons to stay a silence. "I've been meaning to say something for weeks," she admits, and for the first time you've ever seen, her hands aren't quite steady. She says it anyway — quiet, unpolished, entirely unlike the calm precision of everything else about her — and this time, when the space between you closes, you're the one who closes it, and she meets you like she's been waiting through every one of those weeks for exactly this. The ash-storms outside have finally, blessedly, gone quiet.`;
        } else {
          out += `That night, Vex kisses you in front of the entire squad, loudly, thoroughly, and with the specific triumphant delight of someone who has been waiting for an excuse for months and has finally decided she doesn't need one. Draeger makes a valiant, doomed attempt to pretend not to notice, fails within about four seconds, and pours something from a bottle she's been hoarding since Corvid Station instead. Vex doesn't stop grinning against your mouth long enough to apologize for any of it. She has, notably, never once been sorry for anything in her life, and she's not about to start with this.`;
        }
        if (state.sparedEnemy) {
          out += `

The technician you spared testifies too, in the end — steady, furious, exactly the kind of witness that turns a war crime into a rescue narrative in the space of one sworn statement. The difference between the two, everyone will say later, was you.`;
        }
        return out;
      },
      choices: []
    },

    ending_pyrrhic: {
      id: "ending_pyrrhic",
      title: "Pyrrhic",
      image: (state) => state.bondedWith === "kestrel" ? "ending_pyrrhic_kestrel.png" : "ending_pyrrhic_vex.png",
      ending: true,
      endingId: "pyrrhic",
      effects: (state) => {
        if (state.bondedWith === "kestrel") return { kestrelAlive: false };
        return { vexAlive: false };
      },
      text: (state) => {
        const name = state.bondedWith === "kestrel" ? "Kestrel" : "Vex";
        return `You get your breakthrough. You get the client's carefully built name dragged through every court and headline in the sector, get the black site's existence confirmed by enough independent sources that no lawyer alive can bury it again. Valkyr Tactical gets to keep existing, officially, on the record, in the histories.

And you get all of it because ${name} held the line at the one door that mattered, laughing off the odds the way she always did, buying the rest of you the exact number of seconds required — and didn't run herself, not because she couldn't, but because somewhere along the way she'd already decided this squad was worth more than her own exit strategy.

You'll replay the last transmission for years. The particular note in her voice. The fact that she sounded, at the very end, almost amused — like this was, in its own terrible way, a joke only she was going to get. Valkyr Tactical survives, officially. Every one of you knows exactly what "officially" cost, and none of you will ever say the number out loud.`;
      },
      choices: []
    },

    ending_rogue_solo: {
      id: "ending_rogue_solo",
      title: "No Contract, No Colors",
      image: "ending_rogue_solo.png",
      ending: true,
      endingId: "rogue_solo",
      text: `You walk. Whatever Valkyr Tactical becomes after tonight, it becomes it without you in the room to see it — Draeger's last transmission dissolves into open-channel static, and somehow that silence is louder than every gunship that came screaming down out of the sky tonight combined.

There's no one left to banter with in the dark, no dry voice in your ear promising she's got the exits, no reckless grin daring you to survive one more impossible thing together. Just the ash-fields, the wreck of a starship's shadow ahead of you, and the particular, familiar weight of a choice that only ever had one name on it.

You get your revenge, eventually — cold, thorough, and entirely, hollowly yours. You get it alone. You always do. Somewhere behind you, a life you could have kept gets smaller and smaller against the burning skyline, and you don't let yourself look back long enough to watch it disappear.`,
      choices: []
    },

    ending_retreat: {
      id: "ending_retreat",
      title: "Fight Another Day",
      image: (state) => state.bondedWith === "kestrel" ? "ending_retreat_kestrel.png" : "ending_retreat_vex.png",
      ending: true,
      endingId: "retreat",
      text: (state) => {
        const name = state.bondedWith === "kestrel" ? "Kestrel" : "Vex";
        return `Valkyr Tactical melts back into the ash-fields the way it always has — bruised, broke, technically fugitives from a client with entirely too much money and entirely too little patience, and very much, stubbornly alive. Proof of a black site rides zipped into a courier's satchel bound for someone the client can't buy, can't threaten, and — this part matters — can't ignore.

It isn't over. It was never going to be over in one night; contracts like this one don't resolve, they just change shape. But the shuttle's engines are warm underfoot, the ash-storm has finally quieted to something almost like peace, and when ${name} catches your eye across the crowded shuttle bay and doesn't look away — doesn't even pretend to look away — neither, quite deliberately, do you.

There will be time to finish this conversation properly. For now, that held gaze across a bay full of exhausted, victorious mercenaries is more than enough of a promise.`;
      },
      choices: []
    }
  }
};
