import CppArrayInput from '../InputGenCodeTemplates/cpp/ArrayInput';
import CppStringInput from '../InputGenCodeTemplates/cpp/StringInput';
import CppTreeInput from '../InputGenCodeTemplates/cpp/TreeInput';
import CppGraphInput from '../InputGenCodeTemplates/java/GraphInput';

import JavaArrayInput from '../InputGenCodeTemplates/java/ArrayInput';
import JavaStringInput from '../InputGenCodeTemplates/java/StringInput';
import JavaTreeInput from '../InputGenCodeTemplates/java/TreeInput';
import JavaGraphInput from '../InputGenCodeTemplates/java/GraphInput';

import PyArrayInput from '../InputGenCodeTemplates/python/ArrayInput';
import PyStringInput from '../InputGenCodeTemplates/python/StringInput';
import PyTreeInput from '../InputGenCodeTemplates/python/TreeInput';
import PyGraphInput from '../InputGenCodeTemplates/python/GraphInput';

export default {
    "cpp": {
        "Array Input": CppArrayInput,
        "String Input": CppStringInput,
        "Tree Input": CppTreeInput,
        "Graph Input": CppGraphInput
    },
    "java": {
        "Array Input": JavaArrayInput,
        "String Input": JavaStringInput,
        "Tree Input": JavaTreeInput,
        "Graph Input": JavaGraphInput
    },
    "python": {
        "Array Input": PyArrayInput,
        "String Input": PyStringInput,
        "Tree Input": PyTreeInput,
        "Graph Input": PyGraphInput
    }
};