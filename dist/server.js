"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const items_1 = require("./items");
const Joi = require('joi');
const express = require('express');
const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
];
class Server {
    constructor(port) {
        this.port = port;
        this.items = new items_1.default;
    }
    start() {
        const app = express();
        app.use(express.json());
        app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield this.items.find();
            res.send(results);
        }));
        app.get('/api/courses', (req, res) => {
            res.send(courses);
        });
        app.get('/api/courses/:id', (req, res) => {
            const course = courses.find(c => c.id === parseInt(req.params.id));
            if (!course)
                return res.status(404).send('Course id was not found');
            res.send(course);
        });
        app.post('/api/courses', (req, res) => {
            const { error } = this.validateCourse(req.body);
            if (error)
                return res.status(404).send(error.details[0].message);
            const course = {
                id: courses.length + 1,
                name: req.body.name
            };
            courses.push(course);
            res.send(course);
        });
        app.put('/api/courses/:id', (req, res) => {
            const course = courses.find(c => c.id === parseInt(req.params.id));
            if (!course)
                return res.status(404).send('Course id was not found');
            const { error } = this.validateCourse(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            if (course)
                course.name = req.body.name;
            res.send(course);
        });
        app.delete('/api/courses/:id', (req, res) => {
            const course = courses.find(c => c.id === parseInt(req.params.id));
            if (!course)
                return res.status(404).send('Course id was not found');
            if (course) {
                const index = courses.indexOf(course);
                courses.splice(index, 1);
            }
            res.send(course);
        });
        app.listen(this.port, () => __awaiter(this, void 0, void 0, function* () {
            console.log('Serveur démarré!');
            yield this.items.insertItems();
        }));
    }
    validateCourse(course) {
        const schema = {
            name: Joi.string().min(3).required()
        };
        return Joi.validate(course, schema);
    }
}
exports.default = Server;
