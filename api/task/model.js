// build your `Task` model here
const db = require('../../data/dbConfig')

async function getTasks() {
    const taskRows = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
            .select(
                't.task_id',
                't.task_description',
                't.task_notes',
                't.task_completed',
                'p.project_name',
                'p.project_description' 
            )

    const tasks = taskRows.map(row => ({
        task_id : row.task_id,
        task_description : row.task_description,
        task_notes : row.task_notes,
        task_completed : row.task_completed === 0 ? false : true,
        project_name: row.project_name, 
        project_description: row.project_description
    }))
    return tasks 
}

async function postTasks(task) {
    try{
        if (!task.task_description) {
            const error = new Error('Task description is required')
            error.statusCode = 400
            throw error
          }
          if (!task.project_id) {
            const error = new Error('Project ID is required')
            error.statusCode = 400
            throw error
          }
          const projectExists = await db('projects').where({ project_id: task.project_id }).first()
          if (!projectExists) {
            const error = new Error('Invalid Project ID')
            error.statusCode = 404
            throw error
          }
       
        const [taskId] = await db('tasks').insert(task)

        const taskRow = await db('tasks').where({ task_id : taskId}).first()

        const formattedTask = {
            task_id: taskRow.task_id,
            task_description: taskRow.task_description,
            task_completed: taskRow.task_completed === 1
        }

        return formattedTask
    }
    catch (error) {
        console.log('Error inserting task' , error)
        throw error
    }
}

module.exports = {
    getTasks,
    postTasks,
}