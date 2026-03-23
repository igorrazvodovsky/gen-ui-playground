import type { Spec } from "@json-render/core";

type FieldItem = {
  label: string;
  value: string;
};

type ScenarioState = {
  task: {
    eyebrow: string;
    title: string;
    summary: string;
    status: string;
  };
  metrics: {
    primary: {
      label: string;
      value: string;
      hint: string;
    };
    secondary: {
      label: string;
      value: string;
      hint: string;
    };
    tertiary: {
      label: string;
      value: string;
      hint: string;
    };
  };
  workflow: FieldItem[];
  context: FieldItem[];
  risk: {
    enabled: boolean;
    title: string;
    body: string;
    tone: "info" | "warning" | "success";
  };
  nextSteps: {
    items: string[];
    note: string;
  };
};

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  description: string;
  researchQuestion: string;
  state: ScenarioState;
};

export const scenarios: Scenario[] = [
  {
    id: "contract-setup",
    title: "Contract setup and delivery",
    summary: "New site onboarding with delivery scheduling and missing access confirmation.",
    description:
      "Tests whether a single reusable view can summarize onboarding work, operational blockers, and the next validation steps without bespoke UI code.",
    researchQuestion:
      "Can a hand-authored spec make onboarding state legible enough to guide the next binding experiment?",
    state: {
      task: {
        eyebrow: "Connected circular laundry service",
        title: "Contract setup and delivery",
        summary:
          "Student housing site is moving from signed contract to first delivery. The operator needs logistics, access, and installation readiness in one view.",
        status: "delivery slot pending",
      },
      metrics: {
        primary: {
          label: "Sites ready",
          value: "3 / 4",
          hint: "One block still lacks concierge confirmation.",
        },
        secondary: {
          label: "Machines allocated",
          value: "12",
          hint: "Eight washers and four dryers reserved.",
        },
        tertiary: {
          label: "Open blockers",
          value: "2",
          hint: "Access control and telemetry activation.",
        },
      },
      workflow: [
        { label: "Customer", value: "Sodra Studentboende" },
        { label: "Site", value: "Uppsala Block C" },
        { label: "Delivery window", value: "27 Mar 2026, 08:00-10:00" },
        { label: "Install lead", value: "Helena M." },
      ],
      context: [
        { label: "Machine model", value: "Miele PWM 507" },
        { label: "Connectivity", value: "Telemetry kit staged, activation pending" },
        { label: "Access mode", value: "Key locker planned, code not yet confirmed" },
        { label: "Acceptance rule", value: "Site must pass access and power checklist" },
      ],
      risk: {
        enabled: true,
        title: "Main operational risk",
        body: "The concierge contact has not confirmed building access, so the delivery slot could slip and break the install sequence.",
        tone: "warning",
      },
      nextSteps: {
        items: [
          "Confirm building access owner and code handoff.",
          "Freeze delivery crew only after access is cleared.",
          "Run the installation checklist against the final room layout.",
        ],
        note: "The renderer is proving presentation only. Upstream task decomposition and rule generation are still manual.",
      },
    },
  },
  {
    id: "billing-review",
    title: "Monthly billing and cost review",
    summary: "Operator review of usage, exceptions, and customer-facing billing narrative.",
    description:
      "Tests whether the same spec can shift from onboarding logistics to a usage-and-finance slice without collapsing into app-specific layout assumptions.",
    researchQuestion:
      "Does the spec remain coherent when the domain task changes but the underlying task-summary shape stays stable?",
    state: {
      task: {
        eyebrow: "Connected circular laundry service",
        title: "Monthly billing and cost review",
        summary:
          "Operations needs a compact view of billable usage, cost anomalies, and the actions required before the billing run closes.",
        status: "review in progress",
      },
      metrics: {
        primary: {
          label: "Revenue at risk",
          value: "SEK 14.2k",
          hint: "Driven by two disputed shared-area usage clusters.",
        },
        secondary: {
          label: "Invoices drafted",
          value: "46 / 49",
          hint: "Three customer statements need manual review.",
        },
        tertiary: {
          label: "Exception cases",
          value: "5",
          hint: "All five link back to telemetry or access anomalies.",
        },
      },
      workflow: [
        { label: "Billing cycle", value: "March 2026" },
        { label: "Portfolio", value: "Regional student housing" },
        { label: "Review owner", value: "Mikael R." },
        { label: "Decision deadline", value: "26 Mar 2026, 16:00" },
      ],
      context: [
        { label: "Main anomaly", value: "Shared laundry room over-reported weekend usage" },
        { label: "Customer ask", value: "Explain price increase before invoice release" },
        { label: "Evidence source", value: "Meter events + access logs + service notes" },
        { label: "Billing rule", value: "Waive disputed charges unless corroborated by two sources" },
      ],
      risk: {
        enabled: true,
        title: "Main operational risk",
        body: "If the disputed usage clusters are released without review, the operator risks avoidable invoice reversals and trust loss.",
        tone: "warning",
      },
      nextSteps: {
        items: [
          "Reconcile disputed usage with access-control events.",
          "Draft customer-facing explanation for the reviewed invoices.",
          "Mark unresolved anomalies for manual sign-off before export.",
        ],
        note: "A later experiment should test whether these review steps can be generated from domain rules instead of being written directly into state.",
      },
    },
  },
  {
    id: "maintenance-repair",
    title: "Maintenance, repair, and predictive service",
    summary: "Fault triage and service planning driven by machine state and operator rules.",
    description:
      "Tests whether a generic task summary surface can also present predictive-service work without introducing a custom maintenance dashboard.",
    researchQuestion:
      "Can one renderer vocabulary cover multiple task families before a pattern library exists?",
    state: {
      task: {
        eyebrow: "Connected circular laundry service",
        title: "Maintenance, repair, and predictive service",
        summary:
          "Service operations needs a concise view of machine health, open incidents, and the next service coordination decisions for a small hotel site.",
        status: "technician dispatch queued",
      },
      metrics: {
        primary: {
          label: "Machines degraded",
          value: "4",
          hint: "Two require same-day attention, two can wait for route bundling.",
        },
        secondary: {
          label: "Predicted failures",
          value: "1 high risk",
          hint: "Drain pump vibration crossed the alert threshold.",
        },
        tertiary: {
          label: "Service visits ready",
          value: "2",
          hint: "Both can reuse the same technician route window.",
        },
      },
      workflow: [
        { label: "Customer", value: "Hotel Strandkanten" },
        { label: "Site", value: "Laundry basement west wing" },
        { label: "Service owner", value: "Nora E." },
        { label: "Proposed route", value: "28 Mar 2026, 09:30-12:00" },
      ],
      context: [
        { label: "Primary issue", value: "Washer 3 reports rising drain-pump vibration" },
        { label: "Supporting signal", value: "Cycle duration +14% over 10 days" },
        { label: "Customer constraint", value: "Avoid guest-linen peak window after 14:00" },
        { label: "Service rule", value: "Bundle preventive and reactive visits when downtime overlaps" },
      ],
      risk: {
        enabled: true,
        title: "Main operational risk",
        body: "If the drain-pump alert is deferred past the route window, the machine may fail during the site's busiest turnover period.",
        tone: "warning",
      },
      nextSteps: {
        items: [
          "Confirm route window with the hotel operations lead.",
          "Reserve replacement pump and belt kit before dispatch.",
          "Compare the preventive visit against the open repair queue for bundling.",
        ],
        note: "Two-way binding becomes important here because technicians will need to update machine state from the UI instead of from a static fixture.",
      },
    },
  },
];

