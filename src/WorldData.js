// WorldData.js
export const WorldData = {
  faldor: {
    name: 'Faldor',
    description: 'Welcome to Faldor, a vast and diverse region...',
    image: './images/faldor.png',
    areas: {
      darda: {
        name: 'Darda',
        description: 'You arrive at the entrance to Darda...',
        image: './images/darda.png',
        connectedAreas: [
          { name: 'theValley', distance: 1 } // 1 km
        ],
        travelText: 'Travelling to Darda',
        exitText: 'Leaving Darda',
        localPositions: {
          townSquare: {
            name: 'Town Square',
            description: 'The bustling center of town...',
            travelText: 'Heading to the town square',
            exitText: 'Leaving the town square',
            image: './images/town-square-darda.png',
            activities: {
              shop: {
                name: "Tinkerton's",
                description: "You enter Tinkerton's general store...",
                travelText: "Entering Tinkerton's",
                exitText: "Leaving Tinkerton's",
                image: './images/tinkertons.png',
              },
              inn: {
                name: 'The Crinkled Skink',
                description: 'Welcome to The Crinkled Skink...',
                travelText: 'Entering The Crinkled Skink',
                exitText: 'Leaving the The Crinkled Skink',
                image: './images/crinkled-skink-tavern.png',
              }
            }
          },
          docks: {
            name: 'Docks',
            description: 'You find yourself at the docks...',
            travelText: 'Heading to the docks',
            exitText: 'Leaving the docks',
            image: './images/docks-darda.png',
            activities: {
              Trading: {
                name: 'Trading',
                description: 'You can trade goods with local and foreign merchants here...',
                travelText: 'Trading',
                exitText: 'Ending trade',
              },
              Fishing: {
                name: 'Fishing',
                description: 'Cast your line and feel the thrill of the catch...',
                travelText: 'Fishing',
                exitText: 'Ending fishing',
              }
            },
          }
        }
      },
      theValley: {
        name: 'The Valley',
        description: 'A peaceful green paradise unfolds before you...',
        image: './images/the-valley.png',
        connectedAreas: [
          { name: 'darda', distance: 1 },
          { name: 'coralCove', distance: 3 },
          { name: 'thalenPass', distance: 5 }
        ],
        travelText: 'Travelling to the Valley',
        exitText: 'Leaving the Valley',
        localPositions: {
          valleyPath: {
            name: 'Valley Path',
            description: 'You step onto a dirt path...',
            travelText: 'Heading to the Valley Path',
            exitText: 'Leaving the Valley Path',
            image: './images/old-trail-valley.png',
            activities: {
              Explore: {
                name: 'Explore',
                description: 'You explored the area...',
                travelText: 'Exploring',
                exitText: 'Ending exploration',
                image: './images/old-trail-valley.png',
              },
              NatureWatching: {
                name: 'Nature Watching',
                description: 'You observe the wildlife in their natural habitat...',
                travelText: 'Watching nature',
                exitText: 'Ending nature watch',
                image: './images/old-trail-valley.png',
              }
            },
            enemies: [
              { name: 'GreenSlime', spawnRate: 35 },
              { name: 'Velyr', spawnRate: 25 },
              { name: 'Kaskari', spawnRate: 18 },
              { name: 'ValleyWolf', spawnRate: 10 },
              { name: 'Brontor', spawnRate: 10 },
              { name: 'Ayrin', spawnRate: 2 },
            ],
            levelRange: { min: 1, max: 3 }
          }
        }
      },
      coralCove: {
        name: 'Coral Cove',
        description: 'A beautiful sandy beach bordered by impressive cliff walls greets you. The clear blue waters sparkle in the sunlight, inviting you to take a dip. Colorful corals and vibrant marine life can be seen just below the surface. The sound of waves crashing against the shore creates a soothing symphony. It is a hidden gem where the sea meets the land in perfect harmony.',
        image: './images/coral-cove.png',
        connectedAreas: [
          { name: 'blusterBluffs', distance: 3 },
        ],
        travelText: 'Travelling to Coral Cove',
        exitText: 'Leaving Coral Cove',
        localPositions: {
          beachHut: {
            name: 'Beach Hut',
            description: 'You discover an small hut nestled in the cliffs near the beach. It appears to be abandoned.',
            travelText: 'Heading to the Beach Hut',
            exitText: 'Leaving the Beach Hut',
            image: './images/beach-hut.png',
            activities: {
              Explore: {
                name: 'Explore',
                description: 'You explore the area...',
                travelText: 'Exploring',
                exitText: 'Ending exploration',
                image: './images/beach-hut.png',
              },
            },
            enemies: [
              { name: 'BlueSlime', spawnRate: 50 },
              { name: 'Neridia', spawnRate: 10 },
              { name: 'Serashka', spawnRate: 40 },
            ],
            levelRange: { min: 2, max: 5 }
          }
        }
      },
      blusterBluffs: {
        name: 'Bluster Bluffs',
        description: 'Overlooking Coral Cove, Bluster Bluffs provides a great view of the sea. The cliffs are rugged and majestic, shaped by the relentless forces of nature. From the top, you can see the vast expanse of the ocean stretching out to the horizon. The wind is strong here, adding to the sense of wild beauty. It is a place to stand in awe of the natural world.',
        image: './images/bluster-bluffs.png',
        connectedAreas: [
          { name: 'coralCove', distance: 3 },
        ],
        travelText: 'Travelling to Bluster Bluffs',
        exitText: 'Leaving Bluster Bluffs',
        localPositions: {
          cliffTop: {
            name: 'Cliff Top',
            description: 'You reach the cliff top and are greeted by a breathtaking view. The sea below sparkles in the sunlight, and the horizon stretches endlessly. The wind whips around you, carrying the scent of salt and adventure. It is a perfect spot for contemplation and inspiration. Here, you feel the true power and beauty of nature.',
            travelText: 'Heading to the Cliff Top',
            exitText: 'Leaving the Cliff Top',
            image: './images/bluster-bluffs.png',
            activities: {
              Explore: {
                name: 'Explore',
                description: 'You explore the area...',
                travelText: 'Exploring',
                exitText: 'Ending exploration',
                image: './images/bluster-bluffs.png',
              },
            },
            enemies: [
              { name: 'BlueSlime', spawnRate: 20 },
              { name: 'Velyr', spawnRate: 40 },
              { name: 'Serashka', spawnRate: 40 },
            ],
            levelRange: { min: 3, max: 6 }
          }
        }
      },
      thalenPass: {
        name: 'Thalen Pass',
        description: 'You enter Thalen Pass, an old mining tunnel that once provided thoroughfare to the world beyond the Westridge Mountains. Echoes of its industrious past still linger, with rusted tracks and forgotten tools. The air is cool and heavy with the scent of earth and history. As you explore, you can almost hear the whispers of miners who once toiled here. It is a place of mystery and history, where every corner holds a tale.',
        image: './images/thalen-pass.png',
        connectedAreas: [
          { name: 'theValley', distance: 5 },
        ],
        travelText: 'Travelling to Thalen Pass',
        exitText: 'Leaving Thalen Pass',
        localPositions: {
          tunnelEntrance: {
            name: 'Tunnel Entrance',
            description: 'The entrance to the Thalen Pass.',
            travelText: 'Heading to the Tunnel Entrance',
            exitText: 'Leaving the Tunnel Entrance',
            image: './images/inside-tunnel.png',
            activities: {
              Exploring: {
                name: 'Exploring',
                description: 'You look around the area. Discover relics of the past and imagine the bustling activity that once filled this place. Every step is a journey into history.',
                travelText: 'Exploring',
                exitText: 'Ending exploration',
              },
              Encounter: {
                name: 'Sound in the dark',
                description: 'You hear something approaching...',
                travelText: 'Investigating sound',
                exitText: 'Leaving encounter',
                image: './images/corrupted-golem.png',
              }
            },
            enemies: [
              { name: 'CorruptedGolem', spawnRate: 100 },
            ],
            levelRange: { min: 6, max: 8 }
          }
        }
      }
    }
  }
  // Additional regions can be added here
};