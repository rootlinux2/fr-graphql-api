export const types = `
"Doctor entitie"
    type Doctor {        
        id: Int!
        firstName: String
        lastName: String
        age: Int
        title: String
        gender: Int
        details: String    
        address: [Address]
        horary: [Horary]
        image: String
        rating: Float
        language: [Language]
        procedure: [Procedure]
        medicalPlane: [medicalPlane]
    }
`;

export const queries = `
    doctor(id: Int!): Doctor
    getAllDoctors: [Doctor]
    
`;
export const mutations = `
    createDoctor(id:Int, firstName:String, lastName:String, age:Int): Doctor!
`;