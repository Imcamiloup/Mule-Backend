import {TypeShipment} from '../database/db.js';

const getAllTypeShipmentsController = async () => {
    try {
        const shipments = await TypeShipment.findAll();
        return shipments;
    } catch (error) {
        throw new Error('Error get shipments: ' + error.message);
    }
}

const getTypeShipmentByIdController = async (id) => {
    try {
        const shipment = await TypeShipment.findByPk(id);
        return shipment;
    } catch (error) {
        throw new Error('Error get shipment by id: ' + error.message);
    }
}

const createTypeShipmentController = async (
            name,
            description
) => {
    try {
        const newShipment = await TypeShipment.create({ 
            name,
            description
        });
        return newShipment;
    } catch (error) {
        throw new Error('Error create type shipment: ' + error.message);
    }
}

const updateTypeShipmentController = async (id, name, description) => {
    try {
        const shipment = await TypeShipment.findByPk(id);
        if (!shipment) throw new Error('Shipment not found');
        shipment.name = name;
        shipment.description = description;
        await shipment.save();
        return shipment;
    } catch (error) {
        throw new Error('Error update shipment: ' + error.message);
    }
}

const deleteTypeShipmentController = async (id) => {
    try {
        const shipment = await TypeShipment.findByPk(id);
        if (!shipment) throw new Error('Shipment not found');
        await shipment.destroy();
        return shipment;
    } catch (error) {
        throw new Error('Error delete shipment: ' + error.message);
    }
}

export {
    getAllTypeShipmentsController,
    getTypeShipmentByIdController,
    createTypeShipmentController,
    updateTypeShipmentController,
    deleteTypeShipmentController,
};