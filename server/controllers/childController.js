const { Child } = require('../models')

class ChildController {
    static getAllChildren(req, res, next){
        Child.findAll({attributes: ['name', 'gender', 'birthDate', 'condition']})
        .then(children => {
            res.status(200).json(children)
        })
        .catch(err => {
            next(err)
        })
    }

    static addChild(req, res, next){
        const {name, gender, birthDate, condition} = req.body

        // Area untuk menambahkan ParentId dari middleware

        Child.create({name, gender, birthDate, condition})
        .then(child => {
            res.status(201).json(child)
        })
        .catch(err => {
            next(err)
        })
    }

    static getChildById(req, res, next){
        const {id} = req.params
        Child.findOne({where: {id}})
        .then(child => {
            if(!child){
                next({name: 'ERR_NOT_FOUND'})
            } else {
                res.status(200).json(child)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static updateDataChild(req, res, next){
        const {id} = req.params
        const {name, gender, birthDate, condition} = req.body

        Child.findOne({where: {id}})
        .then(child => {
            if(!child){
                throw next({name: 'ERR_NOT_FOUND' })
            } else {
                return Child.update({name, gender, birthDate, condition}, {where: {id}})
            }
        })
        .then(resp => {
            if(resp[0] === 1){
                res.status(200).json({message: 'Successfully updated'})
            } else {
                next(err)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteById(req, res, next){
        const {id} = req.params
        Child.findOne({where: {id}})
        .then(child => { 
            if(!child){
                throw next({name: 'ERR_NOT_FOUND' })
            } else {
                return Child.destroy({where: {id}})
            }
        })
        .then(resp => {
            if(resp === 1){
                res.status(200).json({message: 'Successfully deleted'})
            } else {
                next(err)
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ChildController