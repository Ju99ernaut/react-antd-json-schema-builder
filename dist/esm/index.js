import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import noop from 'lodash/noop';
import assign from 'lodash/fp/assign';
import entries from 'lodash/fp/entries';
import find from 'lodash/fp/find';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import 'lodash/fp/isEmpty';
import 'lodash/fp/keys';
import map from 'lodash/fp/map';
import 'lodash/fp/noop';
import pick from 'lodash/fp/pick';
import reduce from 'lodash/fp/reduce';
import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import { CaretDownFilled, CaretRightFilled, SettingOutlined, DeleteOutlined, PlusSquareFilled } from '@ant-design/icons';
import { Modal, Form, Input, InputNumber, Switch, Select, Row, Col, Button } from 'antd';
import { isFunction } from 'lodash';
import entries$1 from 'lodash/entries';

var jsonSchemaTraverse = {exports: {}};

var traverse = jsonSchemaTraverse.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}

const addIdsToSchema = (schema) => {
    const newSchema = { ...schema };
    jsonSchemaTraverse.exports(schema, (schema, _parent, _root, _parentJSONParent, _parentKeyword, _parentSchema, keyIndex) => {
        if (!keyIndex)
            return;
        newSchema['properties'][keyIndex] = {
            id: keyIndex,
            ...schema,
        };
    });
    return newSchema;
};

const defaultSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    title: 'root',
    properties: {}
};

const useUnsavedChanges = (data) => {
    const [isDirty, setDirty] = useState(false);
    const isFirstRender = useRef(true);
    const handleSetDirty = () => setDirty(true);
    const handleSetPristine = () => setDirty(false);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        handleSetDirty();
    }, [data]);
    return { isDirty, handleSetDirty, handleSetPristine };
};

const SchemaContext = React.createContext({
    changes: [],
    handlePushToChanges: _id => { },
    handleGetIsInChanges: _id => false,
    handleChangesIdKey: (_old, _new) => { },
});
const SchemaProvider = ({ children }) => {
    const [changes, setChanges] = useState([]);
    const handlePushToChanges = (id) => setChanges(value => [...value, id]);
    const handleChangesIdKey = (oldkey, newKey) => {
        const isExist = changes.includes(oldkey);
        if (!isExist)
            return;
        setChanges(value => {
            const removeExisting = value.filter(item => item !== oldkey);
            return [...removeExisting, newKey];
        });
    };
    const handleGetIsInChanges = (id) => {
        const isInChanges = changes.includes(id);
        if (!isInChanges)
            return false;
        setChanges(value => value.filter(item => item !== id));
        return isInChanges;
    };
    return (React.createElement(SchemaContext.Provider, { value: {
            changes,
            handlePushToChanges,
            handleChangesIdKey,
            handleGetIsInChanges,
        } }, children));
};
const useSchemaContext = () => useContext(SchemaContext);

