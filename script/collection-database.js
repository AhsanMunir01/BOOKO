const collection_list = [
    {
        id: "p001",
        name: "To Kill a Mockingbird",
        flavor_id: "f001",
        off: 5,
        price: 35,
        description: "To Kill a Mockingbird is a powerful fiction novel that explores themes of racial injustice and moral growth through the eyes of a young girl in the American South.",
        image: "images/To Kill a Mockingbird.jpeg",
        rating: 4
    },
    {
        id: "p002",
        name: "Pride and Prejudice",
        flavor_id: "f001",
        off: 5,
        price: 35,
        description: "Pride and Prejudice is a classic romance novel that explores themes of love, social class, and personal growth through the witty and spirited Elizabeth Bennet.",
        image: "images/Pride and Prejudice.jpeg",
        rating: 5
    },
    {
        id: "p003",
        name: "The Hobbit, or There and Back Again",
        flavor_id: "f001",
        off: 5,
        price: 35,
        description: "The Hobbit, or There and Back Again is a fantasy adventure that follows Bilbo Baggins as he journeys with dwarves to reclaim a lost treasure guarded by a dragon.",
        image: "images/The Hobbit, or There and Back Again.jpeg",
        rating: 4
    },
    {
        id: "p004",
        name: "Lord of the Flies",
        flavor_id: "f001",
        off: 5,
        price: 35,
        description: "Lord of the Flies is a gripping novel about a group of boys stranded on an island who descend into savagery as they struggle to govern themselves.",
        image: "images/Lord of the Flies.jpeg",
        rating: 5
    },
    {
        id: "p005",
        name: "Between the World and Me by Ta-Nehisi Coates",
        flavor_id: "f002",
        off: 8,
        price: 50,
        description: "Between the World and Me is a powerful letter from Ta-Nehisi Coates to his son, reflecting on race, identity, and the Black experience in America.",
        image: "images/Between the World and Me by Ta-Nehisi Coates.jpg",
        rating: 4
    },
    {
        id: "p006",
        name: "The Emperor of All Maladies: A Biography of Cancer by Siddhartha Mukherjee",
        flavor_id: "f002",
        off: 8,
        price: 50,
        description: "The Emperor of All Maladies is a compelling ,biography of cancer that traces its history, treatment, and ongoing battle through science, medicine, and human resilience.",
        image: "images/The Emperor of All Maladies.jpg",
        rating: 5
    },
    {
        id: "p007",
        name: "How to Survive a Plague by David France",
        flavor_id: "f002",
        off: 8,
        price: 50,
        description: "How to Survive a Plague is a gripping chronicle of the AIDS epidemic and the activists whose courage and persistence transformed medical research and saved countless lives.",
        image: "images/How to Survive a Plague by David France.jpg",
        rating: 4
    },
    {
        id: "p008",
        name: "How to Do Nothing by Jenny Odell",
        flavor_id: "f002",
        off: 8,
        price: 50,
        description: "How to Do Nothing is a thought-provoking call to resist the attention economy by embracing stillness, presence, and meaningful connection with the world around us.",
        image: "images/How to Do Nothing by Jenny Odell.jpg",
        rating: 3
    },
    {
        id: "p009",
        name: "The Search: A Spiritual Novel ",
        flavor_id: "f003",
        off: 8,
        price: 50,
        description: "The Search: A Spiritual Novel is a reflective journey of self-discovery that explores life's deeper meanings through a story of personal awakening and inner transformation.",
        image: "images/The Search.jpg",
        rating: 4
    },
    {
        id: "p010",
        name: "Qur'an",
        flavor_id: "f003",
        off: 8,
        price: 50,
        description: "The *Qur'an* is the holy book of Islam, believed to be the divine revelation to Prophet Muhammad (PBUH), offering guidance for all aspects of life through spiritual, moral, and legal teachings.",
        image: "images/Quran.jpg",
        rating: 5
    },
    {
        id: "p011",
        name: "Bible",
        flavor_id: "f003",
        off: 8,
        price: 50,
        description: "The Bible is a sacred scripture of Christianity, comprising the Old and New Testaments, and serves as a spiritual guide, historical record, and foundation of faith for Christians around the world.",
        image: "images/Bible.jpg",
        rating: 3
    },
    {
        id: "p012",
        name: "Guru Granth Sahib",
        flavor_id: "f003",
        off: 8,
        price: 50,
        description: "The *Guru Granth Sahib* is the central holy scripture of Sikhism, revered as the eternal Guru, containing the spiritual teachings and hymns of Sikh Gurus and other saints promoting truth, devotion, and unity.",
        image: "images/Guru Granth Sahib.jpg",
        rating: 4
    },
    {
        id: "p013",
        name: "Torah",
        flavor_id: "f003",
        off: 8,
        price: 50,
        description: "The *Torah* is the foundational text of Judaism, comprising the first five books of the Hebrew Bible, and provides religious laws, moral teachings, and the history of the Jewish people.",
        image: "images/Torah.jpg",
        rating: 5
    },
    {
        id: "p014",
        name: "The Power and the Glory",
        flavor_id: "f003",
        off: 4,
        price: 50,
        description: "*The Power and the Glory* is a profound novel by Graham Greene that explores faith, guilt, and redemption through the journey of a flawed priest in a time of religious persecution.",
        image: "images/The Power and the Glory.jpg",
        rating: 4
    },
    {
        id: "p015",
        name: "The Hunger Games",
        flavor_id: "f004",
        off: 25,
        price: 50,
        description: "*The Hunger Games* is a dystopian thriller where a brave young girl, Katniss Everdeen, must survive a deadly televised competition in a society ruled by fear and control.",
        image: "images/The Hunger Games.jpg",
        rating: 5
    },
    {
        id: "p016",
        name: "Harry Potter and the Sorcerer’s Stone",
        flavor_id: "f004",
        off: 10,
        price: 50,
        description: "*Harry Potter and the Sorcerer’s Stone* is a magical adventure where a young boy discovers he's a wizard and begins his journey at Hogwarts School of Witchcraft and Wizardry.",
        image: "images/Harry Potter and the Sorcerer’s Stone.jpg",
        rating: 4
    },
    {
        id: "p017",
        name: "Strawberry",
        flavor_id: "f004",
        off: 8,
        price: 50,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, ad.",
        image: "images/strawberry.jpg",
        rating: 4
    },
    {
        id: "p018",
        name: "Cake Batter",
        flavor_id: "f004",
        off: 12,
        price: 50,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, ad.",
        image: "images/rainbow.jpg",
        rating: 3
    },
    {
        id: "p019",
        name: "Greek Yogurt",
        flavor_id: "f004",
        off: 8,
        price: 50,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, ad.",
        image: "images/vannila.jpg",
        rating: 5
    },
    {
        id: "p020",
        name: "Pistachio",
        flavor_id: "f004",
        off: 1,
        price: 50,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, ad.",
        image: "images/chocolate.jpg",
        rating: 4
    },
    {
        id: "p021",
        name: "Fudge Brownie",
        flavor_id: "f005",
        off: 0,
        price: 50,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, ad.",
        image: "images/blue berry.jpg",
        rating: 5
    },
    {
        id: "p022",
        name: "Peanut Butter",
        flavor_id: "f005",
        off: 3,
        price: 50,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, ad.",
        image: "images/rainbow.jpg",
        rating: 4
    },
    {
        id: "p023",
        name: "Mint Chip Dairy-Free",
        flavor_id: "f005",
        off: 15,
        price: 50,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, ad.",
        image: "images/mint.jpg",
        rating: 4
    },
    {
        id: "p024",
        name: "Oat Milk Chocolate",
        flavor_id: "f005",
        off: 8,
        price: 50,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, ad.",
        image: "images/chocolate.jpg",
        rating: 3
    }
]

export default collection_list;
