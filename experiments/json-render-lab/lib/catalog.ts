import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

const toneSchema = z.enum(["neutral", "accent", "warning"]);
const calloutToneSchema = z.enum(["info", "warning", "success"]);

export const catalog = defineCatalog(schema, {
  components: {
    Stack: {
      props: z.object({
        gap: z.enum(["sm", "md", "lg"]).default("md"),
      }),
      slots: ["default"],
      description: "Vertical layout container with configurable spacing.",
    },
    Grid: {
      props: z.object({
        columns: z.enum(["2", "3"]).default("2"),
      }),
      slots: ["default"],
      description: "Responsive grid container for grouping cards.",
    },
    Card: {
      props: z.object({
        label: z.string(),
        title: z.string(),
        tone: toneSchema.default("neutral"),
      }),
      slots: ["default"],
      description: "Framed content card with label and title.",
    },
    TitleBlock: {
      props: z.object({
        eyebrow: z.string(),
        title: z.string(),
        summary: z.string(),
        status: z.string(),
      }),
      description: "Prominent task header with summary and status pill.",
    },
    Metric: {
      props: z.object({
        label: z.string(),
        value: z.string(),
        hint: z.string(),
      }),
      description: "Single metric with a label, value, and supporting hint.",
    },
    FieldList: {
      props: z.object({
        items: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        ),
      }),
      description: "List of labeled values.",
    },
    Callout: {
      props: z.object({
        title: z.string(),
        body: z.string(),
        tone: calloutToneSchema.default("info"),
      }),
      description: "Emphasized note for a risk, status, or decision.",
    },
    BulletList: {
      props: z.object({
        items: z.array(z.string()),
        note: z.string(),
      }),
      description: "Ordered next steps with a short explanatory note.",
    },
  },
  actions: {},
});

