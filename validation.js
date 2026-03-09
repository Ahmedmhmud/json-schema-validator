const { type } = require("./keywords/type.js");
const { properties } = require("./keywords/properties.js");
const { required } = require("./keywords/required.js");
const { ref } = require("./keywords/ref.js");

function validate(schema, instance, rootSchema = schema, context = { seenRefs: new Set() }){
    for(const [keyword, value] of Object.entries(schema)){
        if(!check(keyword, value, instance, schema, rootSchema, context)){
            return false;
        }
    }

    return true;
};

module.exports = { validate };

function check(keyword, keywordValue, instance, schema, rootSchema, context){
    switch(keyword){
        case "type":
            return type(keywordValue, instance);
        case "properties":
            return properties(keywordValue, instance, rootSchema, context);
        case "required":
            return required(keywordValue, instance);
        case "$ref":
            return ref(keywordValue, instance, rootSchema, context);
        default:
            return true;
    }
};