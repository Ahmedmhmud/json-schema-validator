import { type } from "./keywords/type.js";

export function validate(schema, instance){
    for(const [keyword, value] of Object.entries(schema)){
        if(!check(keyword, value, instance, schema)){
            return false;
        }
    }

    return true;
};

function check(keyword, keywordValue, instance){
    switch(keyword){
        case "type":
            return type(keywordValue, instance);
        default:
            return false;
    }
};