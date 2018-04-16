export const types = `
"Address entitie"
type Address {
    id: Int!
    streetAddress: String
    doctor: Doctor
    city: String
    state: String
    country: String
    latitude: String
    longitude: String
    zip: String
  }
`;

export const queries = `
    address(id: Int!): Address
    getAllAddress: [Address]
    getAllUniqueAddress: [Address]
`;
export const mutations = `

`;