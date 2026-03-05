const fs = require("fs");
const path = require("path");

function myOwnURIResolver(schema, rootSchema, currentFilePath) {
    if (!schema || typeof schema !== "object") {
        return undefined;
    }

    const root = rootSchema || schema;
    const uri = schema["$ref"];

    if (typeof uri !== "string") {
        return undefined;
    }

    return resolveRefValue(uri, root, currentFilePath);
}

function resolveRefValue(refValue, rootSchema, currentFilePath) {
    if (typeof refValue !== "string") {
        return undefined;
    }

    const root = rootSchema;
    if (!root || typeof root !== "object") {
        return undefined;
    }

    const hashIndex = refValue.indexOf("#");
    const baseUri = hashIndex === -1 ? refValue : refValue.substring(0, hashIndex);
    const fragment = hashIndex === -1 ? "" : refValue.substring(hashIndex + 1);

    if (baseUri) {
        const resolvedBasePath = resolveRefPath(baseUri, currentFilePath);
        if (!resolvedBasePath || !fs.existsSync(resolvedBasePath)) {
            return undefined;
        }

        const externalDoc = JSON.parse(fs.readFileSync(resolvedBasePath, "utf8"));
        if (!fragment || fragment === "/") {
            return externalDoc;
        }

        if (!fragment.startsWith("/")) {
            return undefined;
        }

        return resolvePointer(externalDoc, fragment);
    }

    if (!fragment || fragment === "/") {
        return root;
    }

    if (!fragment.startsWith("/")) {
        return undefined;
    }

    return resolvePointer(root, fragment);
}

function resolveRefsInObject(node, rootSchema, currentFilePath) {
    const root = rootSchema || node;

    if (Array.isArray(node)) {
        return node.map((item) => resolveRefsInObject(item, root, currentFilePath));
    }

    if (!node || typeof node !== "object") {
        return node;
    }

    if (typeof node.$ref === "string") {
        const resolved = resolveRefValue(node.$ref, root, currentFilePath);
        return resolveRefsInObject(resolved, root, currentFilePath);
    }

    const out = {};
    for (const [key, value] of Object.entries(node)) {
        out[key] = resolveRefsInObject(value, root, currentFilePath);
    }

    return out;
}

function resolvePointer(document, fragment) {
    return fragment.split("/").slice(1).reduce((obj, part) => {
        if (obj === undefined || obj === null) {
            return undefined;
        }

        const decoded = part.replace(/~1/g, "/").replace(/~0/g, "~");
        return typeof obj === "object" ? obj[decoded] : undefined;
    }, document);
}

function resolveRefPath(baseUri, currentFilePath) {
    if (!baseUri) {
        return undefined;
    }

    if (path.isAbsolute(baseUri)) {
        return baseUri;
    }

    if (!currentFilePath) {
        return path.resolve(process.cwd(), baseUri);
    }

    return path.resolve(path.dirname(currentFilePath), baseUri);
}

module.exports = { myOwnURIResolver, resolveRefsInObject };