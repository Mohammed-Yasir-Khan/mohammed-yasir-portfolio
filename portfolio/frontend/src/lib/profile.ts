// Single source of truth for personal details. Edit this file to change what the site says about you.
// Source: resume (LaTeX) provided by Yasir. The phone number is intentionally NOT published on the site.

export type RoleKey = "devops" | "sre" | "ai";

export const profile = {
  name: "Mohammed Yasir Khan",
  initials: "MYK",
  tagline: "I keep production boring.",
  status: "Available for work",
  location: "Mumbai, India",
  // Public contact links. The env vars (frontend/.env.local or Vercel settings) override these defaults.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "khanmohammedyasir1@gmail.com",
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/khanyasir1",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/mohammed-yasir-khan/",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Drop your PDF at frontend/public/resume.pdf. The Resume buttons work as soon as the file exists.
  resumeUrl: "/resume.pdf",
  resumeFileName: "Mohammed-Yasir-Khan-Resume.pdf",
  // Shown on About. Plain English, first person.
  summary:
    "Site Reliability Engineer working on an enterprise SaaS platform that runs on Kubernetes and OpenShift across many data centres. I handle P1/P2 incidents, help fix daily CI/CD failures, write RCA and CAPA reports, and automate release work. I built the Jenkins pipelines for weekly patch, minor and major releases on staging and production.",
} as const;

type RoleInfo = {
  label: string;
  subline: string;
  focus: string;
  stack: string;
  /** Three "what I do" blurbs shown under the hero for the selected role. */
  does: { title: string; text: string }[];
};

export const roles: Record<RoleKey, RoleInfo> = {
  devops: {
    label: "DevOps",
    subline:
      "DevOps engineer automating releases, GitOps delivery and cloud infrastructure so deployments are safe and repeatable.",
    focus: "Release automation, CI/CD, infrastructure as code",
    stack: "Jenkins, ArgoCD, Helm, Terraform, GitHub Actions",
    does: [
      {
        title: "Release automation",
        text: "Jenkins pipelines that run weekly patch, minor and major releases on staging and production, with dry-run safety and one notification stream.",
      },
      {
        title: "CI/CD health",
        text: "Reading Jenkins, ArgoCD and Harbor logs to find why a deployment failed, then fixing it with the development team.",
      },
      {
        title: "Infrastructure as code",
        text: "Terraform for AWS VPC, subnets and EKS, plus moving Jenkins pipelines to GitHub Actions to standardise builds.",
      },
    ],
  },
  sre: {
    label: "SRE",
    subline:
      "SRE keeping a multi-region Kubernetes and OpenShift platform reliable: incidents, root causes and fewer repeat alerts.",
    focus: "Incident response, RCA/CAPA, observability",
    stack: "Kubernetes, OpenShift, Datadog, Prometheus, PagerDuty",
    does: [
      {
        title: "Incident response",
        text: "First-line support for P1/P2 incidents across US, EU, APAC and AU regions, working from Datadog, Alertmanager, PagerDuty and Pingdom alerts.",
      },
      {
        title: "RCA and CAPA",
        text: "Written root-cause and corrective-action reports for OOM kills, high load, slow responses and backend outages, followed up with engineering teams.",
      },
      {
        title: "Alert quality",
        text: "Cutting alert noise: a gateway that groups related alerts into one incident, and release automation that snoozes monitoring safely.",
      },
    ],
  },
  ai: {
    label: "AI",
    subline:
      "Building AI agents for operations: they investigate failures and fix the safe ones, with strict guardrails around every action.",
    focus: "Operations agents, auto-healing, guardrails",
    stack: "Python, FastAPI, LLM APIs, PostgreSQL",
    does: [
      {
        title: "Auto-healing",
        text: "A workaround agent that spots transient deployment failures and safely retries them, so engineers are not paged for flaky infrastructure.",
      },
      {
        title: "Root-cause help",
        text: "Agents that read pipeline logs, Jira history and cluster events, then write up evidence-based findings for the on-call engineer.",
      },
      {
        title: "Guardrails",
        text: "The model suggests, deterministic code decides: strict gates, small retry limits, an audit trail and no direct production changes by the AI.",
      },
    ],
  },
};

export const experience: {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  points: string[];
}[] = [
  {
    role: "Site Reliability Engineer Intern",
    company: "Zycus, Inc.",
    location: "Mumbai, India",
    period: "Apr 2026 – Present",
    current: true,
    points: [
      "Give L1 production support for P1/P2 incidents on Kubernetes and OpenShift clusters in US, EU, APAC and AU regions, checking Datadog, Alertmanager, PagerDuty and Pingdom alerts as part of the Emergency Response Team.",
      "Help fix CI/CD deployment failures by checking Jenkins, ArgoCD and Harbor logs and status, finding root causes and coordinating fixes with development teams.",
      "Run and support weekly patch, minor and major releases on staging and production using Jenkins pipelines.",
      "Write RCA and CAPA reports for OOM kills, high load, slow response/SLO breaches and HAProxy backend outages, and follow up on corrective actions with engineering teams.",
      "Built a tool that pulls ArgoCD application health and sync status across environments and generates an Excel report for Degraded, OutOfSync, Missing and SyncFailed applications grouped by failure reason.",
    ],
  },
  {
    role: "DevSecOps Intern",
    company: "Join Ventures Private Limited (IGP.com)",
    location: "Mumbai, India",
    period: "Oct 2025 – Apr 2026",
    current: false,
    points: [
      "Monitored production using AWS CloudWatch and Kibana across EC2, RDS, Auto Scaling Groups, load balancers and target groups, identifying operational issues.",
      "Migrated Jenkins pipelines to GitHub Actions, standardising build and deployment workflows across repositories.",
      "Wrote Terraform for AWS VPC, subnets and Amazon EKS, enabling repeatable infrastructure provisioning.",
      "Performed EC2 maintenance, Auto Scaling instance refreshes, backup checks and S3 lifecycle configuration.",
    ],
  },
];

export const education = [
  {
    school: "Mumbai University",
    degree: "B.E. Computer Engineering",
    detail: "CGPA 8.95 / 10",
    period: "Aug 2021 – May 2025",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Bash", "YAML"] },
  {
    group: "Cloud",
    items: [
      "AWS: EC2, EKS, VPC, S3, Lambda, API Gateway, DynamoDB, RDS, IAM, CloudWatch, SNS, Route 53, ALB",
    ],
  },
  {
    group: "Platforms",
    items: ["Kubernetes", "OpenShift", "Docker", "Helm", "ArgoCD (GitOps)", "Harbor"],
  },
  {
    group: "CI/CD & IaC",
    items: [
      "Jenkins",
      "GitHub Actions",
      "Terraform",
      "AWS CodePipeline / CodeBuild / CodeDeploy",
      "Git",
      "GitLab",
    ],
  },
  {
    group: "Observability",
    items: ["Datadog", "Prometheus", "Alertmanager", "PagerDuty", "ELK / Kibana", "Pingdom", "CloudWatch"],
  },
  {
    group: "Reliability",
    items: [
      "Linux (RHEL, Ubuntu)",
      "HTTP/HTTPS, DNS, load balancing",
      "P1/P2 incidents",
      "RCA / CAPA",
      "SLI / SLO, MTTR",
      "Release management",
    ],
  },
];

export const certifications: { name: string; issuer: string }[] = [
  { name: "Elastic Certified Observability Engineer", issuer: "Elastic" },
  { name: "GitHub Foundations", issuer: "GitHub" },
  { name: "AWS Academy Graduate: Data Engineering", issuer: "AWS Academy" },
];
