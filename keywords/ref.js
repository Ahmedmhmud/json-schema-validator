const { myOwnURIResolver } = require('../utils/resolveURI.js');

function ref(refValue, instance, rootSchema, context) {
    const resolvedSchema = myOwnURIResolver({ "$ref": refValue }, rootSchema, __dirname);
    if(resolvedSchema === undefined){
        return false;
    }

    if(context.seenRefs.has(refValue)){
        return console.error("Circular reference because of $ref: " + refValue);
    }

    context.seenRefs.add(refValue);

    const { validate } = require("../validation.js");
    const isValid = validate(resolvedSchema, instance, rootSchema, context);
    context.seenRefs.delete(refValue);

    return isValid;
}

module.exports = { ref };