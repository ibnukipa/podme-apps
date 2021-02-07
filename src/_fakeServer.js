/* @flow */

import { Factory, Model, Server } from 'miragejs';
import faker from 'faker';

export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    models: {
      user: Model,
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.findName();
        },
        avatarUrl() {
          return faker.image.avatar();
        },
        title() {
          return faker.name.title();
        },
      }),
    },

    seeds(server) {
      server.createList('user', 25);
    },

    routes() {
      this.get('/api/users', (schema) => schema.users.all());
    },
  });
}
