import {
    getAllOrderShipmentsController,
    getOrderShipmentByIdController,
    createOrderShipmentController,
    updateOrderShipmentController,
    deleteOrderShipmentController,
} from '../controllers/orderShipmentsController.js';

const getAllShipmentHandler = async (req, res) => {
    try {
        const shipments = await getAllOrderShipmentsController();
        res.status(200).send(shipments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getShipmentByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const shipment = await getOrderShipmentByIdController(id);
        if (!shipment) throw new Error('Shipment not found');
        res.status(200).send(shipment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createShipmentHandler = async (req, res) => {
    try {
        const { name, description, price, status } = req.body;
        if (!name || !description || !price || !status) throw new Error('Missing fields');
        const newShipment = await createOrderShipmentController(name, description, price, status);
        res.status(201).json(newShipment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateShipmentHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, status } = req.body;
        const shipment = await updateOrderShipmentController(id, name, description, price, status);
        res.status(200).send(shipment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteShipmentHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedShipment = await deleteOrderShipmentController(id);
        res.status(200).send(deletedShipment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export {
    getAllShipmentHandler,
    getShipmentByIdHandler,
    createShipmentHandler,
    updateShipmentHandler,
    deleteShipmentHandler
}