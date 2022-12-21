export declare const DEFAULT_STATE: {
    type: string;
    properties: {
        address: {
            type: string;
            properties: {
                street: {
                    type: string;
                };
                city: {
                    type: string;
                };
                state: {
                    type: string;
                };
            };
        };
        product_name: {
            type: string;
            items: {
                type: string;
            };
        };
        product_object: {
            type: string;
            items: {
                type: string;
                properties: {
                    address: {
                        type: string;
                    };
                };
            };
        };
        product_items: {
            type: string;
            items: {
                type: string;
                items: {
                    type: string;
                };
            };
        };
        product_description: {
            type: string;
        };
        msrp: {
            type: string;
        };
    };
};
export declare const SIMPLE_STATE: {
    type: string;
    properties: {
        address: {
            type: string;
        };
    };
};
export declare const EMPTY_STATE: {
    type: string;
    properties: {};
};
