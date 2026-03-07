const { type } = require("./keywords/type.js");
const { properties } = require("./keywords/properties.js");
const { required } = require("./keywords/required.js");

function validate(schema, instance){
    for(const [keyword, value] of Object.entries(schema)){
        if(!check(keyword, value, instance, schema)){
            return false;
        }
    }

    return true;
};

module.exports = { validate };

function check(keyword, keywordValue, instance, schema){
    switch(keyword){
        case "type":
            return type(keywordValue, instance);
        case "properties":
            return properties(keywordValue, instance);
        case "required":
            return required(keywordValue, instance);
        default:
            return true;
    }
};