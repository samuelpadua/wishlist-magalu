'use strict'

import { Model, DataTypes } from 'sequelize'
import sequelize from '../../../config/database'
import Customer from './customer.model'

class Wishlist extends Model {
  static associate () {
    Wishlist.belongsTo(Customer)
  }
}

Wishlist.init({
  customer_id: DataTypes.INTEGER,
  title: DataTypes.STRING,
  brand: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  image: DataTypes.STRING,
  product_id: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Wishlist'
})

export default Wishlist
