const test = require('node:test');
const assert = require('node:assert');
const { validate } = require('../validation.js');
const {
    exampleSchema,
    validInstance,
    invalidInstance,
    refSchemaRoot,
    refRootValidInstance,
    refRootInvalidInstance,
    refSchemaNested,
    refNestedValidInstance,
    refNestedInvalidInstance,
    refSchemaChained,
    refChainedValidInstance,
    refChainedInvalidInstance
} = require('../test-data.js');

test('validates nested objects', () => {
    assert.strictEqual(validate(exampleSchema, validInstance), true);
    assert.strictEqual(validate(exampleSchema, invalidInstance), false);
});

test('root level $ref', () => {
    assert.strictEqual(validate(refSchemaRoot, refRootValidInstance), true);
    assert.strictEqual(validate(refSchemaRoot, refRootInvalidInstance), false);
});

test('nested $ref in properties', () => {
    assert.strictEqual(validate(refSchemaNested, refNestedValidInstance), true);
    assert.strictEqual(validate(refSchemaNested, refNestedInvalidInstance), false);
});

test('chained $ref', () => {
    assert.strictEqual(validate(refSchemaChained, refChainedValidInstance), true);
    assert.strictEqual(validate(refSchemaChained, refChainedInvalidInstance), false);
});

test('type keyword works', () => {
    assert.strictEqual(validate({ type: 'string' }, 'hello'), true);
    assert.strictEqual(validate({ type: 'string' }, 123), false);
    assert.strictEqual(validate({ type: 'integer' }, 42), true);
    assert.strictEqual(validate({ type: 'object' }, {}), true);
});

test('required keyword', () => {
    const schema = {
        type: 'object',
        required: ['name'],
        properties: { name: { type: 'string' } }
    };
    assert.strictEqual(validate(schema, { name: 'John' }), true);
    assert.strictEqual(validate(schema, {}), false);
});
