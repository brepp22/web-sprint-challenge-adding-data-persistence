// build your `/api/tasks` router here

const router = require('express').Router()
const Task = require('./model')

router.get('/', async (req, res , next) => {
    try {
        const tasks = await Task.getTasks()
        res.json(tasks)
    }
    catch(err) {
        next(err)
    }
})

router.post('/' , async (req, res, next) => {
    try{
       const task = await Task.postTasks(req.body)
       res.json(task)
    }
    catch(err){
        next(err)
    }
})


module.exports = router 