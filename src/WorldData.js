export const WorldData = {
  faldor: {
    name: 'Faldor',
    description: 'Welcome to Faldor, a vast and diverse region...',
    image: './images/faldor.png',
    areas: {
      graveyard: {
        name: 'Graveyard',
        description: 'You awake as a spectral reflection of your former self, floating and intangible. You find yourself in a graveyard. A solemn place where the unlucky and the out-of-time come to rest. Your time, however... has not yet come.',
        image: './images/graveyard.png',
        connectedAreas: [
          { name: 'darda', distance: 0.1 } 
        ],
        travelText: '',
        exitText: 'Leaving the graveyard',
        localPositions: {}
      },
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
                isTeleport: true, // Custom flag to identify teleport activity
                targetArea: 'thalenPass',
                targetLocalPosition: 'tunnelEntrance',
              }
            },
          },
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
          { name: 'theValley', distance: 3 },
          { name: 'blusterBluffs', distance: 2 },
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
          { name: 'coralCove', distance: 2 },
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
        description: 'You approach Thalen Pass, an old abandoned tunnel that once provided thoroughfare to the world beyond the mountains. The air is cool and heavy with the scent of earth and history.',
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
            image: './images/thalen-pass.png',
            activities: {
              Observe: {
                name: 'Observe',
                description: 'You look around the area. The tunnel peers out at you ominously, its blackness within seems to grow and change shape.',
                travelText: 'Exploring',
                exitText: 'Ending exploration',
                image: './images/thalen-pass.png',
              },
              EnterTunnel: {  // Activity name can be anything, key is important
                name: 'Enter the Tunnel',
                description: 'You enter the tunnel.',
                travelText: 'Entering Thalen Pass Tunnel',
                exitText: 'Leaving Thalen Pass Tunnel',
                image: './images/thalen-tunnel.png',
                isTeleport: true, // Custom flag to identify teleport activity
                targetArea: 'darda',
                targetLocalPosition: 'docks',
              },          
            },
            enemies: [
              { name: 'Velyr', spawnRate: 50 },
              { name: 'ValleyWolf', spawnRate: 25 },
              { name: 'Brontor', spawnRate: 20 },
              { name: 'Ayrin', spawnRate: 5 },
            ],
            levelRange: { min: 6, max: 8 },
          }
        }
      }
    }
  }
  // Additional regions can be added here
};
