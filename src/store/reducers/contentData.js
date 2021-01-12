const initialState = {
  chapters: [
    {
      id: "1",
      name: "The Beach"
    },
    {
      id: "2",
      name: "Entering Moonhaven"
    },
    { id: "3", name: "The dinner fight" },
    { id: "4", name: "Ubal’s house" }
  ],
  npcs: [
    {
      id: "3",
      name: "Syka Twocreek",
      description: "Human female, Chaotic good"
    },
    {
      id: "4",
      name: "Lura Twocreek",
      description: "Human female, Neutral good"
    },
    { id: "5", name: "Kilki", description: "Tortle Male, Neutral good" },
    { id: "6", name: "Falmo", description: "Tortle Male, Neutral Neutral" }
  ]
};

const reducer = (state = initialState, action) => {
  return state;
};
export default reducer;