const ROOT_KEY = '__root__';
const schemaTypes = [
    {
        value: 'string',
        label: 'String',
    },
    {
        value: 'number',
        label: 'Number',
    },
    {
        value: 'boolean',
        label: 'Boolean',
    },
    {
        value: 'object',
        label: 'Object',
    },
    {
        value: 'array',
        label: 'Array',
    },
    {
        value: 'currency',
        label: 'Currency',
    },
    {
        value: 'percent',
        label: 'Percent',
    },
    {
        value: 'date',
        label: 'Date',
    },
];
const formatOptions = [
    {
        value: 'date-time',
        label: 'Date/Time',
    },
    {
        value: 'email',
        label: 'Email',
    },
    {
        value: 'hostname',
        label: 'Hostname',
    },
    {
        value: 'ipv4',
        label: 'IPv4',
    },
    {
        value: 'ipv6',
        label: 'IPv6',
    },
    {
        value: 'uri',
        label: 'URI',
    },
];
const commonValidProperties = [
    'description',
    'type',
    'title',
];
const stringValidSchemaProperties = [
    ...commonValidProperties,
    'enum',
    'format',
    'maxLength',
    'minLength',
    'pattern',
];
const numberValidSchemaProperties = [
    ...commonValidProperties,
    'maximum',
    'minimum',
];
const boolValidSchemaProperties = [
    ...commonValidProperties,
];
const arrayValidSchemaProperties = [
    ...commonValidProperties,
    'maxItems',
    'minItems',
    'uniqueItems',
    'items',
];
const objectValidSchemaProperties = [
    ...commonValidProperties,
    'properties',
];
const currencyValidSchemaProperties = [
    ...commonValidProperties,
];
const percentValidSchemaProperties = [
    ...commonValidProperties,
];
const dateValidSchemaProperties = [
    ...commonValidProperties,
];
const commonSchemaOptions = [
    { value: 'description', label: 'Description', type: 'text' },
];
const stringSchemaOptions = [
    ...commonSchemaOptions,
    { value: 'minLength', label: 'Min Length', type: 'number' },
    { value: 'maxLength', label: 'Max Length', type: 'number' },
    { value: 'enum', label: 'Options', type: 'multi' },
    { value: 'pattern', label: 'Pattern', type: 'text' },
    {
        value: 'format',
        label: 'Format',
        type: 'select',
        optionList: formatOptions,
    },
];
const numberSchemaOptions = [
    ...commonSchemaOptions,
    { value: 'minimum', label: 'Min Number', type: 'number' },
    { value: 'maximum', label: 'Max Number', type: 'number' },
];
const boolSchemaOptions = [
    ...commonSchemaOptions,
];
const objectSchemaOptions = [
    ...commonSchemaOptions,
];
const arraySchemaOptions = [
    ...commonSchemaOptions,
    { value: 'minItems', label: 'Min Items', type: 'number' },
    { value: 'maxItems', label: 'Max Items', type: 'number' },
    { value: 'uniqueItems', label: 'Unique Items', type: 'boolean' },
];
const currencySchemaOptions = [
    ...commonSchemaOptions,
];
const percentSchemaOptions = [
    ...commonSchemaOptions,
];
const dateSchemaOptions = [
    ...commonSchemaOptions,
];
const typeToOptions = {
    string: stringSchemaOptions,
    number: numberSchemaOptions,
    boolean: boolSchemaOptions,
    array: arraySchemaOptions,
    object: objectSchemaOptions,
    percent: percentSchemaOptions,
    currency: currencySchemaOptions,
    date: dateSchemaOptions,
};
const typeToValidFields = {
    string: stringValidSchemaProperties,
    number: numberValidSchemaProperties,
    boolean: boolValidSchemaProperties,
    object: objectValidSchemaProperties,
    array: arrayValidSchemaProperties,
    percent: percentValidSchemaProperties,
    currency: currencyValidSchemaProperties,
    date: dateValidSchemaProperties,
};

const getAllKeys = (obj, startKeys = []) => {
    const result = startKeys;
    Object.keys(obj).forEach(key => {
        // @ts-ignore
        const val = obj[key];
        result.push(key);
        if (typeof val === 'object') {
            getAllKeys(val, result);
        }
    });
    return result;
};
const unique = (prefix, obj = {}) => {
    const usedIDs = getAllKeys(obj)
        .map(key => {
        return parseInt(key.split(prefix)[1]);
    })
        .filter(val => {
        return Boolean(val);
    });
    return usedIDs.length ? Math.max(...usedIDs) + 1 : 0;
};
const idCounter = {};
const uniqueId = (prefix, obj = {}) => {
    if (!idCounter[prefix]) {
        idCounter[prefix] = unique(prefix, obj);
    }
    const id = ++idCounter[prefix];
    return prefix + id;
};

