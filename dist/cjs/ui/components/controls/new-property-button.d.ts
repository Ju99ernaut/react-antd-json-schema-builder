import React from 'react';
import type { BaseButtonProps } from 'antd/lib/button/button.d.ts';
interface Props extends BaseButtonProps {
    label?: string;
    onAdd: () => void;
}
declare const NewPropertyButton: (props: Props) => React.JSX.Element;
export default NewPropertyButton;
