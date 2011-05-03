{
	name: "Sample Adventure",
	language: "en",
	style: "sample.css",
	
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
		},
		"courage": {
			name: "Courage",
			value: true,
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
					
					alternatives: [
						{
							requires: {
								"money": ">-1 && Math.random() > 0.5"
							},
							location: "random2",
							result: "This is results #2"
						}
					],

					location: "random1",
					result: "This is result #1"
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
					variables: {
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
