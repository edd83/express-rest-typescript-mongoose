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
var mongoose = require('mongoose');
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/items';
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
class Items {
    constructor() {
        // const kittySchema = new mongoose.Schema({
        //     name: String
        // });
        // // NOTE: methods must be added to the schema before compiling it with mongoose.model()
        // kittySchema.methods.speak = function () {
        //     var greeting = this.name
        //         ? "Meow name is " + this.name
        //         : "I don't have a name";
        //     console.log(greeting);
        // }
        // const Kitten = mongoose.model('Kitten', kittySchema);
        // const silence = new Kitten({ name: 'Silence' });
        // const fluffy = new Kitten({ name: 'Fluffy' });
        // console.log(silence.name); // 'Silence'
        // silence.speak();
        // console.log(fluffy.name); // 'Fluffy'
        // fluffy.speak();
        // Set the collections of items
        this._items = db.collection('items');
    }
    insertItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = ['Recylcing', 'Permaculture', 'Plastic waste', 'Save the sand'];
            const items = yield this._items.insertMany([
                // MongoDB adds the _id field with an ObjectId if _id is not present
                {
                    _id: 0,
                    item: `${name[0]}`,
                    src: 'https://vignette.wikia.nocookie.net/arianagrande/images/7/70/Example.png/revision/latest?cb=20160301231046',
                    status: 'A',
                    articles: [
                        {
                            name: `${name[0]} 1`,
                            date: '01/02/2019',
                            content: `Hello this is an example of ${name[0]}`
                        },
                        {
                            name: `${name[0]} 2`,
                            date: '05/02/2019',
                            content: `Hello this is an example of ${name[0]}`
                        }
                    ],
                    tags: ['blank', 'red', `${name[0]}`, 'planet']
                },
                {
                    _id: 1,
                    item: `${name[1]}`,
                    src: 'https://vignette.wikia.nocookie.net/arianagrande/images/7/70/Example.png/revision/latest?cb=20160301231046',
                    status: 'B',
                    articles: [
                        {
                            name: `${name[1]} 1`,
                            date: '01/02/2019',
                            content: `Hello this is an example of ${name[1]}`
                        },
                        {
                            name: `${name[1]} 1`,
                            date: '05/02/2019',
                            content: `Hello this is an example of ${name[1]}`
                        }
                    ],
                    tags: ['red', 'blank', `${name[1]}`, 'planet']
                },
                {
                    _id: 2,
                    item: `${name[2]}`,
                    src: 'https://vignette.wikia.nocookie.net/arianagrande/images/7/70/Example.png/revision/latest?cb=20160301231046',
                    status: 'A',
                    articles: [
                        {
                            name: `${name[2]} 1`,
                            date: '01/02/2019',
                            content: `Hello this is an example of ${name[0]}`
                        },
                        {
                            name: `${name[2]} 1`,
                            date: '05/02/2019',
                            content: `Hello this is an example of ${name[0]}`
                        }
                    ],
                    tags: ['red', 'blank', `${name[2]}`, 'planet']
                },
                {
                    _id: 3,
                    item: `${name[3]}`,
                    src: 'https://vignette.wikia.nocookie.net/arianagrande/images/7/70/Example.png/revision/latest?cb=20160301231046',
                    status: 'C',
                    articles: [
                        {
                            name: `${name[3]} 1`,
                            date: '01/02/2019',
                            content: `Hello this is an example of ${name[0]}`
                        },
                        {
                            name: `${name[3]} 1`,
                            date: '05/02/2019',
                            content: `Hello this is an example of ${name[0]}`
                        }
                    ],
                    tags: ['blank', 'red', `${name[3]}`, 'planet']
                }
            ]);
            console.log(items);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._items.find({ item: 'Permaculture' });
            return yield find.toArray()[0];
        });
    }
    getFirstItem() {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._items.find({ _id: '1' });
            return yield find.toArray()[0];
        });
    }
}
exports.default = Items;
