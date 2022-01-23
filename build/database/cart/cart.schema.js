"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = __importStar(require("mongoose"));
const CarritoSchema = new Mongoose.Schema({
    titular: String,
    productos: Array,
    finalizo: Boolean
});
//MessagesSchema.statics.findAll = findAll;
//UserSchema.statics.findByAge = findByAge;
//UserSchema.methods.setLastUpdated = setLastUpdated;
//UserSchema.methods.sameLastName = sameLastName;
exports.default = CarritoSchema;
//# sourceMappingURL=cart.schema.js.map