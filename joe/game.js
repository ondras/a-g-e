{
	name: "Limonádový joe",
	language: "cs",
	style: "joe.css",
	
	variables: {
		"kolaloka": {
			value: 0,
			name: "Kolalokova limonáda",
			visible: true
		},
		"sirky": {
			value: 0,
			name: "Krabička sirek",
			visible: true
		},
		"nugety": {
			value: false,
			name: "Zlaté nugety",
			visible: true
		},
		"strela": {
			value: false,
			name: "Všeprorážející střela",
			visible: true
		},
		"muska": {
			value: false,
			name: "Bystrozraká muška",
			visible: true
		},
		"pero": {
			value: false,
			name: "Orlí pero",
			visible: true
		},
		"uver": {
			value: false,
			name: "Bankovní úvěr",
			visible: true
		},
		"mapa": {
			value: false,
			name: "Mapa Fata Morgana Valley",
			visible: true
		},
		"ostatky": {
			value: false,
			name: "Ostatky svatého Buhvíkoho",
			visible: true
		},
		"odpusteni": {
			value: false,
			name: "Odpuštění",
			visible: true
		},
		"banker": {
			value: false,
			name: "Bankéř",
			visible: true
		},
		"colt": {
			value: false,
			name: "Kouzelný Colt",
			visible: true
		},
		"karta-cervena": {
			value: false,
			name: "Červená karta",
			visible: true
		},
		"karta-cerna": {
			value: false,
			name: "Černá karta",
			visible: true
		}
	},

	locations: {
		"X": {
			name: "Památný strom – testovací stanoviště",
			image: "img/Strom.jpg",
			description: "Tento urostlý památný strom s nezvykle hladkou kůrou zde zasadil roku 1234 svatý Buhvíkdo. Neroste na něm sice žádné chutné ovoce, zato si však v koruně udělala hnízdo známá zlodějka straka.",
			actions: [
				{
					description: "Zkusím vylézt na strom a podívat se do hnízda.",
					result: "Prvních pár metrů šlo dobře, ale zhruba v půlce cesty se ti smýkla noha po hladké kůře stromu a spadl jsi zase na zem. V rámci rekonvalescence udělej kotrmelec."
				},
				{
					description: "Zkusím shodit hnízdo pomocí plastového Létajícího talíře.",
					result: "Trefa! Létající talíř se sice zasekl ve větvoví, ale hnízdo spadlo na zem. Vzal jsi si z něj krásnou Lesklou náušnici."
				},
				{
					description: "Tady se mi to nelíbí, chci raději jít jinam.",
					result: "Dobrá, jdi na začátek Opravdové hry: do Stetson City, na stanoviště A."
				}
			]
		},
		"A": {
			name: "Stetson City",
			image: "img/Stetson City.jpg",
			flags: AGE.LOCATION_START | AGE.LOCATION_INDEX,
			description: "Vítej ve Stetson City! Tohle ospalé westernové městečko na první pohled potřebuje ráznou ruku i mušku pistolníka. Ty, Limonádový Joe, máš ale cíl jiný – je třeba neutralizovat podlého Hogo Foga a osvobodit z jeho spárů krásnou Winifred Goodmanovou.",
			actions: [
				{
					description: "Jsem přece obchodní zástupce fy. Kolaloka a syn, poprosím proto svého skladníka, aby mi donesl nějakou Kolaloku.",
					result: "Než skladník donese Kolaloku, zvolej třikrát nahlas pokřik svého týmu. Tím získáš tři Lahve Kolaloky.",
					variables: {
						"kolaloka": "+= 3"
					}
				},
				{
					description: "Jsem přece obchodní zástupce fy. Kolaloka a syn, zahraju si proto se svým skladníkem karty.",
					result: "Karty jsi prohrál. Abys zahnal chmury, protáhni se a udělej deset dřepů."
				},
				{
					description: "Vydám se do Informační kanceláře města Stetson City.",
					result: "Jdeš do Informační kanceláře na stanoviště R.",
					location: "R"
				}
			]
		},
		"B": {
			name: "Banka",
			image: "img/Banka.jpg",
			description: "Ve všední den by tu jistě bylo plno, ale dnes – o víkendu – tu doslova chcíp pes (takže to tu pěkně smrdí). Místnosti jasně vévodí masivní trezor, který bude jistě skrývat nemálo hotovosti...",
			actions: [
				{
					description: "Počkám, jestli se někdo neobjeví.",
					result: "Tož počítáš do sta. Ale je víkend, nikdo nepřišel."
				},
				{
					description: "Dojdu k trezoru a zjistím, co by se z něj dalo odnést.",
					result: "Tvoje nakoukávání do trezoru kolemjdoucí šerif vyhodnotil jako pokus o vyloupení banky a okamžitě tasil kolty. Jdi do Vězení, na stanoviště J.",
					location: "J"
				},
				{
					requires: {
						"banker": "== true",
						"uver": "== false"
					},
					description: "Mám s sebou přece Bankéře, tak ať se chlapec činí!",
					result: "Bankéř ti ochotně poskytne Bankovní úvěr.",
					variables: {
						"uver": "= true"
					}
				}
			]
		},
		"C": {
			name: "Falešný hráč",
			image: "img/Falesny hrac.jpg",
			description: "Tak tenhle karbaník je skutečně mistr svého řemesla. Skrz jeho černé brýle není vidět ani náznak emocí, když ti nabídne balíček karet. \"Jednu si vezmi, cizinče – uvidíme, kam tě na tvé cestě zavede.\"",
			actions: [
				{
					description: "Ukážu Falešnému hráči Černou kartu.",
					requires: {
						"karta-cerna": "== true"
					},
					result: "Ukázal jsi Černou kartu a můžeš proto jít ke Kostelním vratům na stanoviště V.",
					location: "V"
				},
				{
					description: "Ukážu Falešnému hráči Červenou kartu.",
					requires: {
						"karta-cervena": "== true"
					},
					result: "Ukázal jsi Červenou kartu a můžeš proto jít do Trigger Whisky Saloonu na stanoviště W.",
					location: "W"
				},
				{
					description: "Vytáhnu si jednu kartu z balíčku.",
					alternatives: [
						{
							requires: {
								"kolaloka": ">-1 && Math.random() > 0.5"
							},
							result: "Karta je černá, nechej si ji a jdi ke Kostelním vratům na stanoviště V.",
							variables: {
								"karta-cerna": "= true"
							},
							location: "V"
						}						
					],
					result: "Karta je červená, nechej si ji a jdi do Trigger Whisky Saloonu na stanoviště W.",
					variables: {
						"karta-cervena": "= true"
					},
					location: "W"
				}
			]
		},
		"D": {
			name: "Marodka",
			image: "img/Marodka.jpg",
			description: "Na dveřích visí cedule: <br/>Tak popravdě, po kolikáté už tu jsi?",
			actions: [
				{
					description: "Poprvé",
					result: "Pamatuj, že Dvakrát měř a jednou řež. Udělej 15 dřepů a můžeš pokračovat."
				},
				{
					description: "Podruhé",
					result: "Pamatuj, že čistota je půl  zdraví. Udělej 15 kliků a můžeš pokračovat."
				},
				{
					description: "Potřetí",
					result: "Pamatuj, že veselá mysl je půl zdraví. Udělej 30 dřepů a můžeš pokračovat."
				},
				{
					description: "Počtvrté",
					result: "Pamatuj, že opatrnosti nikdy nezbývá. Tak jo, dnes to bude grátis, můžeš pokračovat."
				},
				{
					description: "Popáté",
					result: "Pamatuj, že kam nechodí slunce, chodí lékař. Udělej 10 kliků a 10 dřepů a můžeš pokračovat."
				},
				{
					description: "Pošesté či ještě víc",
					result: "Pamatuj, že veselý a čistý člověk je zdravý. Udělej 20 žabáků a můžeš pokračovat."
				}
			]
		},
		"E": {
			name: "Pokoj Hogo Foga, 1. patro Trigger Whisky Saloonu",
			image: "img/Pokoj HogoFogo.jpg",
			description: "Málokterý padouch působí tak sebejistě, jako zrádný Hogo Fogo. Z jeho doutníku v kousku úst stoupá tenký dým, když se na tebe podívá pohledem tak křivým, jako je ostří kosy. Všímáš si, že v zadním koutu místnosti leží spoutaná Winifred Goodmanová.",
			actions: [
				{
					alternatives: [
						{
							requires: {
								"colt": "== true"
							},
							result: "Všeprorážející střela vypálená z Kouzelného Coltu, tak před tím neuhne opravdu nikdo. Hogo Fogo to koupil!",
							location: "Z"
						}
					],
					description: "Tasím zbraň a pálím na Hogo Foga.",
					result: "Hogo Fogo je na tebe ale už připravený. Bleskurychle tasí skrytý revolver a tím tě posílá na Marodku, na stanoviště D.",
					location: "D"
				},
				{
					description: "Pokusím se využít příležitosti a zneuctít svázanou Winifred Goodmanovou.",
					result: "Tak takovéhle pokusy se Winifred Goodmanové opravdu nelíbí. Zle tě poškrábala a pokousala, jdi na Marodku na stanoviště D.",
					location: "D"
				},
				{
					description: "Půjdu zpět ke dveřím Trigger Whisky Saloonu.",
					result: "Jdeš do Trigger Whisky Saloonu, stanoviště W.",
					location: "W"
				}
			]
		},
		"F": {
			name: "Indiánský šaman",
			image: "img/Saman.jpg",
			description: "Šaman zvedne zrak od prastarého ohně, zamyslí se a zvolna praví: \"Mnozí už zkoušeli přemoci záludného Hogo Foga, avšak nikdo neuspěl. Možná by jim byl pomohl Kouzelný Colt, jenže k jeho výrobě jsou potřeba čtyři magické substance: <em>Orlí pero</em>, <em>Všeprorážející střela</em>, <em>Bystrozraká muška</em> a <em>Bankovní úvěr</em>. Když mi je seženeš, mohu být nápomocen.\"",
			actions: [
				{
					description: "Mám všechny substance a prosím proto Šamana, aby mi vyrobil Kouzelný Colt.",
					requires: {
						"uver": "== true",
						"strela": "== true",
						"muska": "== true",
						"pero": "== true"
					},
					variables: {
						"uver": "= false",
						"strela": "= false",
						"muska": "= false",
						"pero": "= false",
						"colt": "= true"
					},
					result: "Šaman ti odebral magické substance a vyrobil z nich nádherný a lesklý Kouzelný Colt. Získáváš patrně nejmocnější zbraň Divokého západu."
					
				},
				{
					description: "Půjdu do Banky získat úvěr.",
					result: "Jdeš do Banky na stanoviště B.",
					location: "B"
				},
				{
					description: "Vydám se do Dead Man's Valley hledat magické substance.",
					result: "Jdeš do Dead Man's Valley na stanoviště S1.",
					location: "S1"
				},
				{
					description: "Vydám se do Fata Morgana Valley hledat magické substance.",
					result: "Jdeš do Fata Morgana Valley na stanoviště S2.",
					location: "S2"
				}
			]
		},
		"H": {
			name: "Dostavník",
			image: "img/Dostavnik.jpg",
			description: "Dostavníkem se lze dostat i do nebezpečných vzdálených krajů. Chce to ale hodně kuráže, dobrého kočího a zpravidla i přesnou mušku.",
			actions: [
				{
					description: "Nechám se dostavníkem svézt do Jeskyně Pancho Kida ve skalách.",
					result: "Jedeš do Jeskyně Pancho Kida na stanoviště U.",
					location: "U"
				},
				{
					description: "Zajdu se nejprve posilnit do Kolaloka Saloonu.",
					result: "Jdeš do Kolaloka Saloonu na stanoviště K.",
					location: "K"
				},
				{
					description: "Strávím chladnou noc v bezpečí dostavníku.",
					result: "V noci tě v dostavníku okradli bandité. Přicházíš o všechny Lahve Kolalokovy limonády, Zlaté nugety a Krabičky sirek.",
					variables: {
						"kolaloka": "=0",
						"sirky": "=0",
						"nugety": "=false"
					}
				}
			]
		},
		"J": {
			name: "Vězení",
			image: "img/Vezeni.jpg",
			description: "Za své činy se ocitáš ve věznici. Uprchnout odsud, to nebude snadné.",
			actions: [
				{
					description: "Vykopu si únikový tunel.",
					result: "No to tě čeká spousta dřiny. Udělej 20 žabáků. Pak musíš změnit identitu, takže jdi na začátek Stetson City na stanoviště A. Tvoje věci a know-how ti zůstávají.",
					location: "A"
				},
				{
					description: "Přepiluju mříže.",
					result: "To dá ale spoustu práce! Udělej 20 dřepů. Pak musíš změnit identitu, takže jdi na začátek Stetson City na stanoviště A. Tvoje věci a know-how ti zůstávají.",
					location: "A"
				},
				{
					description: "Žádné prchání. Jako poctivý vězeň si zodpovědně odsedím svůj trest. A třeba mne propustí dříve za vzorné chování.",
					result: "Pamatuj, že kdo si počká, ten se dočká. Počítej nahlas do 100, tak, aby tě slyšel nejbližší bachař. Pak můžeš jít do Informační kanceláře na stanoviště R.",
					location: "R"
				}
			]
		},
		"K": {
			name: "Kolaloka Saloon",
			image: "img/Kolaloka Saloon.jpg",
			description: "Tak na tomhle místě se cítíš jako doma. Příjemná muzika, usměvavý hostinský a všudypřítomné lahve s Kolalokou. Co si dáš?",
			actions: [
				{
					description: "Nedám si nic; namísto toho se vychytrale vmísím do hloučku místních bujarých pijanů a pokusím se zaslouchnout nějaké zajímavé informace.",
					result: "Všichni jsou vlivem nasávání Kolaloky v takové euforii, že nikomu není nic rozumět."
				},
				{
					description: "Koupím si pořádnou večeři.",
					
					alternatives: [
						{
							requires: {
								"nugety": "== false"
							},
							result: "Nemáš žádný Zlatý nuget! A kdo nemá čím zaplatit, musí do Vězení. Jdi do Vězení na stanoviště J.",
							location: "J"
						}
					],
					
					result: "Dáváš si super večeři. Mňam!"
				},
				{
					description: "Koupím si krabičku sirek.",

					alternatives: [
						{
							requires: {
								"nugety": "== false"
							},
							result: "Nemáš žádný Zlatý nuget! A kdo nemá čím zaplatit, musí do Vězení. Jdi do Vězení na stanoviště J.",
							location: "J"
						}
					],

					result: "Otoč se pětkrát na místě dokolečka a získáš tak Krabičku sirek. Pěkná, jsou v ní sirky. Chrastí.",
					variables: {
						"sirky": "+= 1"
					}
				},

				{
					description: "Koupím si uzený kojotí jazyk.",

					alternatives: [
						{
							requires: {
								"nugety": "== false"
							},
							result: "Nemáš žádný Zlatý nuget! A kdo nemá čím zaplatit, musí do Vězení. Jdi do Vězení na stanoviště J.",
							location: "J"
						}
					],

					result: "Chuťově nic extra, ale tvého zájmu v regionálních pochoutkách si všiml kolemjdoucí Indiánský Šaman a pozval tě do svého wigwamu. Jdi k Šamanovi na stanoviště F.",
					location: "F"
				}
			]
		},
		"M": {
			name: "Hřbitov",
			image: "img/Hrbitov.jpg",
			description: "Na hřbitově jsou, překvapivě, hroby. Řada z nich je částečně rozbitá, vyloupená či poničená. Už z dálky je poznat, že v jednom z hrobů se leskne několik zlatých nugetů – jenže na náhrobní desce si hoví svinutý chřestýš. Co s tím?",
			actions: [
				{
					description: "Nabídnu chřestýšovi Lahev Kolalokovy limonády.",
					requires: {
						"kolaloka": ">0"
					},
					variables: {
						"kolaloka": "-= 1"
					},
					result: "Chřestýš Lahev vypil, ale nezdá se, že by mu moc chutnala."
				},
				{
					description: "Zabiju chřestýše.",
					result: "Při tomto zoufalém pokusu tě had uštknul. Jdi na Marodku na stanoviště D.",
					location: "D"
				},
				{
					description: "Pokusím se chřestýše obejít a rychle nabrat pár Zlatých nugetů.",
					result: "Chřestýše jsi obcházel takovým obloukem, že jsi při tom zabloudil do Dead Man's Valley. Jdi na stanoviště S1.",
					location: "S1"
				},
				{
					description: "Odpočinu si, třeba přijdu na jiné myšlenky.",
					alternatives: [
						{
							requires: {
								"nugety": "== false"
							},
							result: "Tak dlouho jsi odpočíval, až chřestýš usnul. Využil jsi situace a nabral dostatečnou zásobu Zlatých nugetů (jistě budou stačit na všechny nákupy)!",
							variables: {
								"nugety": "= true"
							}
						}
					],
					result: "Odpočinek byl příjemný. Bohužel tě nic objevného nenapadlo."
				}
			]
		},
		"N": {
			name: "Nádraží",
			image: "img/Nadrazi.jpg",
			flags: AGE.LOCATION_INDEX,
			description: "Na tomhle opuštěném nádraží moc často lokálka nestaví. Čas od času se ale lze na železném oři dostat do různých odlehlých míst...",
			actions: [
				{
					description: "Vrátím se zpět do Informační kanceláře.",
					result: "Jdeš do Informační kanceláře na stanoviště R.",
					location: "R"
				},
				{
					description: "Pojedu vlakem směrem ke Hřbitovu",
					result: "Jedeš na Hřbitov na stanoviště M.",
					location: "M"
				},
				{
					description: "Pojedu vlakem k domku Falešného hráče",
					result: "Jedeš k Falešnému hráči na stanoviště C.",
					location: "C"
				},
				{
					description: "Pojedu vlakem k Bance",
					result: "Jedeš k Bance na stanoviště B.",
					location: "B"
				}
			]
		},
		"O": {
			name: "Tornado Lou",
			image: "img/Tornado Lou.jpg",
			description: "V Trigger Whisky Saloonu zpívá proslulá Arizonská pěnice Tornádo Lou. Je smutná, neboť si uvědomuje, že její hříchy už přesáhly některé meze.",
			actions: [
				{
					description: "Nabídnu této Arizonské pěnici Odpuštění.",
					requires: {
						"odpusteni":"==true"
					},
					result: "Tornádo Lou zapěla: \"Konečně budu jinou!\" a z vděčnosti ti věnovala Mapu Fata Morgana Valley.",
					variables: {
						"odpusteni":"=false",
						"mapa":"=true"
					}
				},
				{
					description: "Nabídnu této Arizonské pěnici neslušný návrh.",
					result: "No to sis dal. Pohlavní choroby nejsou nic příjemného a jejich léčení teprve ne. Upaluj na Marodku na stanoviště D.",
					location: "D"
				},
				{
					requires: {
						"sirky":">0"
					},
					description: "Nabídnu této Arizonské pěnici, že jí připálím její špičku s cigaretou.",
					result: "To umělkyni tak rozparádilo, že ti vzala všechny Krabičky sirek, které s sebou máš.",
					variables: {
						"sirky":"=0"
					}
				},
				{
					description: "Půjdu zpět ke dveřím Trigger Whisky Saloonu.",
					result: "Jdeš do Trigger Whisky Saloonu, stanoviště W.",
					location: "W"
				}
			]
		},
		"P": {
			name: "Kostel",
			image: "img/Kostel.jpg",
			description: "Není překvapením, že v bezbožném Stetson City jsou kostelní lavice zcela prázdné. Kolem Oltáře krouží a bzučí malé mušky...",
			actions: [
				{
					requires: {
						"sirky":">0",
						"muska":"== false"
					},
					description: "Vysypu jednu Krabičku sirek a zkusím do ní chytit nějakou mušku.",
					result: "Ale to je náhoda! Vysypal jsi jednu Krabičku sirek a chytil do ní – světe div se – magickou Bystrozrakou mušku!",
					variables: {
						"sirky":"-= 1",
						"muska":"= true"
					}
				},
				{
					description: "Prohlédnu si barevné vitráže v oknech.",
					result: "Jsou skutečně krásné. Většina z nich samosebou zobrazuje hrdinské činy svatého Buhvíkoho."
				},
				{
					description: "Vyberu obsah pokladničky na dobročinné dary.",
					result: "Tvého podlého skutku si bohužel všiml farář a hned zavolal šerifa; jdi do Vězení na stanoviště J.",
					location: "J"
				}
			]
		},
		"R": {
			name: "Informační kancelář",
			image: "img/Informace.jpg",
			flags: AGE.LOCATION_INDEX,
			description: "Do Informační kanceláře zavítá dříve nebo později každý turista. Možná i proto za přepážkou sedí nezvykle půvabná a na první pohled osamělá úřednice. V tomto parném dni si musela rozepnout blůzku až o tři knoflíčky...",
			actions: [
				{
					description: "Nabídnu slečně Lahev Kolalokovy limonády a optám se, kudy do Kolaloka Saloonu.",
					requires: {
						"kolaloka":">0"
					},
					result: "Slečna je potěšena a s úsměvem ti připomíná, že v Kolaloka Saloonu se platí Zlatými nugety. Přicházíš o Lahev Kolaloky a jdeš do Kolaloka Saloonu, na stanoviště K.",
					variables: {
						"kolaloka":"-= 1"
					},
					location: "K"
				},
				{
					description: "Nabídnu slečně Lahev Kolalokovy limonády a optám se, kudy na Nádraží.",
					requires: {
						"kolaloka":">0"
					},
					result: "Přicházíš o Lahev Kolaloky a jdeš na Nádraží, na stanoviště N.",
					variables: {
						"kolaloka":"-= 1"
					},
					location: "N"
				},
				{
					description: "Nabídnu slečně Lahev Kolalokovy limonády a optám se, kudy na stanoviště Dostavníku.",
					requires: {
						"kolaloka":">0"
					},
					result: "Přicházíš o Lahev Kolaloky a jdeš k Dostavníku, na stanoviště H.",
					variables: {
						"kolaloka":"-= 1"
					},
					location: "H"
				},
				{ 	
					description: "Nabídnu slečně Lahev Kolalokovy limonády a optám se, jestli by si nechtěla rozepnout další knoflíček na blůze.",
					requires: {
						"kolaloka":">0"
					},
					result: "Přicházíš o Lahev Kolaloky a ještě sis vysloužil facku od slečny za přepážkou. Jdi na Marodku na stanoviště D.",
					variables: {
						"kolaloka":"-= 1"
					},
					location: "D"
				},
				{
					description: "Vrátím se raději zpět na začátek Stetson City.",
					result: "Jdi na začátek Stetson City na stanoviště A.",
					location: "A"
				}
			]
		},
		"S1": {
			name: "Dead Man's Valley",
			image: "img/Dead Mans Valley.jpg",
			description: "Poušť, písek, vedro, vyprahlo... název tohoto údolí je skutečne popisný. Zdržovat se v téhle výhni déle by mohlo být zatraceně nebezpečné.",
			actions: [
				{
					description: "Půjdu se raději podívat do Fata Morgana Valley.",
					result: "Jdeš do Fata Morgana Valley, na stanoviště S2.",
					location: "S2"
				},
				{
					requires: {
						"sirky": "> 0",
						"strela": "== false"
					},
					description: "Vysypu Krabičku sirek a naberu do ní něco svinstva z nedaleké hromádky.",
					result: "Vysypal jsi jednu Krabičku sirek a prohrabuješ se tím svinstvem... u svatého Buhvíkoho! Našel jsi tam pověstnou Všeprorážející střelu!",
					variables: {
						"sirky": "-= 1",
						"strela": "=true"
					}
				},
				{
					requires: {
						"kolaloka": "> 0"
					},
					description: "Vypiju na posilněnou Lahev Kolalokovy limonády.",
					result: "Na zdraví! Dobrá byla.",
					variables: {
						"kolaloka": "-= 1"
					}
				},
				{
					description: "Chvíli si posedím na sluníčku.",
					result: "Úžeh! Úpal! Šup se léčit na Marodku, na stanoviště D.",
					location: "D"
				},
				{
					description: "Vykoupu se v nedalekém jezírku.",
					result: "Jakmile jsi vlezl do vody, využil příležitosti nějaký bandita a sebral ti oděv. Co čert nechtěl, šel kolem zrovna místní šerif a za obnažování na veřejnosti jdeš do Vězení na stanoviště J.",
					location: "J"
				}
			]
		},
		"S2": {
			name: "Fata Morgana Valley",
			image: "img/Fata Morgana Valley.jpg",
			description: "Nedaleko podezřele vypadající hromady kamenů sedí Grimpo a šklebí se na tebe. Na první pohled je jasné, že dnes už si z láhve whisky párkrát pořádně přihnul.",
			actions: [
				{
					description: "Půjdu se raději podívat do Dead Man's Valley.",
					result: "Jdeš do Dead Man's Valley, na stanoviště S1.",
					location: "S1"
				},
				{
					description: "Nabídnu Grimpovi Lahev Kolalokovy limonády.",
					requires: {
						"kolaloka": ">0"
					},
					result: "Grimpo Lahev vypil, ale nechutnala mu – má raději Trigger Whisky.",
					variables: {
						"kolaloka": "-= 1"
					}
				},
				{
					description: "Zkusím kopat na nějakém příhodném místě.",
					result: "Vykopal jsi pěknou hromadu zeminy, ale nic zajímavého se neobjevilo."
				},
				{
					requires: {
						"mapa":"==true",
						"ostatky":"==false"
					},
					description: "Zkusím kopat na místě, které ukazuje moje nedávno získaná Mapa.",
					result: "To je ale štěstí! Po chvíli kopání jsi narazil na Ostatky svatého Bůhvíkoho; světce, který dle legendy podlehl ve střeleckém souboji i přesto, že byl vybaven Všeodrážejícím štítem. Osudným se mu stalo to, že se před soubojem zapomněl pomodlit. Ostatky bereš s sebou, určitě se můžou hodit.",
					variables: {
						"ostatky":"=true"
					}
				}
			]
		},
		"U": {
			name: "Jeskyně Pancho Kida",
			image: "img/Jeskyne.jpg",
			description: "Pancho Kid, přezdívaný též \"Orlí muž\", sedí ve své sluji a zvídavě tě pozoruje.",
			actions: [
				{
					description: "Nabídnu Pancho Kidovi Lahev Kolalokovy limonády.",
					requires: {
						"kolaloka": ">0"
					},
					result: "Pancho Kid Lahev vypil a chutnala mu.",
					variables: {
						"kolaloka": "-= 1"
					}
				},
				{
					description: "Nabídnu Pancho Kidovi Krabičku sirek.",
					requires: {
						"sirky": ">0"
					},
					result: "Pancho Kid si od si od tebe s radostí vzal Krabičku sirek a schoval si ji pod postel.",
					variables: {
						"sirky": "-= 1"
					}
				},
				{
					description: "Zapálím pomoci jedné Krabičky sirek svíčku, aby bylo lépe vidět.",
					requires: {
						"sirky": ">0",
						"pero": "== false"
					},
					result: "Za světla svíčky vypráví Pancho Kid historky o tom, jak přišel k přezdívce \"Orlí muž\". Využiváš jeho nepozornosti a sebereš mu jedno Orlí pero.",
					variables: {
						"sirky": "-= 1",
						"pero": "= true"
					}
				}
			]
		},
		"V": {
			name: "Kostelní vrata",
			image: "img/Kostelni vrata.jpg",
			description: "Neokázalá vrata představují vstup do místního svatostánku Božího. Farář ale odmítá kohokoliv vpustit dál; po několika nedávných přestřelkách totiž začal silně pochybovat, je-li jeho stádečko věřících ještě stále nakloněno té správné víře.",
			actions: [
				{
					alternatives: [
						{
							requires: {
								"ostatky": "== true"
							},
							result: "Ukážeš farářovi Ostatky svatého Buhvíkoho. To na něj zapůsobí, takže tě vpustí do Kostela – na stanoviště P.",
							location: "P"
						}
					],
					description: "Zkusím přesvědčit faráře, že jsem dobrým věřícím.",
					result: "Bez nějakého hmatatelného důkazu nebo svatého předmětu ti farář nevěří."
				},
				{
					description: "Přemluvím faráře, aby svůj svatostánek ve Stetson City raději zabalil a odstěhoval se.",
					result: "Farář se skutečně rozzlobil, vytáhnul svou dvouhlavňovou brokovnici a pěkně tě hnal, až na Marodku – stanoviště D.",
					location: "D"
				},
				{
					requires: {
						"odpusteni":"== false"
					},
					description: "Požádám faráře o Odpuštění.",
					result: "Vyjmenuješ farářovi všechny své hříchy. Netrvá to ani příliš dlouho, protože Limonádový Joe samozřejmě žádné hříchy nikdy nevykonal. Farář je dojat a dává ti Odpuštění.",
					variables: {
						"odpusteni": "= true"
					}
				}
			]
		},
		"W": {
			name: "Trigger Whisky Saloon",
			image: "img/Trigger Whisky Saloon.jpg",
			description: "Tenhle podnik je dílo a majetek Dougha Badmana. Ohnivá Trigger Whisky teče proudem, z pódia zní tingl tangl a z prvního patra – tam, co jsou pokoje hostů – smích kankánových tanečnic.",
			actions: [
				{
					requires: {
						"banker": "== false"
					},
					description: "Zajdu se podívat k baru.",
					result: "Jdeš k Baru stanoviště Y.",
					location: "Y"
				},
				{
					requires: {
						"mapa": "== false"
					},
					description: "Zajdu do šatny Arizonské pěnice Tornado Lou.",
					result: "Jdeš k Tornado Lou na stanoviště O.",
					location: "O"
					
				},
				{
					description: "Zajdu do pokoje Hogo Foga v prvním patře.",
					result: "Jdeš k Hogo Fogovi na stanoviště E.",
					location: "E"
				}
			]
		},
		"Y": {
			name: "Bar Trigger Whisky Saloonu",
			image: "img/Bar.jpg",
			description: "V Trigger Whisky Saloonu jsi na baru narazil na Bankéře. Vypadá rozmrzele a pokouší se smutek utopit v baculaté lahvi whisky. Co s ním?",
			actions: [
				{
					description: "Nabídnu Bankéřovi Lahev Kolalokovy limonády.",
					requires: {
						"kolaloka": ">0"
					},
					result: "Zdá se, že Kolaloka Bankéři zachutnala. Opileckým gestem naznačil, že by si klidně ještě dal.",
					variables: {
						"kolaloka": "-= 1"
					}
				},
				{
					description: "Nabídnu Bankéřovi dvě Lahve Kolalokovy limonády.",
					requires: {
						"kolaloka": ">1"
					},
					result: "Po tak dobrém moku je Bankéř ochotný pro tebe udělat cokoli. Vezmi ho s sebou, může se hodit...",
					variables: {
						"kolaloka": "-= 2",
						"banker": "= true"
					}
				},
				{
					requires: {
						"banker": "== false"
					},
					description: "Donutím Bankéře, aby mne následoval.",
					result: "To bylo ale hodně nepromyšlené gesto. Opilci mají vždy víc štěstí než rozumu. Jdi na Marodku na stanoviště D.",
					location: "D"
				},
				{
					description: "Půjdu zpět ke dveřím Trigger Whisky Saloonu.",
					result: "Jdeš do Trigger Whisky Saloonu, stanoviště W.",
					location: "W"
				}
			]
		},
		"Z": {
			name: "Vítězství!",
			description: "Sláva! Hogo Fogo je mrtev a ty vyhráváš tuto hru.",
			flags: AGE.LOCATION_END
		}

	}
}