const getSchemaField = get;
const getSchemaFields = pick;
const getSchemaType = getSchemaField('type');
const getSchemaTitle = getSchemaField('title');
const getSchemaProperties = getSchemaField('properties');
const getSchemaItems = getSchemaField('items');
const setSchemaField = set;
const setSchemaType = setSchemaField('type');
setSchemaField('title');
setSchemaField('id');
const setSchemaProperties = setSchemaField('properties');
const setSchemaProperty = (key) => setSchemaField(['properties', key]);
const setSchemaItems = setSchemaField('items');
const deleteSchemaField = unset;
const deleteSchemaProperty = (key) => deleteSchemaField(['properties', key]);
const addSchemaProperty = (schema) => setSchemaProperty(uniqueId('field_', schema))({}, schema);
const renameSchemaField = (oldKey, newKey) => flow([
    entries,
    map(([k, v]) => ({
        [k === oldKey ? newKey : k]: {
            ...v,
            id: k === oldKey ? newKey : v.id,
        },
    })),
    reduce(assign, {}),
]);
const renameSchemaProperty = (oldKey, newKey, schema) => flow([
    getSchemaProperties,
    renameSchemaField(oldKey, newKey),
    p => setSchemaProperties(p, schema),
])(schema);
const isSchemaObject = (schema) => getSchemaType(schema) === 'object';
const findOption = (value) => find(['value', value]);
const getValidFields = (type) => get(type, typeToValidFields);
const removeWrongFields = (schema) => {
    const type = getSchemaType(schema);
    const fields = getValidFields(type);
    return getSchemaFields(fields, schema);
};
const getSchemaMenuOptions = (type) => get(type, typeToOptions);
const setSchemaTypeAndRemoveWrongFields = flow([
    setSchemaType,
    removeWrongFields,
]);
map(s => ({ label: s, value: s }));

const useDecodeSchema = (schema) => {
    const schemaType = useMemo(() => getSchemaType(schema), [schema]);
    const schemaTitle = useMemo(() => getSchemaTitle(schema), [schema]);
    const schemaProperties = useMemo(() => getSchemaProperties(schema), [schema]);
    return {
        schemaType,
        schemaTitle,
        schemaProperties,
    };
};

const useControls = ({ schema, schemaKey = '', onChange, onChangeKey, rootNode, }) => {
    const { handlePushToChanges, handleChangesIdKey, handleGetIsInChanges } = useSchemaContext();
    const autoExpand = handleGetIsInChanges(schemaKey);
    const [show, setShow] = useState(rootNode || autoExpand);
    const [showModal, setShowModal] = useState(false);
    const { schemaType } = useDecodeSchema(schema);
    const handleShow = () => setShow(state => !state);
    const getTypeOptions = findOption(getSchemaType(schema))(schemaTypes);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const onChangeFieldName = (event) => {
        handleChangesIdKey(schemaKey, event.target.value);
        onChangeKey(event.target.value);
    };
    const onChangeFieldType = (option) => {
        const collectionTypes = ['object', 'array'];
        collectionTypes.includes(option) && handlePushToChanges(schemaKey);
        onChange(setSchemaTypeAndRemoveWrongFields(option, schema));
    };
    return {
        schemaType,
        getTypeOptions,
        show,
        showModal,
        openModal,
        closeModal,
        handleShow,
        onChangeFieldName,
        onChangeFieldType,
    };
};

const SchemaOptions = ({ showModal, onClose, schema, schemaKey, onChange, }) => {
    const type = getSchemaType(schema);
    const allOptions = useMemo(() => getSchemaMenuOptions(type), [type]);
    const getDefaultValue = (props) => getSchemaField(props.option.value, props.schema);
    const onChangeText = (props) => (event) => props.onChange(setSchemaField(props.option.value, event.target.value, props.schema));
    const onChangeNumber = (props) => (event) => props.onChange(setSchemaField(props.option.value, event.target.value, props.schema));
    const onChangeBoolean = (props) => (checked) => props.onChange(setSchemaField(props.option.value, checked, props.schema));
    const onChangeSelect = (props) => (value) => props.onChange(setSchemaField(props.option.value, value, props.schema));
    const typeToField = {
        text: props => (React.createElement(Input, { defaultValue: getDefaultValue(props), onBlur: onChangeText(props) })),
        number: props => (React.createElement(InputNumber, { defaultValue: getDefaultValue(props), onBlur: onChangeNumber(props) })),
        boolean: props => (React.createElement(Switch, { defaultChecked: getDefaultValue(props), onClick: onChangeBoolean(props) })),
        multi: props => {
            return (React.createElement(Select, { mode: "tags", allowClear: true, placeholder: "Please select options", tokenSeparators: [','], defaultValue: getDefaultValue(props), onChange: onChangeSelect(props) }));
        },
        select: props => (React.createElement(Select, { defaultValue: getDefaultValue(props), placeholder: "Please select option", options: props.option.optionList, onChange: onChangeSelect(props) })),
    };
    return (React.createElement(Modal, { title: "Additional Settings", visible: showModal, onOk: onClose, onCancel: onClose },
        React.createElement(Form, { name: "initialSettings", labelCol: { span: 6 }, wrapperCol: { span: 18 } }, allOptions &&
            allOptions.map((option, index) => {
                return (React.createElement(Form.Item, { key: `${schemaKey}${option.value}${index}`, label: option.label }, [typeToField[option.type]({ option, schema, onChange })]));
            }))));
};

