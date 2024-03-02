import React from 'react';
import { JSONSchemaEditor } from './types';
import './style.css';
declare const SchemaBuilder: ({ data, onChange, undoRedo, dispatch, updateSchema, }: JSONSchemaEditor) => React.JSX.Element;
export default SchemaBuilder;
