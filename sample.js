{
	name: "Sample Adventure",
	language: "en",
	style: "sample.css",
	
	variables: {
		"hp": {
			name: "Hit Points",
			value: 5,
			visible: true
		},
		"money": {
			name: "Money",
			value: 0,
			visible: true
		}
	},
	
	locations: {
		"start": {
			name: "Starting place",
			description: "This is a starting location, as well as an index place.",
			flags: AGE.LOCATION_START | AGE.LOCATION_INDEX,
			actions: [
				{
					description: "Go to place A",
					location: "A"
				},
				{
					description: "Go to place B",
					location: "B"
				},
				{
					description: "Go to place C. This option is not available, unless you have some money.",
					location: "C",
					requires: {
						"money": ">1"
					}
				}
			]
		},
		
		"A": {
			name: "Place A",
			description: "You can earn money here.",
			actions: [
				{
					description: "Earn money.",
					variables: {
						"money": "+= 1"
					},
					result: "You earn some money."
				}
			]
		},

		"B": {
			name: "Place B",
			description: "This is a very dangerous place. One can lose a hitpoint or two here. But only when you have >1 HP :)",
			actions: [
				{
					description: "Do something risky.",
					alternatives: [
						{
							requires: {
								"hp": "== 1"
							},
							result: "You have only one hitpoint, so you decide not to risk."
						}
					],
					variables: {
						"hp": "-= 1"
					},
					result: "You lose one hitpoint."
				}
			]
		},
		
		"C": {
			name: "Place C",
			description: "Welcome to Place C. You are one step from winning!",
			actions: [
				{
					description: "I will do nothing.",
					result: "You stay and do nothing."
				},
				
				{
					description: "I will go to the end location.",
					location: "end"
				}
			]
		},

		"end": {
			name: "End of the game!",
			description: "Congratulations, you won this sample game.",
			flags: AGE.LOCATION_END
		}
	}
	
}
