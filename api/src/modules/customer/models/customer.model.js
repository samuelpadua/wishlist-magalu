'use strict'

import { Model, DataTypes } from 'sequelize'
import sequelize from '../../../config/database'
import Wishlist from './wishlist.model'

class Customer extends Model {
  static associate () {
    Customer.hasMany(Wishlist)
  }
}

Customer.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Customer'
})

export default Customer
