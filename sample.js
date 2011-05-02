var sample = {
	name: "Sample Adventure",
	language: "en",
	
	variables: {
		"hp": {
			name: "HitPoints",
			value: 5,
			visible: false
		},
		"money": {
			name: "Dollarz",
			value: 2,
			visible: true
		}
	},
	
	locations: {
		"start": {
			name: "Starting place",
			description: "wtf omg lol",
			flags: AGE.LOCATION_START | AGE.LOCATION_INDEX,
			actions: [
				{
					description: "Go to middle place",
					location: "middle"
				},
				
				{
					description: "Go randomly",
					modifies: {
						"location": "Math.random() > 0.5 ? 'random1' : 'random2'"
					}
				},
				
				{
					description: "Go to end",
					requires: {
						"money": ">= 3"
					},
					location: "end"
				},
				
			]
		},
		
		"middle": {
			name: "Middle place",
			description: "where do u go",
			actions: [
				{
					description: "Go to start place",
					location: "start"
				},
				
				{
					description: "Earn money",
					result: "You earn much money.",
					modifies: {
						"money": "+= 1"
					}
				}
			]
		},
		
		"random1": {
			name: "Random 1",
			actions: [
				{
					description: "Start",
					location: "start"
				}
			]
		},

		"random2": {
			name: "Random 2",
			actions: [
				{
					description: "Start",
					location: "start"
				}
			]
		},
		
		"end": {
			name: "End of the game!",
			description: "u win teh much.",
			flags: AGE.LOCATION_END
		}
	},
	
}
