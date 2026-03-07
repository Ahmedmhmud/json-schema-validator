const exampleSchema = {
    "type": "object",
    "required": ["name", "details"],
    "properties": {
        "name": { "type": "string" },
        "details": { 
            "type": "object",
            "required": ["age", "email", "degree"],
            "properties": {
                "age": { "type": "integer" },
                "degree": { 
                    "type": "object",
                    "required": ["name", "numberOfYears"],
                    "properties": {
                        "name": { "type": "string" },
                        "numberOfYears": { "type": "integer" }
                    }
                },
                "email": { "type": "string" }
            }
        }
    }
};

const validInstance = {
    name: "Ahmed",
    details: {
        age: 30,
        email: "ahmed@gmail.com",
        degree: {
            name: "Bachelor's",
            numberOfYears: 4
        }
    }
};

const invalidInstance = {
    name: "Ahmed",
    details: {
        age: 30,
        email: "ahmed@gmail.com",
        degree: {
            name: "Bachelor's"
        }
    }
};

module.exports = {
    exampleSchema,
    validInstance,
    invalidInstance
}