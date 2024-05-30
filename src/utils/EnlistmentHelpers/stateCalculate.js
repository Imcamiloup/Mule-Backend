const statesByTypeShipment = (typeshipmentName) => {
    if (typeshipmentName === "pickup") {
      const statesArray = [
        "Paquete Asignado",
        "Paquete en rumbo de recolección",
        "Paquete en recolección",
        "Paquete rumbo al a destino",
        "Paquete entregado",
    ];}
    if(typeshipmentName === "branch to door"){
      const statesArray = [
        "Paquete Asignado",
        "Paquete en rumbo de recolección",
        "Paquete en recolección",
        "Paquete en rumbo a sucursal de destino",
        "Paquete en camino a sucursal de destino",
        "Paquete en sucursal de destino",
        "Paquete rumbo al a destino",
        "Paquete entregado",
    ];}
    if (typeshipmentName === "door to branch"){
      const statesArray = [
        "Paquete Asignado",
        "Paquete en rumbo de recolección",
        "Paquete en recolección",
        "Paquete en camino a sucursal de destino",
        "Paquete listo para recoger en sucursal",
    ];}
    if (typeshipmentName === "branhc to branch"){
      const statesArray = [
        "Paquete Asignado",
        "Paquete en rumbo de recolección",
        "Paquete rumbo a sucursal de destino",
        "Paquete entregado",
    ];}
    return statesArray;
 }

 export default statesByTypeShipment;