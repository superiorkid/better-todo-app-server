import mongoose from "mongoose";
import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'

import TodoModel from "../src/todos/todo.model";
import server from '../app'
import {beforeEach} from "mocha";

chai.should()
chai.use(chaiHttp);

describe(`Todo`, () => {

    // before each test, we empty the database
    beforeEach((done) => {
        TodoModel.deleteMany({}, (err) => {
            done()
        })
    })

    describe("/GET todo", () => {
        it('it should GET all Todo', (done) => {
            chai.request(server)
                .get('/todos')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.data.should.length.eql([])
                    done()
                })
        })
    })

    describe("/POST todo", () => {
        it("it should create new todo", (done) => {
            let newTodo = {
                title: "test todo title",
                todo: "test todo body"
            }
            chai.request(server)
                .post('/todos')
                .send(newTodo)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status')
                    res.body.should.have.property('code')
                    res.body.should.have.property('message')
                    done()
                })
        })

        it('it should return 400 while create todo', (done) => {
            let newTodo = {
                title: "",
                todo: "test todo body"
            }

            chai.request(server)
                .post('/todos')
                .send(newTodo)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a("object")
                    res.body.should.have.property('errors')
                    res.body.errors.should.be.a('array')
                    done()
                })
        });
    })

    describe("/GET/:id todo", () => {
        it('it should get todo by id', (done) => {
            let newTodo = new TodoModel({title: "Belajar backend menggunakan express", todo: "belajar backend menggunakan express + typescript"})
            newTodo.save((err, todo) => {
                chai.request(server)
                    .get('/todos/' + todo.id)
                    .send(todo)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.data.should.have.property('title')
                        res.body.data.should.have.property('todo')
                        res.body.data.should.have.property('is_completed')
                        res.body.data.should.have.property('_id').eql(todo.id)
                        done()
                    })
            })
        });

        it('it should return 404 while get todo by id', (done) => {
            let newTodo = new TodoModel({title: "Belajar MERN stack", todo: "belajar full stack menggunakan MERN + typescript"})
            let dummyId = '123123123'
            newTodo.save((err, todo) => {
                chai.request(server)
                    .get('/todos/'+ dummyId)
                    .send(todo)
                    .end((err, res) => {
                        res.should.have.status(404)
                        res.body.should.have.property('message').eql("[❌] : Todo not found")
                        done()
                    })
            })
        });
    })


    describe("/PUT/:id todo", () => {
        it('it should update todo given the id', (done) => {
            let newTodo = new TodoModel({title: "Belajar Python", todo: "Belajar Python sampai mahir"})
            newTodo.save((err, todo) => {
                chai.request(server)
                    .put('/todos/' + todo.id)
                    .send({title: "Belajar flask framework", todo: "Belajar flask dari nol sampai mahir"})
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property("message").eql("[✅] Todo update successfully")
                        done()
                    })
            })
        });

        it('it should return 404 while update todo', (done) => {
            let newTodo = new TodoModel({title: "Belajar Python", todo: "Belajar Python sampai mahir"})
            let dummyId = "1231231231"
            newTodo.save((err, todo) => {
                chai.request(server)
                    .put('/todos/' + dummyId)
                    .send({title: "Belajar flask framework", todo: "Belajar flask dari nol sampai mahir"})
                    .end((err, res) => {
                        res.should.have.status(404)
                        res.body.should.be.a('object')
                        res.body.should.have.property("message").eql("[❌] : Todo not found")
                        done()
                    })
            })
        });
    })


    describe("/DELETE/:id todo", () => {
        it('should delete todo by id', (done) => {
            let newTodo = new TodoModel({title: "Belajar express", todo: "Belajar express sampai mahir"})
            newTodo.save((err, todo) => {
                chai.request(server)
                    .delete('/todos/' + todo.id)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property("message").eql("[✅] Todo deleted successfully")
                        done()
                    })
            })
        });

        it('should return 404 whie delete todo', (done) => {
            let newTodo = new TodoModel({title: "Belajar express v2", todo: "Belajar express sampai mahir v2"})
            let dummyId = "123123123"
            newTodo.save((err, todo) => {
                chai.request(server)
                    .delete('/todos/' + dummyId)
                    .end((err, res) => {
                        res.should.have.status(404)
                        res.body.should.be.a('object')
                        res.body.should.have.property("message").eql("[❌] : Todo not found")
                        done()
                    })
            })
        });
    })
})



