export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export type FeatureIconName = "Edit3" | "ShieldCheck" | "Zap";

export type FeatureData = {
  readonly title: string;
  readonly description: string;
  readonly iconName: FeatureIconName;
};

export type StepData = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
};
