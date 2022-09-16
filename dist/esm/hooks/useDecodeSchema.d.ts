import { Schema, SchemaType } from '../types';
interface UseDecodeSchemaReturn {
    schemaTitle: string;
    schemaType: SchemaType;
    schemaProperties: Object;
}
declare const useDecodeSchema: (schema: Schema) => UseDecodeSchemaReturn;
export default useDecodeSchema;
