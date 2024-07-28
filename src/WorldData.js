export const WorldData = {
  faldor: {
    name: 'Faldor',
    description: 'Welcome to Faldor, a vast and diverse region. You step into a land teeming with life, where every path leads to a new story. The sky is a clear blue, dotted with fluffy white clouds. A gentle breeze carries the scent of pine and fresh earth. Adventure awaits at every turn, inviting you to explore its many wonders.',
    image: './images/faldor.png',
    areas: {
      darda: {
        name: 'Darda',
        description: 'You arrive at the entrance to Darda, a quaint little fishing village with a rich history. Time seems to slow down in this peaceful place, as if the village itself is holding onto a past it refuses to share.',
        image: './images/darda.png',
        connectedAreas: ['theValley'],
        localPositions: {
          townSquare: {
            name: 'Town Square',
            description: 'The bustling center of town, the square is quaint but alive. Shops and cafes line the streets, each offering unique wares and flavors. Musicians play cheerful tunes, adding to the lively atmosphere. The aroma of freshly baked bread tempts you. This is the heart of Darda, where stories are shared and lives intertwine.',
            image: './images/town-square-darda.png',
            activities: {
              shop: {
                name: "Tinkerton's",
                description: "You enter Tinkerton's general store. Find the best selection of legal merchandise around, from practical tools to whimsical trinkets.",
                image: './images/tinkertons.png',
              },
              inn: {
                name: 'The Crinkled Skink',
                description: 'You enter The Crinkled Skink. It is lively, bustling with the denizens of Darda. A pleasant barkeep waves at you from behind the counter.',
                image: './images/crinkled-skink-tavern.png',
              }
            }
          },
          docks: {
            name: 'Docks',
            description: 'You find yourself at the docks where fishermen and traders gather. Boats from distant lands bring exotic goods and stories of adventure. Seagulls cry overhead, diving for scraps. The salty sea air invigorates your senses.',
            image: './images/docks-darda.png',
            activities: {
              Trading: {
                name: 'Trading',
                description: 'You can trade goods with local and foreign merchants here. Discover rare items and haggle for the best price. Each trade brings a new story and a piece of the world closer to home.',
              },
              Fishing: {
                name: 'Fishing',
                description: 'Cast your line and feel the thrill of the catch. Watch the fishermen at work and learn their secrets. The sea promises bountiful rewards for those who are patient.',
              }
            }
          },
        }
      },
      theValley: {
        name: 'The Valley',
        description: 'A peaceful green paradise unfolds before you. Lush meadows stretch as far as the eye can see. The sloping grasslands wind its way through the landscape, inviting you to follow. Birds sing from the treetops, filling the air with music. This is a sanctuary for those seeking tranquility and natural beauty.',
        image: './images/the-valley.png',
        connectedAreas: ['darda', 'coralCove', 'thalenPass'],
        localPositions: {
          valleyPath: {
            name: 'Valley Path',
            description: 'You step onto a dirt path that snakes through the valley, dappled with sunlight. The air is cool and filled with the scent of pine and earth. Every step brings a new discovery, from blooming flowers to hidden clearings. It is a place of quiet reflection and natural wonder.',
            image: './images/old-trail-valley.png',
            activities: {
              Walking: {
                name: 'Walking',
                description: 'Take a leisurely walk through the valley.',
              },
              NatureWatching: {
                name: 'Nature Watching',
                description: 'Observe the wildlife in their natural habitat. Spot deer, foxes, and countless birds. The valley is alive with the wonders of the natural world.',
              }
            }
          }
        }
      },
      coralCove: {
        name: 'Coral Cove',
        description: 'A beautiful sandy beach bordered by impressive cliff walls greets you. The clear blue waters sparkle in the sunlight, inviting you to take a dip. Colorful corals and vibrant marine life can be seen just below the surface. The sound of waves crashing against the shore creates a soothing symphony. It is a hidden gem where the sea meets the land in perfect harmony.',
        image: './images/coral-cove.png',
        connectedAreas: ['thalenPass', 'blusterBluffs'],
        localPositions: {
          beachHut: {
            name: 'Beach Hut',
            description: 'You discover a cozy hut by the beach, perfect for relaxing. The scent of salt air and the sound of waves provide a tranquil backdrop. Inside, the hut is warm and inviting, a perfect retreat from the sun. Outside, the beach offers endless opportunities for fun and relaxation. It is an ideal spot to unwind and enjoy the view.',
            image: './images/beach-hut.png',
            activities: {
              Resting: {
                name: 'Resting',
                description: 'Relax in the comfort of the beach hut. Let your worries drift away with the tide. The hut is a haven of peace and tranquility.',
              },
              BeachGames: {
                name: 'Beach Games',
                description: 'Play games on the sandy beach. Feel the joy of simple pleasures under the sun. The beach is a playground for all ages.',
              }
            }
          }
        }
      },
      blusterBluffs: {
        name: 'Bluster Bluffs',
        description: 'Overlooking Coral Cove, Bluster Bluffs provides a great view of the sea. The cliffs are rugged and majestic, shaped by the relentless forces of nature. From the top, you can see the vast expanse of the ocean stretching out to the horizon. The wind is strong here, adding to the sense of wild beauty. It is a place to stand in awe of the natural world.',
        image: './images/bluster-bluffs.png',
        connectedAreas: ['coralCove'],
        localPositions: {
          cliffTop: {
            name: 'Cliff Top',
            description: 'You reach the cliff top and are greeted by a breathtaking view. The sea below sparkles in the sunlight, and the horizon stretches endlessly. The wind whips around you, carrying the scent of salt and adventure. It is a perfect spot for contemplation and inspiration. Here, you feel the true power and beauty of nature.',
            image: './images/cliff-top.png',
            activities: {
              Sightseeing: {
                name: 'Sightseeing',
                description: 'Enjoy the scenic view from the top. Take in the panoramic vistas and feel the grandeur of nature. Every glance reveals a new wonder.',
              },
              Photography: {
                name: 'Photography',
                description: 'Capture beautiful photos of the landscape. The ever-changing light and shadows offer endless opportunities. The cliffs provide a dramatic backdrop for your shots.',
              }
            }
          }
        }
      },
      thalenPass: {
        name: 'Thalen Pass',
        description: 'You enter Thalen Pass, an old mining tunnel that once provided thoroughfare to the world beyond the Westridge Mountains. Echoes of its industrious past still linger, with rusted tracks and forgotten tools. The air is cool and heavy with the scent of earth and history. As you explore, you can almost hear the whispers of miners who once toiled here. It is a place of mystery and history, where every corner holds a tale.',
        image: './images/thalen-pass.png',
        connectedAreas: ['theValley', 'coralCove'],
        localPositions: {
          miningCamp: {
            name: 'Mining Camp',
            description: 'You arrive at an old mining camp with abandoned equipment. The remnants of hard work and dreams of fortune are evident everywhere. Rusted tools and broken carts tell stories of the past. It is a place to ponder the lives of those who once toiled here. The camp is now a silent witness to a bygone era.',
            image: './images/mining-camp.png',
            activities: {
              Exploring: {
                name: 'Exploring',
                description: 'Explore the old mining camp. Discover relics of the past and imagine the bustling activity that once filled this place. Every step is a journey into history.',
              },
              Mining: {
                name: 'Mining',
                description: 'Try your hand at mining for resources. Unearth hidden treasures and feel the thrill of discovery. The ground holds secrets waiting to be found.',
              }
            }
          }
        }
      }
    }
  }
  // Additional regions can be added here
};
