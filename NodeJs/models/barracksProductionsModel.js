const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barracksProductionsSchema = new Schema ({
        idVillage: { type: Number, required: true },
        troopName: { type: String, required: true },
        troopId: { type: Number, required: true },
        troopCount: { type: Number, required: true },
        troopProdTime: { type: Number, required: true },
        timeStarted: { type: Number, required: true },
        timeCompleted: { type: Number, required: true },
        lastUpdate: { type: Number, required: true },
        troopsDoneAlready: { type: Number, required: true }
});

var barracksProductions = module.exports = mongoose.model('barracksProductions', barracksProductionsSchema);

module.exports.get = function (callback, limit) {
        barracksProductions.find(callback).limit(limit);
}