const { Message, Agency, Parent } = require('../models')

class MessageController{

    static getAllMsgAgency(req, res, next){
        const AgencyId = req.agencyData.id
        Message.findAll({ where: { AgencyId }, include: [{ model : Parent, attributes: ['id', 'name']}]})
        .then(messages => {
            const filterMsgArray = []
            for(let i = 0; i < messages.length; i++){
                if(i === 0 || messages[i].ParentId !== messages[i-1].ParentId){
                    filterMsgArray.push(messages[i])
                }
            }
            res.status(200).json(filterMsgArray)
        })
        .catch(err => {
            next(err)
        })
    }

    static getAllMsgParent(req, res, next){
        const ParentId = req.parentData.id
        Message.findAll({ where: { ParentId }, include: [{ model : Agency, attributes: ['id', 'name']}]})
        .then(messages => {
            const filterMsgArray = []
            for(let i = 0; i < messages.length; i++){
                if(i === 0 || messages[i].ParentId !== messages[i-1].ParentId){
                    filterMsgArray.push(messages[i])
                }
            }
            res.status(200).json(filterMsgArray)
        })
        .catch(err => {
            next(err)
        })
    }

    static getMsgAgency(req, res, next){
        const AgencyId = req.agencyData.id
        const {ParentId} = req.params
        Message.findAll({ where: { AgencyId, ParentId }})
        .then(messages => {
            res.status(200).json(messages)
        })
        .catch(err => {
            next(err)
        })
    }

    static getMsgParent(req, res, next){
        const ParentId = req.parentData.id
        const {AgencyId} = req.params
        Message.findAll({ where: { AgencyId, ParentId }, include: [{ model: Agency, attributes: ['id', 'email'] }]})
        .then(messages => {
            res.status(200).json(messages)
        })
        .catch(err => {
            next(err)
        })
    }

    static postMsgAgency(req, res, next){
        const AgencyId = req.agencyData.id
        const { ParentId } = req.params
        const { content } = req.body
        Message.create({ AgencyId, ParentId, content, sender : 'agency'})
        .then(message => {
            res.status(201).json(message)
        })
        .catch(err => {
            next(err)
        })

    }

    static postMsgParent(req, res, next){
        const ParentId = req.parentData.id
        const {AgencyId} = req.params
        const {content} = req.body
        Message.create({ AgencyId, ParentId, content, sender : 'parent'})
        .then(message => {
            res.status(201).json(message)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = MessageController