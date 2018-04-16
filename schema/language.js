export const types = `
"Language entitie"
type Language {
    id: Int!
    name: String
    doctor: Doctor    
  }
`;

export const queries = `
    language(id: Int!): Language
    getAllLanguages: [Language]
`;
export const mutations = `

`;