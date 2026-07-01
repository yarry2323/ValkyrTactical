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
      text:
        "The Hyades Cluster is a graveyard of dead moons and deader contracts, and Valkyr Tactical just took another one. " +
        "Captain Osana Draeger stands over the holotable, jaw tight, projecting a corporate “research outpost” buried in the ash-fields of a nameless rock designated KX-19.\n\n" +
        "“Client wants extraction. No fuss, no fireworks,” she says. “How we go in, and who's got your back going in — that's your call, Lieutenant. Always is.”",
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
        let out = "You cut the running lights and drop the shuttle through KX-19's ash storms, radar-silent, thruster-whisper quiet against the wind. No one talks above a breath.\n\n";
        if (state.bondedWith === "kestrel") {
          out += "Kestrel keeps pace at your shoulder, rifle broken down and slung, voice low in your ear: “Nice and slow, Lieutenant. I've got the exits.” Her calm is the only warm thing on this rock.\n\n";
        } else {
          out += "Vex is a shadow ahead of you, grin audible even over comms: “Sneaking's boring, but fine — I'll make it look good.” She hasn't been quiet a day in her life. Somehow, tonight, she is.\n\n";
        }
        out += "The outpost's east maintenance hatch is exactly where the intel said it'd be. Too exactly.";
        return out;
      },
      choices: [{ label: "Continue", next: "combat_encounter" }]
    },

    approach_assault: {
      id: "approach_assault",
      title: "Guns Up",
      image: "approach_assault.png",
      text: (state) => {
        let out = "You come in loud — thrusters flaring, door charges primed before the shuttle's skids touch ash. Subtlety was never really the plan.\n\n";
        if (state.bondedWith === "kestrel") {
          out += "Kestrel's beside you at the breach point, rifle up, eyes flat and ready. “On your mark,” she says. No nerves in her at all — or none she'll show you.\n\n";
        } else {
          out += "Vex struts down the ramp like she owns the moon, sidearms drawn, laughing at nothing in particular: “Let's give 'em something to write home about.”\n\n";
        }
        out += "The outpost's front doors blow inward in a gout of fire. Whatever's waiting inside now knows you're coming.";
        return out;
      },
      choices: [{ label: "Continue", next: "combat_encounter" }]
    },

    combat_encounter: {
      id: "combat_encounter",
      title: "Contact",
      image: "combat_encounter.png",
      text:
        "Inside, the “research outpost” turns out to be something else entirely — server racks, restraint chairs, hardware that shouldn't exist on a client's manifest. " +
        "A single enemy technician stumbles into your path, wounded, weaponless, hands already rising.",
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
          return "The technician talks fast, desperate to live: this was never a research post — it was a black site. " +
            "Valkyr Tactical wasn't hired to extract data. You were hired to make sure nobody survived to describe what happened here. " +
            "Including your own squad, once the job was done.";
        }
        return "You don't get answers from the dead, but you get something better — a cracked terminal, still logged in. " +
          "The files spill out fast: this was never a research post. It was a black site. " +
          "And Valkyr Tactical wasn't hired to extract data. You were hired to erase every witness — including, eventually, yourselves.";
      },
      choices: [{ label: "Continue", next: "squad_confrontation" }]
    },

    squad_confrontation: {
      id: "squad_confrontation",
      title: "A Fork in the Contract",
      image: "squad_confrontation.png",
      text:
        "You gather the squad in the ash-blasted courtyard, tablet in hand, proof in your fist. Captain Draeger reads it twice, face unreadable. " +
        "“If this is real,” she says quietly, “the client's already planning our funeral. We report it up the chain — quiet, careful, by the book. Or…” " +
        "She doesn't finish the sentence. She doesn't have to.",
      choices: [
        { label: "Trust the Captain. Do this by the book.", next: "romance_scene", effects: { trustedCaptain: true } },
        { label: "The book got people killed. Go around her — now.", next: "path_rogue_early", effects: { trustedCaptain: false, wentRogue: true, morale: -1 } }
      ]
    },

    path_rogue_early: {
      id: "path_rogue_early",
      title: "Off the Leash",
      image: "path_rogue_early.png",
      text:
        "You break from the chain of command without waiting for permission, dragging two squadmates with you into the dark. " +
        "Draeger's voice crackles once over comms — furious, then gone silent. Whatever happens next, you own it alone.",
      choices: [{ label: "Continue", next: "final_battle" }]
    },

    romance_scene: {
      id: "romance_scene",
      title: "Before the Storm",
      image: (state) => state.bondedWith === "kestrel" ? "romance_scene_kestrel.png" : "romance_scene_vex.png",
      text: (state) => {
        if (state.bondedWith === "kestrel") {
          return "There's an hour before the counter-op, and Kestrel spends it beside you on the shuttle ramp, field-stripping her rifle by habit, not need. " +
            "“You did the right thing back there,” she says, not looking up. “Sparing her. Trusting the Captain. Both.” " +
            "When she finally meets your eyes, the quiet intensity there says more than the words did. “Whatever happens tonight — I'm glad it's you giving the orders.”";
        }
        return "There's an hour before the counter-op, and Vex finds you in the cargo bay, spinning a combat knife between her fingers like it's a coin trick. " +
          "“Relax, Lieutenant, you look like you're about to propose,” she teases — then, softer, drops the act entirely. " +
          "“Hey. For what it's worth — I'd follow you into worse than this. Already have.” She grins, but her hand finds yours anyway, just for a second.";
      },
      choices: [{ label: "Continue", next: "final_battle" }]
    },

    final_battle: {
      id: "final_battle",
      title: "The Reckoning",
      image: "final_battle.png",
      text: (state) => {
        let out = "The client's private security force descends on the black site in gunships black as the space between stars — sent not to arrest you, but to bury the evidence. " +
          "That evidence is your squad.\n\n";
        if (state.wentRogue) {
          out += "You have no backup coming. No extraction. Just the ship, the squad, and whatever's left of the plan you made in anger.";
        } else {
          out += "Draeger got the warning out in time — Valkyr Tactical stands ready, dug in, waiting for you to give the order.";
        }
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
      image: "battle_choice_press.jpg",
      text:
        "You commit everything. There's no elegant tactic left — just violence in a straight line, and the hope that Valkyr Tactical hits harder than anyone expects from six mercenaries and a stolen black site's worth of proof.",
      choices: [
        { label: "Push through together — no one gets left in the dark.", next: "ending_triumph" },
        { label: "Buy the breakthrough with someone's cover fire.", next: "ending_pyrrhic" }
      ]
    },

    battle_choice_regroup: {
      id: "battle_choice_regroup",
      title: "Hold the Line",
      image: "battle_choice_regroup.jpg",
      text:
        "You pull the squad back into the black site's own bones, turning the enemy's black-ops architecture into a killbox. It buys time. It doesn't buy victory — not yet.",
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
        let out = "The black site's proof goes out on every open channel in the sector before the gunships can silence it. " +
          "Valkyr Tactical didn't just survive the job — you buried the client's name in disgrace and made yourselves impossible to erase.\n\n";
        if (state.bondedWith === "kestrel") {
          out += "That night, Kestrel finds you on the ramp again, rifle finally set aside for good, and says the thing she's clearly meant to say for weeks. This time, you let her.";
        } else {
          out += "That night, Vex kisses you in front of the whole squad like she's been waiting for the excuse, laughing when Draeger pretends not to notice.";
        }
        if (state.sparedEnemy) {
          out += "\n\nThe technician you spared testifies, too — the difference between a war crime and a rescue, in the end, was you.";
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
        return "You get your breakthrough. You get the client's name dragged through every court in the sector. " +
          "And you get it because " + name + " held the line so the rest of you could run — and didn't run herself.\n\n" +
          "Valkyr Tactical survives, officially. Every one of you knows what “officially” cost.";
      },
      choices: []
    },

    ending_rogue_solo: {
      id: "ending_rogue_solo",
      title: "No Contract, No Colors",
      image: "ending_rogue_solo.jpg",
      ending: true,
      endingId: "rogue_solo",
      text:
        "You walk. Whatever Valkyr Tactical becomes after tonight, it becomes it without you — Draeger's last transmission is silence, and it's the loudest thing you've ever heard.\n\n" +
        "You get your revenge, eventually. You get it alone, same as always.",
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
        return "Valkyr Tactical melts back into the ash-fields, bruised, broke, and very much alive, proof of a black site zipped into a courier's satchel headed for someone the client can't buy.\n\n" +
          "It isn't over. It isn't supposed to be. And when " + name + " catches your eye across the shuttle bay and doesn't look away, neither is that.";
      },
      choices: []
    }
  }
};
