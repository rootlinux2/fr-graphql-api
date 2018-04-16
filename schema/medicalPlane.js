export const types = `
"Medical Plane entitie"
type medicalPlane {
    id: Int!
    name: String
    doctor: [Doctor]
    rank: Float
    carrier: Carrier
  }
`;
export const queries = `
    medicalPlane(id: Int!): medicalPlane
    getAllmedicalPlane: [medicalPlane]    
`;
export const mutations = ``;