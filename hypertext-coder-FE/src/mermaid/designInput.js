export const input = {
    design: [
        {
            name: 'view_configuration',
            properties: ['+object CustomerInfo', '+object AddressInfo', '+object OrderInfo', '+object Subscriptions'],
            methods: ['+onSubmit()']
        },
        {
            name: 'CustomerDetails',
            properties: ['+object CustomerInfo', '+boolean showCustomerInfo'],
            methods: ['+onBlur()', '+onClick()'],
            parent: "view_configuration",
            props: "CustomerInfo"
        },
        {
            name: 'CustomerPersonalDetails',
            properties: ['+string CustomerPhoneNumber', '+string CustomerEmailId'],
            methods: ['-onBlur()', '-onClick()'],
            parent: "CustomerDetails"
        },
        {
            name: 'CustomerContactDetails',
            properties: ['+string Gender', '+string DOB', '+boolean showAddressDetails', '+number custContact'],
            methods: ['+onBlur()', '+onSubmit()'],
            parent: "CustomerDetails"
        },
        {
            name: 'AddressDetails',
            properties: ['+object AddressInfo', '+boolean showAddressDetails'],
            methods: ['+onBlur()', '+onSubmit()'],
            parent: "view_configuration",
            props: "AddressInfo"
        },
        {
            name: 'OrderDetails',
            properties: ['+object OrderInfo', '++boolean showOrderInfo'],
            methods: ['+onBlur()', '+onSubmit()'],
            parent: "view_configuration",
            props: "OrderInfo"
        },
        {
            name: 'SubscriptionsDetails',
            properties: ['+object Subscriptions', '+boolean showSubscriptions'],
            methods: ['+onBlur()', '+onSubmit()'],
            parent: "view_configuration",
            props: "Subscriptions"
        },
    ],
    code: {
        "xtype": "h1",
        "value": "Student Details",
        "childrens": [
            {
                "xtype": "text",
                "displayField": "Name",
                "valueField": "name"
            },
            {
                "xtype": "text",
                "displayField": "Class",
                "valueField": "class"
            },
            {
                "xtype": "text",
                "displayField": "School Name",
                "valueField": "schoolName"
            },
            {
                "xtype": "text",
                "displayField": "Address",
                "valueField": "address"
            },
            {
                "xtype": "button",
                "displayField": "Submit",
            }
        ]
    }
};
