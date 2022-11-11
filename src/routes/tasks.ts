import { Router, Request, Response } from "express";

const router = Router();

//model

import Task from '../models/Task'

router.route('/create')
    .get((req:Request, res:Response)=>{
        res.render('tasks/create')
    })
    .post(async(req: Request, res:Response, next) => {
        const {title, description} = req.body;
        if (!title || !description){
            return res.status(422).render('tasks/alert')
        }
        const newTask = new Task({title, description})
        await newTask.save();
        res.redirect('/tasks/list')
    })

router.route('/list')
    .get(async (req: Request, res:Response) => {
        const tasks = await Task.find({}).lean()
        if(tasks.length == 0){
            return res.render('tasks/empty')
        }
        res.render('tasks/list', { tasks })
    })

router.route('/delete/:id')
    .get(async (req: Request, res:Response) => {
        const { id } = req.params;
        await Task.findByIdAndDelete(id)
        res.redirect('/tasks/list')
    })

router.route('/edit/:id')
    .get(async (req: Request, res:Response)=>{
        const { id } = req.params;
        const task = await Task.findById(id).lean()
        res.render('tasks/edit', { task });
    })
    .post(async(req:Request, res:Response) => {
        const { id } = req.params;
        const { title, description } = req.body;
        if (!title || !description){
            return res.status(422).render('tasks/alert')
        }
        await Task.findByIdAndUpdate(id, { title, description})
        res.redirect('/tasks/list')
    })

router.route('/detail/:id')
    .get(async (req: Request, res: Response) =>{
        const { id } = req.params;
        const taskDetail = await Task.findById(id).lean()
        res.render('tasks/detail', { taskDetail })
    })
    .post(async (req: Request, res: Response)=>{
        const { id } = req.params;
        const { status } = req.body;
        await Task.findByIdAndUpdate(id, { status })
    })
 
export default router;