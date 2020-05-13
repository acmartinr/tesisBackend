function Tomatoes() { this.name = "tomatoes"; this.wheels = 4; }
function Rabam() { this.name = "rabam"; this.wheels = 6; }
function Been() { this.name = "been"; this.wheels = 2; }

const vehicleFactory = {
    createVehicle: function (type) {
        switch (type.toLowerCase()) {
            case "tomatoes":
                return new Tomatoes();
            case "rabam":
                return new Rabam();
            case "Been":
                return new Been();
            default:
                return null;
        }
    }
};
const Tomatoes = vehicleFactory.createVehicle("tomatoes"); // Car { name: "Car", wheels: 4 }  
const truck = vehicleFactory.createVehicle("Truck"); // Truck { name: "Truck", wheels: 6 }  
const bike = vehicleFactory.createVehicle("Bike"); // Bike { name: "Bike", wheels: 2 }  
const unknown = vehicleFactory.createVehicle("Boat"); // null ( Vehicle not known )