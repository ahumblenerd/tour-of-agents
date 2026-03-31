/** Shared author info for JSON-LD, meta tags, and visible attribution */
export const AUTHOR = {
  name: "Arun Purushothaman",
  linkedin: "https://www.linkedin.com/in/arunpurushothaman/",
  twitter: "https://x.com/ahd_1337",
  github: "https://github.com/ahumblenerd",
  url: "https://www.linkedin.com/in/arunpurushothaman/",
} as const;

/** JSON-LD Person schema for the author */
export const AUTHOR_JSONLD = {
  "@type": "Person" as const,
  name: AUTHOR.name,
  url: AUTHOR.url,
  sameAs: [AUTHOR.linkedin, AUTHOR.twitter, AUTHOR.github],
};
