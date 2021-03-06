import { nanoid } from "nanoid";

import { types } from "./const";
import { randomFromArray, randomNFromArray } from "./utils";

const destinationNames = [
  "Vancouver",
  "Reykjavik",
  "Sedona",
  "Eho",
  "Lorville",
  "New Babbage",
  "Port Olisar"
];

const lorem =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi error exercitationem iure maiores. Consequuntur beatae adipisci suscipit, minima facere expedita mollitia assumenda quidem numquam soluta, laborum cum necessitatibus, nobis quibusdam maxime quas natus cupiditate modi ipsum asperiores? Possimus inventore voluptatibus atque iusto, velit eveniet, repudiandae quis suscipit sed facere, ab similique earum ex rerum est minima quisquam harum soluta vero neque obcaecati officiis? Ab cumque quibusdam impedit, non delectus hic sed perspiciatis corrupti officia deleniti exercitationem sapiente saepe dolorum et quasi laboriosam pariatur in? Itaque, eius porro dignissimos ad consequuntur error repellat assumenda iste numquam voluptatem ipsum veniam eveniet! Tempora.";

function generateDescription(sentenceCount) {
  const sentences = lorem
    .split(/[.,?!]/)
    .map((str) => str.trim())
    .filter((str) => str.length > 0);
  return randomNFromArray(sentences, sentenceCount).join(".");
}

function generateDestinations() {
  const destinations = [];
  for (const name of destinationNames) {
    destinations.push({
      name,
      description: generateDescription(Math.floor(Math.random() * 4 + 1)), // 1 - 5 sentences
      pictures: [
        {
          src: `http://picsum.photos/300/200?r=${Math.random()}`,
          description: `A place in ${name}`
        }
      ]
    });
  }
  return destinations;
}

function generateOffers(count) {
  const offers = [];
  for (let i = 0; i < count; i++) {
    offers.push({
      type: randomFromArray(types),
      title: generateDescription(1), // one sentence
      price: Math.floor(Math.random() * 50 + 10)
    });
  }
  return offers;
}

function generateEvent(destinations, offers) {
  let type = randomFromArray(types);
  let validOffers = offers.filter((offer) => type === offer.type);

  let startDate = new Date(Date.now() + Math.random() * 3e9);

  return {
    id: nanoid(),
    type,

    basePrice: Math.floor(Math.random() * 800 + 600),
    destination: randomFromArray(destinations),
    offers: randomNFromArray(validOffers, Math.floor(Math.random() * 5)),

    dateFrom: startDate,
    dateTo: new Date(startDate.getTime() + Math.random() * 1e8),

    isFavorite: false
  };
}

export function generateData(count) {
  let destinations = generateDestinations();
  let offers = generateOffers(30); // magic number

  let events = [];
  for (let i = 0; i < count; i++) {
    events.push(generateEvent(destinations, offers));
  }

  return {
    events,
    destinations,
    offers
  };
}