const CommonSubArray = ({ schema, onChange }) => {
    return (React.createElement(SchemaCreator, { schema: schema, schemaKey: "items", disabledInput: true, onChange: onChange }));
};

const CommonSubObject = ({ schema, onDelete, onChangeKey, onChange, }) => {
    const { schemaProperties } = useDecodeSchema(schema);
    const schemaEntries = entries$1(schemaProperties);
    return (React.createElement(React.Fragment, null, schemaEntries.map(([key, properties]) => {
        return (React.createElement(SchemaCreator, { key: key, schema: properties, schemaKey: key, onDelete: onDelete, onChangeKey: newKey => onChangeKey(key, newKey), onChange: newSchema => onChange(key, newSchema) }));
    })));
};

const CommonControls = ({ schema, schemaKey, rootNode, controlType, disabledInput, onAdd, onDelete, onChange, onChangeKey, }) => {
    const { getTypeOptions, show, showModal, schemaType, openModal, closeModal, handleShow, onChangeFieldName, onChangeFieldType, } = useControls({ schema, schemaKey, rootNode, onChange, onChangeKey });
    const isCollection = controlType !== 'primitive';
    const isObject = controlType === 'object';
    const isArray = controlType === 'array';
    return (React.createElement("div", { "data-schema-type": schemaType, "data-schema-title": schemaKey, "data-schema-id": schemaKey, className: rootNode ? 'rsc-controls-root' : 'rsc-controls-child', ...(rootNode && {
            'data-root-node': rootNode,
        }) },
        !rootNode && (React.createElement(React.Fragment, null,
            React.createElement(Input.Group, null,
                React.createElement(Row, { align: "middle" },
                    React.createElement(Col, { xs: 10, xl: 11 },
                        React.createElement(Row, { justify: "space-around", align: "middle" },
                            React.createElement(Col, { span: 2 }, isCollection && (React.createElement(Button, { type: "text", onClick: handleShow, style: { width: '100%' }, icon: show ? React.createElement(CaretDownFilled, null) : React.createElement(CaretRightFilled, null) }))),
                            React.createElement(Col, { span: 22 }, isFunction(onChangeKey) && (React.createElement(Input, { style: { borderRadius: '0px', borderRight: '0px' }, defaultValue: schemaKey, disabled: rootNode || disabledInput, onBlur: onChangeFieldName }))))),
                    React.createElement(Col, { xs: 10, xl: 11 },
                        React.createElement(Select, { style: { width: '100%', borderRadius: '0px' }, className: "rsc-controls-control-select-box", value: getTypeOptions, options: schemaTypes, disabled: rootNode, onChange: onChangeFieldType, filterOption: false })),
                    React.createElement(Col, { xs: 2, xl: 1 },
                        React.createElement(Button, { type: "text", style: { width: '100%' }, onClick: openModal, icon: React.createElement(SettingOutlined, { style: { color: '#3182ce' } }), disabled: !getTypeOptions })),
                    React.createElement(Col, { xs: 2, xl: 1 },
                        React.createElement(Button, { type: "text", style: { width: '100%' }, onClick: onDelete, icon: React.createElement(DeleteOutlined, { style: { color: '#e53e3e' } }), disabled: rootNode })))),
            React.createElement(SchemaOptions, { showModal: showModal, onClose: closeModal, schema: schema, schemaKey: schemaKey, onChange: onChange }))),
        isCollection && show && (React.createElement("div", { className: "rsc-controls-control-box" },
            isObject && (React.createElement(React.Fragment, null,
                React.createElement(CommonSubObject, { schema: schema, onDelete: key => onChange(deleteSchemaProperty(key)(schema)), onChange: (key, newSchema) => onChange(setSchemaProperty(key)(newSchema, schema)), onChangeKey: (oldKey, newKey) => {
                        onChange(renameSchemaProperty(oldKey, newKey, schema));
                    } }),
                React.createElement("div", { className: "rsc-controls-add-button" },
                    React.createElement(Row, null,
                        React.createElement(Col, { xs: 20, xl: 22 },
                            React.createElement(Row, null,
                                React.createElement(Col, { span: 1 }),
                                React.createElement(Col, { span: 23 },
                                    React.createElement(Button, { type: "dashed", disabled: !isFunction(onAdd), onClick: onAdd, style: {
                                            width: '100%',
                                            backgroundColor: 'transparent',
                                            borderColor: 'black',
                                            borderRadius: '3px',
                                        }, icon: React.createElement(PlusSquareFilled, { style: { color: 'black' } }) })))))))),
            isArray && (React.createElement(CommonSubArray, { schema: getSchemaItems(schema), onChange: oldSchema => onChange(setSchemaItems(oldSchema, schema)) }))))));
};

