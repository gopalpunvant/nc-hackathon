export const input = {
  design: [
    {
      name: "CustomerDetails",
      properties: [],
      methods: ["+onSubmit"],
    },
    {
      name: "CustomerName",
      properties: [],
      methods: [],
      parent: "CustomerDetails",
    },
    {
      name: "CompanyName",
      properties: [],
      methods: [],
      parent: "CustomerDetails",
    },
    {
      name: "Address",
      properties: [],
      methods: [],
      parent: "CustomerDetails",
    },
    {
      name: "ContactDetails",
      properties: [],
      methods: [],
      parent: "CustomerDetails",
    },
  ],
  code: {
    xtype: "h1",
    value: "Customer Details",
    childrens: [
      {
        xtype: "text",
        displayField: "Customer Name",
        valueField: "customerName",
      },
      {
        xtype: "text",
        displayField: "Company Name",
        valueField: "company",
      },
      {
        xtype: "text",
        displayField: "Address",
        valueField: "address",
      },
      {
        xtype: "number",
        displayField: "Contact Details",
        valueField: "contactDetails",
      },
      {
        xtype: "button",
        displayField: "Submit",
      },
    ],
  },
};
