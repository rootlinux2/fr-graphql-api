import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';

import * as Doctor from './schema/doctor';
import * as Address from './schema/address';
import * as Horary from './schema/horary';
import * as Language from './schema/language';
import * as Procedure from './schema/procedure';
import * as Carrier from './schema/carrier';

import * as medicalPlane from './schema/medicalPlane';


import { addressUrl, doctorUrl, horaryUrl, languageUrl, procedureUrl, carrierUrl, medicalPlaneUrl } from './apiroutes';
import { filter, uniqBy } from 'lodash';


const types = [];
const queries = [];
const mutations = [];

const schemas = [Doctor, Address, Horary, Language, Procedure, Carrier, medicalPlane];

schemas.forEach(function(s) {
    types.push(s.types);
    queries.push(s.queries);
    mutations.push(s.mutations);
});

const typeDefs = `
  
${types.join('\n')}  
    
  type Query {
    ${queries.join('\n')}    
  }
  type Mutation {
    ${mutations.join('\n')}    
  }`;

const resolvers = {
    Query: {
        address: (_, args) => axios.get(`${addressUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        doctor: (_, args) => axios.get(`${doctorUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        horary: (_, args) => axios.get(`${horaryUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        language: (_, args) => axios.get(`${languageUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        procedure: (_, args) => axios.get(`${procedureUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        carrier: (_, args) => axios.get(`${carrierUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        medicalPlane: (_, args) => axios.get(`${medicalPlaneUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        getAllDoctors: () => axios.get(doctorUrl).then(res => res.data).catch(err => console.error(err)),
        getAllHoraries: () => axios.get(horaryUrl).then(res => res.data).catch(err => console.error(err)),
        getAllLanguages: () => axios.get(languageUrl).then(res => res.data).catch(err => console.error(err)),
        getAllProcedures: () => axios.get(procedureUrl).then(res => res.data).catch(err => console.error(err)),
        getAllAddress: () => axios.get(addressUrl).then(res => res.data).catch(err => console.error(err)),
        getAllUniqueAddress: () => axios.get(addressUrl).then(({ data }) => uniqBy(data, (d) => `${d['country']} ${d['city']}`)).catch(err => console.error(err)),
        getAllCarrier: () => axios.get(carrierUrl).then(res => res.data).catch(err => console.error(err)),
        getAllmedicalPlane: () => axios.get(medicalPlaneUrl).then(res => res.data).catch(err => console.error(err)),
    },
    Doctor: {
        address: (doctor) => axios.get(addressUrl).then(({ data }) => filter(data, { doctorId: doctor.id })).catch(err => console.error(err)),
        horary: (doctor) => axios.get(horaryUrl).then(({ data }) => filter(data, { doctorId: doctor.id })).catch(err => console.error(err)),
        language: (doctor) => axios.get(languageUrl).then(({ data }) => filter(data, { doctorId: doctor.id })).catch(err => console.error(err)),
        procedure: (doctor) => axios.get(procedureUrl).then(({ data }) => filter(data, { doctorId: doctor.id })).catch(err => console.error(err))
    },
    Address: {
        doctor: (address) => axios.get(doctorUrl).then(({ data }) => filter(data, { id: address.doctorId })).catch(err => console.error(err))
    },
    Horary: {
        doctor: (horary) => axios.get(horaryUrl).then(({ data }) => filter(data, { id: horary.doctorId })).catch(err => console.error(err))
    },
    Procedure: {
        doctor: (procedure) => axios.get(procedureUrl).then(({ data }) => filter(data, { id: procedure.doctorId })).catch(err => console.error(err))
    },

    Mutation: {
        createDoctor(_, {
            id,
            firstName,
            lastName,
            age,
            title
        }) {
            return axios.post(doctorUrl, {
                id,
                firstName,
                lastName,
                age,
                title
            }).then(res => res.data);
        }
    }
};

const executableSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
    mutations: mutations

});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: executableSchema,
    context: {}
}));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));
app.listen(process.env.PORT || 4000, () => {
    console.log('Go to http://localhost:4000/graphiql to run queries!');
});