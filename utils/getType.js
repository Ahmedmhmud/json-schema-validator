export function getType(instance){
    if(instance === null){
        return "null";
    }else if(Array.isArray(instance)){
        return "array";
    }else if(typeof instance === "number"){
        return Number.isInteger(instance) ? "integer" : "number";
    }else if(typeof instance === "object"){
        return "object";
    }else if(typeof instance === "string"){
        return "string";
    }else if(typeof instance === "boolean"){
        return "boolean";
    }

    return undefined;
}