const User = require('../models').User;
const PlaceVisited = require('../models').Place_visited;
const { ForbiddenError } = require('apollo-server');

let addPlaceVisited = async (userId, placeVisitedObj) => {
    try {
        let user = await User.findByPk(userId);
        if (!user || user.id !== userId) {
            throw new ForbiddenError("Not Authorized to perform this action")
        }
        let place_visited = await user.createPlace_visited(placeVisitedObj);
        return place_visited;

    } catch (err) {
        console.log(err)
        throw new Error("Error adding place visited")
    }
}

let deletePlaceVisited = async (placeVisitedId) => {
    try {
        let place_visited = await PlaceVisited.findByPk(placeVisitedId);
        return await place_visited.destroy();
    } catch (err) {
        console.error(err)
        throw new Error("Error deleting place visited")
    }
}

module.exports = {
    addPlaceVisited,
    deletePlaceVisited
}
