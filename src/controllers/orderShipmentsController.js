import {OrderShipment, TypeShipment} from '../database/db.js';


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

const createOrderShipmentController = async (
            name_claimant,
            cedula_claimant,
            cellphone_claimant,
            name_transmiter,
            celphone_transmiter,
            city_transmiter,
            address_transmiter,
            name_receiver,
            celphone_receiver,
            city_receiver,
            address_receiver,
            weight,
            declared_value,
            product_image,
            pay_method,
            type_shipment_id
) => {
    try {

        const typeShipment = await TypeShipment.findByPk(type_shipment_id);
        if (!typeShipment) throw new Error('Type shipment not found');

        const newOrderShipment = await OrderShipment.create({ 
            name_claimant,
            cedula_claimant,
            cellphone_claimant,
            name_transmiter,
            celphone_transmiter,
            city_transmiter,
            address_transmiter,
            name_receiver,
            celphone_receiver,
            city_receiver,
            address_receiver,
            weight,
            declared_value,
            product_image,
            pay_method,
            type_shipment_id,
        },
    );
        

        return newOrderShipment;
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