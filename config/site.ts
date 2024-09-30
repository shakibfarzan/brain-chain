import routes from "@/config/routes";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "BrainChain",
  description: "BrainChain is a Q&A platform",
  navItems: [
    {
      label: "Home",
      href: routes.HOME,
    },
    {
      label: "Ask Question",
      href: routes.QUESTIONS.ASK_QUESTION,
    },
  ],
};
