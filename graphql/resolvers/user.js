
module.exports= {
    // Standard User Query Property
    Query: {
        authUser: (_, __, { req: { user } }) => user,
        hello:()=>{
            return 'Hello from graphQL'
        }
    }
}