import { Request, Response } from "express";
import Items from "./items";
const Joi = require('joi');
const express = require('express');

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
];

export default class Server {

    readonly port: number;
    items: Items;

    constructor(port: number) {
        this.port = port;
        this.items = new Items;
    }

    start(): void {
        const app = express();

        app.use(express.json());

        app.get('/', async (req: Request, res: Response) => {
            const results = await this.items.find();
            res.send(results);
        });

        app.get('/api/courses', (req: Request, res: Response) => {
            res.send(courses);
        });

        app.get('/api/courses/:id', (req: Request, res: Response) => {
            const course = courses.find(c => c.id === parseInt(req.params.id));
            if (!course) return res.status(404).send('Course id was not found');
            res.send(course);
        });

        app.post('/api/courses', (req: Request, res: Response) => {
            const { error } = this.validateCourse(req.body);
            if (error) return res.status(404).send(error.details[0].message);

            const course = {
                id: courses.length + 1,
                name: req.body.name
            };
            courses.push(course);
            res.send(course);
        });

        app.put('/api/courses/:id', (req: Request, res: Response) => {
            const course = courses.find(c => c.id === parseInt(req.params.id));
            if (!course) return res.status(404).send('Course id was not found');

            const { error } = this.validateCourse(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            if (course) course.name = req.body.name;
            res.send(course);
        });

        app.delete('/api/courses/:id', (req: Request, res: Response) => {
            const course = courses.find(c => c.id === parseInt(req.params.id));
            if (!course) return res.status(404).send('Course id was not found');

            if (course) {
                const index = courses.indexOf(course);
                courses.splice(index, 1);
            }

            res.send(course);
        });

        app.listen(this.port, async() => {
            console.log('Serveur démarré!');
            await this.items.insertItems();
        });
    }

    validateCourse(course: JSON) {
        const schema = {
            name: Joi.string().min(3).required()
        };
        return Joi.validate(course, schema);
    }
}