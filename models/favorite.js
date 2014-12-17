"use strict";

module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    venueId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.users);
      }
    }
  });

  return favorite;
};
