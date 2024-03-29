const tools = [
  {
    type: "function",
    function: {
      name: "extractAnimalDetail",
      description: "Display cat and breed from the user prompt",
      parameters: {
        type: "object",
        properties: {
          animal: {
            type: "string",
            description: "The animal type",
          },
          breed: {
            type: "string",
            description: "The cat breed",
          },
          number: {
            type: "number",
            description: "The number of cats",
          },
        },
        required: ["query"],
      },
    },
  },
];

export default tools;