export const workbenchSpec: Spec = {
  root: "root-stack",
  elements: {
    "root-stack": {
      type: "Stack",
      props: {
        gap: "lg",
      },
      children: ["hero-card", "metrics-grid", "detail-grid", "risk-callout", "actions-card"],
    },
    "hero-card": {
      type: "Card",
      props: {
        label: "Task frame",
        title: "Shared spec / scenario-specific state",
        tone: "accent",
      },
      children: ["title-block"],
    },
    "title-block": {
      type: "TitleBlock",
      props: {
        eyebrow: { $state: "/task/eyebrow" },
        title: { $state: "/task/title" },
        summary: { $state: "/task/summary" },
        status: { $state: "/task/status" },
      },
      children: [],
    },
    "metrics-grid": {
      type: "Grid",
      props: {
        columns: "3",
      },
      children: ["metric-primary", "metric-secondary", "metric-tertiary"],
    },
    "metric-primary": {
      type: "Metric",
      props: {
        label: { $state: "/metrics/primary/label" },
        value: { $state: "/metrics/primary/value" },
        hint: { $state: "/metrics/primary/hint" },
      },
      children: [],
    },
    "metric-secondary": {
      type: "Metric",
      props: {
        label: { $state: "/metrics/secondary/label" },
        value: { $state: "/metrics/secondary/value" },
        hint: { $state: "/metrics/secondary/hint" },
      },
      children: [],
    },
    "metric-tertiary": {
      type: "Metric",
      props: {
        label: { $state: "/metrics/tertiary/label" },
        value: { $state: "/metrics/tertiary/value" },
        hint: { $state: "/metrics/tertiary/hint" },
      },
      children: [],
    },
    "detail-grid": {
      type: "Grid",
      props: {
        columns: "2",
      },
      children: ["workflow-card", "context-card"],
    },
    "workflow-card": {
      type: "Card",
      props: {
        label: "Workflow",
        title: "Execution context",
        tone: "neutral",
      },
      children: ["workflow-fields"],
    },
    "workflow-fields": {
      type: "FieldList",
      props: {
        items: { $state: "/workflow" },
      },
      children: [],
    },
    "context-card": {
      type: "Card",
      props: {
        label: "Domain context",
        title: "Structured facts and constraints",
        tone: "neutral",
      },
      children: ["context-fields"],
    },
    "context-fields": {
      type: "FieldList",
      props: {
        items: { $state: "/context" },
      },
      children: [],
    },
    "risk-callout": {
      type: "Callout",
      props: {
        title: { $state: "/risk/title" },
        body: { $state: "/risk/body" },
        tone: { $state: "/risk/tone" },
      },
      children: [],
      visible: {
        $state: "/risk/enabled",
        eq: true,
      },
    },
    "actions-card": {
      type: "Card",
      props: {
        label: "Next step",
        title: "What this experiment should trigger next",
        tone: "warning",
      },
      children: ["next-steps"],
    },
    "next-steps": {
      type: "BulletList",
      props: {
        items: { $state: "/nextSteps/items" },
        note: { $state: "/nextSteps/note" },
      },
      children: [],
    },
  },
};
