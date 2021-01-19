// const consoleLog = "javascript:console.log('Hello')";

const initialState = {
  chapters: [
    {
      id: "ch1",
      name: "The Beach"
    },
    {
      id: "ch2",
      name: "Entering Moonhaven"
    },
    { id: "ch3", name: "The dinner fight" },
    { id: "ch4", name: "Ubal’s house" }
  ],
  npcs: [
    {
      id: "npcs-header",
      value: "NPC's",
      disabled: true
    },
    {
      id: "np5",
      value: "Syka Twocreek",
      description: "Human female, Chaotic good",
      content:
        "Young girl that helps them at the start. She is the daughter of the village elder and good friends with the tortles. Didn’t eat fish because her mother the village elder doesn’t like it."
    },
    {
      id: "np6",
      value: "Lura Twocreek",
      description: "Human female, Neutral good",
      content:
        "Village elder, human woman in her 50s. She is concerned with the villagers. She doesn’t like fish so she isn’t affected by the addiction. Lived in the town since her childhood."
    },
    {
      id: "np7",
      value: "Kilki",
      description: "Tortle Male, Neutral good",
      content: "Retired old monk Tortle."
    },
    {
      id: "np8",
      value: "Falmo",
      description: "Tortle Male, Neutral Neutral",
      content:
        "A surfing dude Tortle with a floral headband. Loves to surf the waves on his belly and shield. Didn’t eat fishes because he doesn’t like to eat creatures. Wears a necklace with a bear tooth on it."
    }
  ],
  monsters: [
    {
      id: "monsters-header",
      value: "Monsters",
      disabled: true
    },
    {
      id: "mo9",
      value: "Giant Scorpion",
      description: "Large beast, unaligned",
      content:
        "Multiattack: The scorpion makes three attacks: two with its claws and one with its sting."
    },
    {
      id: "mo10",
      value: "Giant Crab",
      description: "Large beast, unaligned",
      content:
        "Multiattack: The scorpion makes two attacks: two with its claws."
    }
  ]
};

const reducer = (state = initialState, action) => {
  return state;
};
export default reducer;
