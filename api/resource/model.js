// build your `Resource` model here
const db = require('../../data/dbConfig')

async function getResources(){
    return db('resources as r')
}

async function postResources(resource) {
    try {

        const existingResource = await db('resources').where({ resource_name: resource.resource_name }).first()
    
        if (existingResource) {
          const error = new Error('Resource name already exists');
          error.statusCode = 402
          throw error
        }
        const [resourceId] = await db('resources').insert(resource)
        const resourceRow = await db('resources').where({ resource_id : resourceId}).first()

        const formattedResource = {
            resource_id : resourceRow.resource_id,
            resource_name : resourceRow.resource_name,
            resource_description: resourceRow.resource_description,
        }
        return formattedResource
    } catch (error) {
        console.log('Error inserting resource' , error)
        throw error 
    }
}

module.exports = {

    getResources,
    postResources,

}