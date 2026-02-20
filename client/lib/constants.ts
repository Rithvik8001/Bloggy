import type { NavItem, FeatureData, StepData } from "@/types";

export const APP_NAME = "Bloggy" as const;
export const SERVER_URL = process.env.SERVER_URL as string;
export const APP_TAGLINE = "Write what matters." as const;

export const APP_DESCRIPTION =
  "A clean, distraction-free space for your ideas, stories, and thinking. No clutter — just your words." as const;

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
] as const satisfies readonly NavItem[];

export const FEATURES = [
  {
    title: "Write with clarity",
    description:
      "A minimal editor that removes every distraction. Focus entirely on your words without anything getting in the way.",
    iconName: "Edit3",
  },
  {
    title: "Secure by design",
    description:
      "JWT authentication with httpOnly cookies keeps your account and writing private. Your data stays yours.",
    iconName: "ShieldCheck",
  },
  {
    title: "Instant publishing",
    description:
      "Share your thoughts in seconds. Write, save, publish — no setup, no configuration, no friction.",
    iconName: "Zap",
  },
] as const satisfies readonly FeatureData[];

export const STEPS = [
  {
    number: "01",
    title: "Create an account",
    description:
      "Sign up with your email and a secure password. You'll be writing in under a minute.",
  },
  {
    number: "02",
    title: "Write your first post",
    description:
      "Open the editor and start writing. Format your thoughts exactly the way you want them.",
  },
  {
    number: "03",
    title: "Share your work",
    description:
      "Publish your post and let your ideas reach the people who matter to you.",
  },
] as const satisfies readonly StepData[];
