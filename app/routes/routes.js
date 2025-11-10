module.exports = app =>{
    const users = require ("../controllers/user.controller");
    const locations = require ("../controllers/locations.controller");

    var router = require("express").Router();

    // login
    router.post("/users", users.login);
    //get AllUsers
    router.get("/users", users.getAllUsers);
    
    router.get("/locations", locations.getAllLocations);
    router.get("/locations/:id", locations.getLocationById);
    router.post("/locations", locations.createLocation);
    router.put("/locations/:id", locations.updateLocation);
    router.delete("/locations/:id", locations.deleteLocation);

    app.use("/", router);
}