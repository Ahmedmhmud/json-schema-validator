const { getType } = require("../utils/getType.js");

function properties(schema, instance) {
	const { validate } = require("../validation.js");

	if(getType(instance) !== "object"){
		return true;
	}

    let isValid = true;
	for(const [propertyName, propertySchema] of Object.entries(schema)){
		const propertyValue = instance[propertyName];

		if(!validate(propertySchema, propertyValue)){
			isValid = false;
		}
	}

	return isValid;
}

module.exports = { properties };
