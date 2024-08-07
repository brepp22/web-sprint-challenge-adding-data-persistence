// build your `Project` model here

const db = require('../../data/dbConfig')

async function getProjects() {
  const projectRows = await db('projects as p')

const projects = projectRows.map(row => ({
    project_id: row.project_id,
    project_name: row.project_name,
    project_description: row.project_description,
    project_completed: row.project_completed === 0 ? false : true
  }))

  return projects
}

async function postProjects(project) {
    try{

      if (!project.project_name) {
      const error = new Error('Project name is required');
      error.statusCode = 400
      throw error
      }

      const [projectId] = await db('projects').insert(project)
    
      const projectRow = await db('projects').where({ project_id: projectId }).first()
    
      const formattedProject = {
        project_id: projectRow.project_id,
        project_name: projectRow.project_name,
        project_description: projectRow.project_description,
        project_completed: projectRow.project_completed === 1
      }
  
      return formattedProject

    } catch (error) {
        console.error('Error inserting project', error)
        throw error
      }

    }


module.exports = {
    getProjects, 
    postProjects,

}