const ArrayControls = ({ ...props }) => {
    return React.createElement(CommonControls, { ...props });
};

const ObjectControls = ({ ...props }) => {
    return React.createElement(CommonControls, { ...props });
};

const PrimitiveControls = ({ ...props }) => {
    return React.createElement(CommonControls, { ...props });
};

const typeToControl = {
    object: props => React.createElement(ObjectControls, { controlType: "object", ...props }),
    array: props => React.createElement(ArrayControls, { controlType: "array", ...props }),
    string: props => React.createElement(PrimitiveControls, { controlType: "primitive", ...props }),
    number: props => React.createElement(PrimitiveControls, { controlType: "primitive", ...props }),
    boolean: props => React.createElement(PrimitiveControls, { controlType: "primitive", ...props }),
    percent: props => React.createElement(PrimitiveControls, { controlType: "primitive", ...props }),
    currency: props => React.createElement(PrimitiveControls, { controlType: "primitive", ...props }),
    date: props => React.createElement(PrimitiveControls, { controlType: "primitive", ...props }),
    default: props => React.createElement(PrimitiveControls, { controlType: "primitive", ...props }),
};
const SchemaCreator = ({ schema, schemaKey = ROOT_KEY, disabledInput, onChange = noop, onDelete = noop, onChangeKey = noop, }) => {
    const { schemaType } = useDecodeSchema(schema);
    const onAdd = isSchemaObject(schema)
        ? () => onChange(addSchemaProperty(schema))
        : undefined;
    return typeToControl[schemaType || 'default']({
        schema,
        schemaKey,
        rootNode: schemaKey === ROOT_KEY,
        disabledInput,
        onDelete: () => onDelete(schemaKey),
        onAdd,
        onChangeKey,
        onChange,
    });
};

const SchemaBuilder = ({ data, onChange }) => {
    const css = `
  .rsc-controls-root {}

  .rsc-controls-root > div.rsc-controls-control-box {
    padding: 16px;
    margin: 0;
    border: none;
    background-color: none;
  }

  .rsc-controls-control-box {
    margin: 6px 0;
    border: solid 1px rgba(0, 0, 0, 0.07);
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    padding: 16px 0 16px 16px;
  }

  .rsc-controls-child {
    margin: 6px 0;
  }
  
  .rsc-controls-control-select-box .ant-select-selector {
    border-radius: 0!important;
  }
`;
    return (React.createElement(SchemaProvider, null,
        React.createElement("style", null, css),
        React.createElement(SchemaCreator, { schema: data, onChange: onChange })));
};

export { SchemaBuilder as JSONSchemaBuilder, addIdsToSchema, defaultSchema, useUnsavedChanges };
//# sourceMappingURL=index.js.map
