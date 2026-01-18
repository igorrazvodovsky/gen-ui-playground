"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { type ComponentRenderProps } from "@json-render/react";
import { useData } from "@json-render/react";
import { getByPath } from "@json-render/core";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type ChartDatum = { label: string; value: number };

type RawChartDatum = {
  label?: unknown;
  name?: unknown;
  value?: unknown;
};

function normalizeChartData(raw: RawChartDatum[]) {
  return raw.map((point, index) => {
    const label =
      typeof point.label === "string"
        ? point.label
        : typeof point.name === "string"
          ? point.name
          : `Item ${index + 1}`;
    const numericValue =
      typeof point.value === "number" ? point.value : Number(point.value ?? 0);
    return {
      label,
      value: Number.isFinite(numericValue) ? numericValue : 0,
    };
  });
}

function formatValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value.toLocaleString();
  }
  return String(value ?? "-");
}

function ChartTooltipContent({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0];
  const resolvedLabel = item?.name ?? label;

  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 text-xs shadow-md">
      <div className="text-muted-foreground">{resolvedLabel}</div>
      <div className="mt-1 font-medium text-foreground">
        {formatValue(item?.value)}
      </div>
    </div>
  );
}

export function Chart({ element }: ComponentRenderProps) {
  const { title, dataPath, type, height } = element.props as {
    title?: string | null;
    dataPath: string;
    type?: string | null;
    height?: number | null;
  };
  const { data } = useData();
  const rawData = getByPath(data, dataPath) as RawChartDatum[] | undefined;

  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    return <div style={{ padding: 20, color: "var(--muted)" }}>No data</div>;
  }

  const chartData = normalizeChartData(rawData);
  const chartType = type || "bar";
  const chartHeight = Math.max(180, height || 240);
  const axisTick = { fill: "var(--muted)", fontSize: 12 };
  const gridColor = "var(--border)";

  let chartBody: ReactNode = null;

  if (chartType === "bar") {
    chartBody = (
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ left: 0, right: 0 }}>
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              minTickGap={12}
            />
            <YAxis hide />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="value"
              fill="var(--chart-1)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (chartType === "line") {
    chartBody = (
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 0, right: 0 }}>
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              minTickGap={12}
            />
            <YAxis hide />
            <Tooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (chartType === "area") {
    chartBody = (
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              minTickGap={12}
            />
            <YAxis hide />
            <Tooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (chartType === "pie") {
    const outerRadius = Math.max(80, Math.floor(chartHeight * 0.35));
    const innerRadius = Math.floor(outerRadius * 0.55);

    chartBody = (
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`${entry.label}-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>
          {title}
        </h4>
      )}
      {chartBody}
    </div>
  );
}
