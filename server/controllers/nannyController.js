const { Nanny } = require('../models')

class NannyController{
    static getAllNannies(req, res, next){
        Nanny.findAll({ attributes: ['id', 'name', 'gender', 'phoneNumber', 'birthDate', 'address', 'imageUrl', 'city', 'expectedSalary']})
        .then(nannies => {
            res.status(200).json(nannies)
        })
        .catch(err => {
            next(err)
        })
    }

    static addNanny(req, res, next){
        const {name, gender, phoneNumber, birthDate, address, imageUrl, city, expectedSalary} = req.body
        
        // Area untuk menambahkan AgencyId dari middleware
        
        Nanny.create({name, gender, phoneNumber, birthDate, address, imageUrl, city, expectedSalary })
        .then(nanny => {
            res.status(201).json(nanny)
        })
        .catch(err => {
            next(err)
        })
    }

    static getNannyById(req, res, next){
        const {id} = req.params
        Nanny.findOne({where: {id}})
        .then(nanny => {
            if(!nanny){
                next({name: 'ERR_NOT_FOUND' })
            } else {
                res.status(200).json(nanny)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static updateDataNanny(req, res, next){
        const {name, gender, phoneNumber, birthDate, address, imageUrl, city, expectedSalary} = req.body
        const {id} = req.params
        Nanny.findOne({where: {id}})
        .then(nanny => {
            if(!nanny){
                throw next({name: 'ERR_NOT_FOUND'})
            } else {
                return Nanny.update({name, gender, phoneNumber, birthDate, address, imageUrl, city, expectedSalary}, {where: {id}})
            }
        })
        .then(resp => {
            if(resp[0] === 1){
                res.status(200).json({message: 'Successfully updated'})
            } else {
                next({name: 'ERR_NOT_FOUND' })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteById(req, res, next){
        const {id} = req.params
        Nanny.findOne({where: {id}})
        .then(nanny => {
            if(!nanny){
                throw next({name: 'ERR_NOT_FOUND'})
            } else {
                return Nanny.destroy({where: {id}})
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

module.exports = NannyController