export const types = `
"Procedure entitie"
type Procedure {
    id: Int!
    name: String
    doctor: Doctor    
  }
`;

export const queries = `
    procedure(id: Int!): Procedure
    getAllProcedures: [Procedure]
`;
export const mutations = `

`;