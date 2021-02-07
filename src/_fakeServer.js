/* @flow */

import { Factory, hasMany, Model, Response, RestSerializer, Server } from 'miragejs';
import faker from 'faker';
import { uniq } from 'lodash-es';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const ApplicationSerializer = RestSerializer.extend();

export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,
    serializers: {
      application: ApplicationSerializer,
      podWithRelationships: ApplicationSerializer.extend({
        include: ['facilities'],
      }),
    },
    models: {
      user: Model,
      pod: Model.extend({
        facilities: hasMany(),
      }),
      facility: Model,
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
        detail: () => faker.lorem.sentences(),
        address: () => faker.address.streetAddress(),
      }),
      facility: Factory.extend({
        uuid: () => faker.random.uuid(),
        name: () => faker.address.city(),
      }),
    },

    seeds(server) {
      server.createList('facility', 20);
      server.createList('pod', 10).forEach((pod) => {
        const facilitiesCount = getRandomArbitrary(1, 10);
        const factoryIds = [];
        for (let i = 0; i < facilitiesCount; i++) {
          factoryIds.push(getRandomArbitrary(1, 20));
        }
        pod.update({ facilityIds: uniq(factoryIds) });
      });
      server.create('user', { username: 'username', password: 'password' });
    },

    routes() {
      this.post('/api/auth', (schema, req) => {
        const { username, password } = JSON.parse(req.requestBody);
        const user = schema.db.users.findBy({ username, password });
        if (user) return new Response(201, {}, user);
        return new Response(401);
      });
      this.get('/api/pod/:id', function (schema, req) {
        const id = req.params.id;
        const pod = schema.pods.find(id);
        return this.serialize(pod, 'pod-with-relationships');
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
