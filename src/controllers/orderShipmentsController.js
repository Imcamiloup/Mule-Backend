import {OrderShipment} from '../database/db.js';

const getAllOrderShipmentsController = async () => {
    try {
        const shipments = await OrderShipment.findAll();
        return shipments;
    } catch (error) {
        throw new Error('Error get shipments: ' + error.message);
    }
}

const getOrderShipmentByIdController = async (id) => {
    try {
        const shipment = await OrderShipment.findByPk(id);
        return shipment;
    } catch (error) {
        throw new Error('Error get shipment by id: ' + error.message);
    }
}

const createOrderShipmentController = async (name, description, price, status) => {
    try {
        const newShipment = await OrderShipment.create({ name, description, price, status });
        return newShipment;
    } catch (error) {
        throw new Error('Error create shipment: ' + error.message);
    }
}

const updateOrderShipmentController = async (id, name, description, price, status) => {
    try {
        const shipment = await OrderShipment.findByPk(id);
        shipment.name = name;
        shipment.description = description;
        shipment.price = price;
        shipment.status = status;
        await shipment.save();
        return shipment;
    } catch (error) {
        throw new Error('Error update shipment: ' + error.message);
    }
}

const deleteOrderShipmentController = async (id) => {
    try {
        if (!id) throw new Error('Missing id field');
        const shipment = await OrderShipment.findByPk(id);
        if (!shipment) throw new Error('Shipment not found');
        await shipment.destroy();
        return 'Shipment deleted successfully';
    } catch (error) {
        throw new Error('Error delete shipment: ' + error.message);
    }
}

export {
    getAllOrderShipmentsController,
    getOrderShipmentByIdController,
    createOrderShipmentController,
    updateOrderShipmentController,
    deleteOrderShipmentController,
};