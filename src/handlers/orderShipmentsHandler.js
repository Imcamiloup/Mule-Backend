import {
    getAllOrderShipmentsController,
    getOrderShipmentByIdController,
    createOrderShipmentController,
    updateOrderShipmentController,
    deleteOrderShipmentController,
} from '../controllers/orderShipmentsController.js';

const getAllOrderShipmentsHandler = async (req, res) => {
    try {
        const shipments = await getAllOrderShipmentsController();
        res.status(200).send(shipments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getOrderShipmentByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const shipment = await getOrderShipmentByIdController(id);
        if (!shipment) throw new Error('Shipment not found');
        res.status(200).send(shipment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createOrderShipmentHandler = async (req, res) => {
    try {
        const {
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
            pay_method
          } = req.body;
        if (
            !name_claimant ||
            !cedula_claimant ||
            !cellphone_claimant ||
            !name_transmiter ||
            !celphone_transmiter ||
            !city_transmiter ||
            !address_transmiter ||
            !name_receiver ||
            !celphone_receiver ||
            !city_receiver ||
            !address_receiver ||
            !weight ||
            !declared_value ||
            !product_image ||
            !pay_method
        ) throw new Error('Missing required information')


        const newShipment = await createOrderShipmentController(
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
            pay_method
        );
        res.status(201).json(newShipment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateOrderShipmentHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, status } = req.body;
        const shipment = await updateOrderShipmentController(id, name, description, price, status);
        res.status(200).send(shipment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteOrderShipmentHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedShipment = await deleteOrderShipmentController(id);
        res.status(200).send(deletedShipment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export {
    getAllOrderShipmentsHandler,
    getOrderShipmentByIdHandler,
    createOrderShipmentHandler,
    updateOrderShipmentHandler,
    deleteOrderShipmentHandler
}