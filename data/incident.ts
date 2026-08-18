export interface TimelineEvent {
  id: string;
  time: string;
  type: "deploy" | "database" | "alert" | "engineer" | "resolved";
  title: string;
  summary: string;
  details: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  sourceBadge: string;
}

export interface LatencyDataPoint {
  time: string;
  latencyMs: number;
  highlight?: boolean;
  label?: string;
  eventId?: string; // Links data point to a timeline event
}

export interface IncidentData {
  id: string;
  title: string;
  service: string;
  status: "Investigating" | "Identified" | "Monitoring" | "Resolved";
  severity: "P1 - Critical" | "P2 - High" | "P3 - Moderate";
  timestamp: string;
  duration: string;
  impact: string;
  timeline: TimelineEvent[];
  latencyData: LatencyDataPoint[];
}

export const DEMO_INCIDENT: IncidentData = {
  id: "INC-8492",
  title: "API latency increased",
  service: "api-service",
  status: "Investigating",
  severity: "P1 - Critical",
  timestamp: "Aug 18 · 14:32 UTC",
  duration: "8m duration",
  impact: "p95 latency spike affecting checkout & search services",
  latencyData: [
    { time: "14:20", latencyMs: 140 },
    { time: "14:24", latencyMs: 145 },
    { time: "14:28", latencyMs: 180, label: "v2.8.1 Deploy", eventId: "evt-1" },
    { time: "14:30", latencyMs: 650 },
    { time: "14:31", latencyMs: 1420, eventId: "evt-2" },
    { time: "14:32", latencyMs: 2340, highlight: true, label: "p95 > 2s Alert", eventId: "evt-3" },
    { time: "14:33", latencyMs: 2180 },
    { time: "14:34", latencyMs: 1650, label: "Rollback initiated", eventId: "evt-4" },
    { time: "14:35", latencyMs: 420 },
    { time: "14:36", latencyMs: 148, label: "Baseline restored", eventId: "evt-5" },
    { time: "14:38", latencyMs: 142 },
  ],
  timeline: [
    {
      id: "evt-1",
      time: "14:28",
      type: "deploy",
      title: "Deploy",
      summary: "api-service v2.8.1",
      sourceBadge: "CI/CD Pipeline (Demo)",
      details: [
        { label: "Commit", value: "e7f93a1 (\"feat(pool): update connection pool max_size\")" },
        { label: "Author", value: "alex@trace.internal" },
        { label: "Environment", value: "production-us-east-1" },
        { label: "Artifact", value: "registry.internal/api:v2.8.1" },
      ],
    },
    {
      id: "evt-2",
      time: "14:31",
      type: "database",
      title: "Database",
      summary: "Connection pool exhausted",
      sourceBadge: "Database Telemetry (Demo)",
      details: [
        { label: "Active Connections", value: "184 / 200", subtext: "3.2× normal peak load" },
        { label: "Query Wait Queue", value: "1,420 ms avg wait" },
        { label: "Trigger Cause", value: "Unbounded connection acquisition in v2.8.1" },
        { label: "Related Deploy", value: "api-service v2.8.1 (14:28 UTC)" },
      ],
    },
    {
      id: "evt-3",
      time: "14:32",
      type: "alert",
      title: "Alert",
      summary: "p95 latency exceeded 2s",
      sourceBadge: "Monitoring Service (Demo)",
      details: [
        { label: "Metric", value: "http.server.requests.p95 = 2.34s" },
        { label: "Threshold", value: "> 2,000 ms over 1m window" },
        { label: "Affected Endpoints", value: "/v1/checkout, /v1/search/query" },
        { label: "Alert Dispatch", value: "#INC-4919 · P1 on-call notification triggered" },
      ],
    },
    {
      id: "evt-4",
      time: "14:34",
      type: "engineer",
      title: "Engineer",
      summary: "Rolled back v2.8.1",
      sourceBadge: "Incident Workspace (Demo)",
      details: [
        { label: "Operator", value: "sarah (on-call SRE)" },
        { label: "Action", value: "Reverted traffic route to v2.8.0 snapshot" },
        { label: "Pod Status", value: "12/12 pods replaced in 32s" },
        { label: "Notes", value: "Connection pool immediately drained to 42 active" },
      ],
    },
    {
      id: "evt-5",
      time: "14:36",
      type: "resolved",
      title: "Resolved",
      summary: "Latency returned to baseline",
      sourceBadge: "Health Monitor (Demo)",
      details: [
        { label: "Current p95", value: "148 ms (nominal)" },
        { label: "Error Rate", value: "0.01% (within SLA)" },
        { label: "Time to Mitigation", value: "8 minutes total" },
        { label: "Next Action", value: "Post-incident report auto-drafted by Trace" },
      ],
    },
  ],
};

export const NOMINAL_EASTER_EGG_INCIDENT: IncidentData = {
  ...DEMO_INCIDENT,
  title: "✓ ALL SYSTEMS NOMINAL",
  status: "Resolved",
  severity: "P3 - Moderate",
  impact: "No active anomalies detected across 42 monitored microservices",
  duration: "All 5 health checks passing",
};
