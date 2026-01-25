export const OBJECT_DEFINITION_DATA = {
  accounts: {
    type: "accounts",
    label: "Account",
    pluralLabel: "Accounts",
    dataPath: "/accounts/list",
    idKey: "id",
    titleKey: "name",
    listRoute: "/views/accounts",
    meta: [{ key: "owner", label: "Owner" }],
    badges: [
      { key: "status", label: "Status", format: "badge" },
      { key: "health", label: "Health", format: "badge" },
    ],
    summary: [
      { key: "segment", label: "Segment" },
      { key: "arr", label: "ARR", format: "currency" },
      { key: "renewalDate", label: "Renewal", format: "date" },
    ],
    details: [
      { key: "id", label: "Account ID" },
      { key: "primaryFacilityId", label: "Primary Facility", linkType: "facilities" },
      { key: "circularityProgram", label: "Circularity Program" },
      { key: "epcisMaturity", label: "EPCIS Coverage" },
    ],
    panels: [
      {
        title: "Manufacturing Profile",
        fields: [
          { key: "primaryPlant", label: "Primary Plant" },
          { key: "productFocus", label: "Product Focus" },
          { key: "certifications", label: "Certifications" },
          { key: "leadTime", label: "Lead Time" },
        ],
      },
      {
        title: "Supply & Logistics",
        fields: [
          { key: "incoterms", label: "Incoterms" },
          { key: "shippingMode", label: "Shipping Mode" },
          { key: "preferredCarrier", label: "Preferred Carrier" },
          { key: "warehouseRegion", label: "Warehouse Region" },
        ],
      },
      {
        title: "Commercial Terms",
        fields: [
          { key: "paymentTerms", label: "Payment Terms" },
          { key: "minOrderValue", label: "Min Order Value", format: "currency" },
          { key: "contractTerm", label: "Contract Term" },
          { key: "forecastCadence", label: "Forecast Cadence" },
        ],
      },
      {
        title: "Circularity & Traceability",
        fields: [
          { key: "materialStreamIds", label: "Material Streams", linkType: "materials" },
          { key: "takebackRate", label: "Takeback Rate" },
          { key: "recycledContentTarget", label: "Recycled Content Target" },
          { key: "activeShipmentIds", label: "Active Shipments", linkType: "shipments" },
          { key: "keyAssetIds", label: "Key Assets", linkType: "assets" },
          { key: "openTaskIds", label: "Open Tasks", linkType: "tasks" },
        ],
      },
    ],
  },
  tasks: {
    type: "tasks",
    label: "Task",
    pluralLabel: "Tasks",
    dataPath: "/tasks/items",
    idKey: "id",
    titleKey: "title",
    listRoute: "/views/tasks",
    meta: [{ key: "id", label: "Task ID" }],
    badges: [
      { key: "status", label: "Status", format: "badge" },
      { key: "priority", label: "Priority", format: "badge" },
    ],
    summary: [
      { key: "label", label: "Label", format: "badge" },
      { key: "status", label: "Status", format: "badge" },
      { key: "priority", label: "Priority", format: "badge" },
    ],
    details: [
      { key: "id", label: "Task ID" },
      { key: "assignee", label: "Assignee" },
      { key: "dueDate", label: "Due Date", format: "date" },
    ],
    panels: [
      {
        title: "Context",
        fields: [
          { key: "accountId", label: "Account", linkType: "accounts" },
          { key: "facilityId", label: "Facility", linkType: "facilities" },
          { key: "shipmentId", label: "Shipment", linkType: "shipments" },
          { key: "batchId", label: "Batch", linkType: "batches" },
          { key: "materialId", label: "Material", linkType: "materials" },
          { key: "assetId", label: "Asset", linkType: "assets" },
        ],
      },
      {
        title: "EPCIS",
        fields: [
          { key: "eventId", label: "Event", linkType: "epcis-events" },
          { key: "bizStep", label: "Business Step", format: "badge" },
          { key: "disposition", label: "Disposition", format: "badge" },
        ],
      },
    ],
  },
  facilities: {
    type: "facilities",
    label: "Facility",
    pluralLabel: "Facilities",
    dataPath: "/facilities/list",
    idKey: "id",
    titleKey: "name",
    listRoute: "/views/facilities",
    summary: [
      { key: "type", label: "Type", format: "badge" },
      { key: "status", label: "Status", format: "badge" },
      { key: "location", label: "Location" },
    ],
    details: [
      { key: "id", label: "Facility ID" },
      { key: "gln", label: "GLN" },
      { key: "operatorAccountId", label: "Operator", linkType: "accounts" },
    ],
    panels: [
      {
        title: "Operations",
        fields: [
          { key: "processes", label: "Processes" },
          { key: "certifications", label: "Certifications" },
          { key: "capacity", label: "Capacity" },
          { key: "shiftPattern", label: "Shift Pattern" },
        ],
      },
      {
        title: "Sustainability",
        fields: [
          { key: "energyMix", label: "Energy Mix" },
          { key: "wasteDiversionRate", label: "Waste Diversion" },
          { key: "waterReuseRate", label: "Water Reuse" },
          { key: "lastAuditDate", label: "Last Audit", format: "date" },
        ],
      },
    ],
  },
  materials: {
    type: "materials",
    label: "Material",
    pluralLabel: "Materials",
    dataPath: "/materials/list",
    idKey: "id",
    titleKey: "name",
    listRoute: "/views/materials",
    summary: [
      { key: "category", label: "Category", format: "badge" },
      { key: "recycledContent", label: "Recycled Content" },
      { key: "defaultDisposition", label: "Disposition", format: "badge" },
    ],
    details: [
      { key: "id", label: "Material ID" },
      { key: "grade", label: "Grade" },
      { key: "form", label: "Form" },
      { key: "sourceType", label: "Source Type" },
      { key: "certification", label: "Certification" },
    ],
    panels: [
      {
        title: "Supply",
        fields: [
          { key: "supplierAccountId", label: "Supplier", linkType: "accounts" },
          {
            key: "preferredFacilityId",
            label: "Preferred Facility",
            linkType: "facilities",
          },
          { key: "leadTime", label: "Lead Time" },
          { key: "minOrderQty", label: "Min Order Qty" },
        ],
      },
      {
        title: "Traceability",
        fields: [
          { key: "materialPassportId", label: "Material Passport" },
          { key: "epcClass", label: "EPC Class" },
          { key: "endOfLifeRoute", label: "End of Life Route" },
        ],
      },
    ],
  },
  batches: {
    type: "batches",
    label: "Batch",
    pluralLabel: "Batches",
    dataPath: "/batches/list",
    idKey: "id",
    titleKey: "id",
    listRoute: "/views/batches",
    summary: [
      { key: "materialId", label: "Material", linkType: "materials" },
      { key: "quantity", label: "Quantity" },
      { key: "disposition", label: "Disposition", format: "badge" },
    ],
    details: [
      { key: "id", label: "Batch ID" },
      { key: "productionDate", label: "Production Date", format: "date" },
      { key: "facilityId", label: "Facility", linkType: "facilities" },
      { key: "ownerAccountId", label: "Owner", linkType: "accounts" },
    ],
    panels: [
      {
        title: "Traceability",
        fields: [
          { key: "bizStep", label: "Business Step", format: "badge" },
          { key: "transformationId", label: "Transformation ID" },
          { key: "inputBatchIds", label: "Input Batches", linkType: "batches" },
          { key: "outputBatchIds", label: "Output Batches", linkType: "batches" },
          { key: "eventIds", label: "Event IDs", linkType: "epcis-events" },
        ],
      },
      {
        title: "Logistics",
        fields: [
          { key: "shipmentIds", label: "Shipments", linkType: "shipments" },
          { key: "storageLocation", label: "Storage Location" },
        ],
      },
    ],
  },
  shipments: {
    type: "shipments",
    label: "Shipment",
    pluralLabel: "Shipments",
    dataPath: "/shipments/list",
    idKey: "id",
    titleKey: "id",
    listRoute: "/views/shipments",
    summary: [
      { key: "status", label: "Status", format: "badge" },
      { key: "eta", label: "ETA", format: "date" },
      { key: "destinationFacilityId", label: "Destination", linkType: "facilities" },
    ],
    details: [
      { key: "id", label: "Shipment ID" },
      { key: "accountId", label: "Account", linkType: "accounts" },
      { key: "originFacilityId", label: "Origin", linkType: "facilities" },
      { key: "destinationFacilityId", label: "Destination", linkType: "facilities" },
      { key: "carrier", label: "Carrier" },
    ],
    panels: [
      {
        title: "Transport",
        fields: [
          { key: "mode", label: "Mode" },
          { key: "incoterms", label: "Incoterms" },
          { key: "loadType", label: "Load Type" },
          { key: "trackingRef", label: "Tracking Ref" },
          { key: "bizStep", label: "Business Step", format: "badge" },
          { key: "disposition", label: "Disposition", format: "badge" },
          { key: "departureDate", label: "Departure", format: "date" },
        ],
      },
      {
        title: "Contents",
        fields: [
          { key: "batchIds", label: "Batches", linkType: "batches" },
          { key: "assetIds", label: "Assets", linkType: "assets" },
          { key: "eventIds", label: "Event IDs", linkType: "epcis-events" },
        ],
      },
    ],
  },
  assets: {
    type: "assets",
    label: "Asset",
    pluralLabel: "Assets",
    dataPath: "/assets/list",
    idKey: "id",
    titleKey: "id",
    listRoute: "/views/assets",
    summary: [
      { key: "type", label: "Type", format: "badge" },
      { key: "condition", label: "Condition", format: "badge" },
      { key: "currentFacilityId", label: "Current Facility", linkType: "facilities" },
    ],
    details: [
      { key: "id", label: "Asset ID" },
      { key: "ownerAccountId", label: "Owner", linkType: "accounts" },
      { key: "serialNumber", label: "Serial Number" },
      { key: "rfidEpc", label: "RFID EPC" },
    ],
    panels: [
      {
        title: "Lifecycle",
        fields: [
          { key: "disposition", label: "Disposition", format: "badge" },
          { key: "cycles", label: "Cycles" },
          { key: "lastServiceDate", label: "Last Service", format: "date" },
          { key: "nextServiceDue", label: "Next Service", format: "date" },
          { key: "lastEventId", label: "Last Event", linkType: "epcis-events" },
        ],
      },
      {
        title: "Logistics",
        fields: [
          { key: "linkedShipmentId", label: "Linked Shipment", linkType: "shipments" },
          { key: "homeFacilityId", label: "Home Facility", linkType: "facilities" },
          { key: "material", label: "Material" },
        ],
      },
    ],
  },
  "epcis-events": {
    type: "epcis-events",
    label: "EPCIS Event",
    pluralLabel: "EPCIS Events",
    dataPath: "/epcis/events",
    idKey: "id",
    titleKey: "id",
    listRoute: "/views/epcis-events",
    summary: [
      { key: "eventType", label: "Event Type", format: "badge" },
      { key: "bizStep", label: "Business Step", format: "badge" },
      { key: "disposition", label: "Disposition", format: "badge" },
    ],
    details: [
      { key: "id", label: "Event ID" },
      { key: "eventTime", label: "Event Time", format: "date" },
      { key: "action", label: "Action", format: "badge" },
      { key: "readPointId", label: "Read Point", linkType: "facilities" },
      { key: "bizTransaction", label: "Transaction" },
    ],
    panels: [
      {
        title: "Links",
        fields: [
          { key: "shipmentId", label: "Shipment", linkType: "shipments" },
          { key: "batchIds", label: "Batches", linkType: "batches" },
          { key: "assetIds", label: "Assets", linkType: "assets" },
          { key: "transformationId", label: "Transformation ID" },
          { key: "inputBatchIds", label: "Input Batches", linkType: "batches" },
          { key: "outputBatchIds", label: "Output Batches", linkType: "batches" },
        ],
      },
      {
        title: "EPCIS Data",
        fields: [
          { key: "epcList", label: "EPC List" },
          { key: "quantityList", label: "Quantity List" },
        ],
      },
    ],
  },
};
