import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },

      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
          is: /^[a-zA-Z0-9,.\s]+$/,
        },
      },

      score: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
          is: /^\d+$/,
        },
      },
    },
    { timestamps: false }
  );
};
