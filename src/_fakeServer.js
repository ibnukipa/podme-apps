/* @flow */

import { Factory, Model, Server, RestSerializer, Response } from 'miragejs';
import faker from 'faker';

export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,
    serializers: {
      application: RestSerializer,
    },
    models: {
      user: Model,
      pod: Model,
    },

    factories: {
      user: Factory.extend({
        uuid: () => faker.random.uuid(),
        avatar: () => faker.image.avatar(),
        name: () => faker.name.findName(),
        title: () => faker.name.title(),
      }),
      pod: Factory.extend({
        uuid: () => faker.random.uuid(),
        name: () => faker.company.companyName(),
        banner: () => faker.image.image(),
        description: () => faker.commerce.productDescription(),
        price: () => faker.commerce.price(),
        address: () => faker.address.streetAddress(),
      }),
    },

    seeds(server) {
      server.createList('pod', 100);
      server.create('user', { username: 'username', password: 'password' });
    },

    routes() {
      this.post('/api/auth', (schema, req) => {
        const { username, password } = JSON.parse(req.requestBody);
        const user = schema.db.users.findBy({ username, password });
        if (user) return new Response(201, {}, user);
        return new Response(401);
      });
      this.get('/api/pods', (schema, req) => {
        const {
          queryParams: { pageOffset, pageSize },
        } = req;

        const pods = schema.db.pods;

        if (Number(pageSize)) {
          const start = Number(pageSize) * Number(pageOffset);
          const end = start + Number(pageSize);
          const page = pods.slice(start, end);

          return {
            items: page,
            nextPage: pods.length > end ? Number(pageOffset) + 1 : undefined,
          };
        }
        return pods;
      });
    },
  });
}
