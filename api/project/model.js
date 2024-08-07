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

module.exports = {
    getProjects, 

}