import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
    sequelize.define(
        "OrderShipment",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            name_claimant: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            cedula_claimant: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            cellphone_claimant: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name_transmiter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            celphone_transmiter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city_transmiter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address_transmiter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name_receiver: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            celphone_receiver: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city_receiver: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address_receiver: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            weight: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            declared_value: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            product_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            pay_method: {
                type: DataTypes.STRING,
                allowNull: true,
            },         
        },
        { timestamps: false }
    );
}