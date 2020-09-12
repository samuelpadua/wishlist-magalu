'use strict'

import { Model, DataTypes } from 'sequelize'
import sequelize from '../../../config/database'

class Customer extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate (models) {
    // define association here
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
