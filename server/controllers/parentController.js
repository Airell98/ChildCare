const { Nanny, Child, Agency, Parent } = require("../models");
const compareSyncBcrypt = require("../helper/compareSyncBcyrpt");
const jwtSign = require("../helper/jwtSign");
class ParentController {
  static registerParent(req, res, next) {
    const {
      name,
      email,
      password,
      city,
      birthDate,
      address,
      phoneNumber,
      gender,
    } = req.body;
    Parent.create({
      name,
      email,
      password,
      city,
      birthDate,
      address,
      phoneNumber,
      gender,
    })
      .then((parent) => {
        res.status(201).json(parent);
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginParent(req, res, next) {
    const { email, password } = req.body;
    Parent.findOne({
      where: {
        email,
      },
    })
      .then((parent) => {
        if (!parent || !compareSyncBcrypt(password, parent.password)) {
          next({ name: "INVALID_EMAIL_PASSWORD" });
        } else {
          const token = jwtSign(parent);
          res.status(200).json({
            access_token: token,
            name: parent.name,
            message: "Login success"
          });
        }
      })
      .catch((err) => {
        console.log(err)
        next(err);
      });
  }

  static getAllParents(req, res, next){
    Parent.findAll({ attributes: ['id', 'name', 'email', 'password', 'city', 'birthDate', 'address', 'phoneNumber', 'gender']})
    .then(parents => {
      res.status(200).json(parents)
    })
    .catch(err => {
      next(err)
    })
  }

  static getParentById(req, res, next){
    const {id} = req.params
    Parent.findOne({ where: {id}})
    .then(parent => {
      if(!parent){
        next({name: 'ERR_NOT_FOUND'})
      } else {
        res.status(200).json(parent)
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateDataParent(req, res, next){
    const {name, email, password, city, birthDate, address, phoneNumber, gender} = req.body
    const {id} = req.params
    Parent.findOne({where: {id}})
    .then(parent => {
      if(!parent){
        throw next({name: 'ERR_NOT_FOUND'})
      } else {
        return Parent.update({name, email, password, city, birthDate, address, phoneNumber, gender}, {where: {id}})
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
    Parent.destroy({where: {id}})
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

module.exports = ParentController;
