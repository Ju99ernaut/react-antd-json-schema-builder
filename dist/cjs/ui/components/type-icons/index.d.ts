import React, { HTMLAttributes } from 'react';
interface ITypeIcon extends HTMLAttributes<HTMLSpanElement> {
    types: string;
}
declare const Icon: React.FC<ITypeIcon>;
export default Icon;
