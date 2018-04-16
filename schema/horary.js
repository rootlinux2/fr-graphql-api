export const types = `
"Horary entitie"
type Horary {
    id: Int!
    date: [String]
    doctor: Doctor    
  }
`;

export const queries = `
    horary(id: Int!): Horary
    getAllHoraries: [Horary]
`;
export const mutations = `

`;