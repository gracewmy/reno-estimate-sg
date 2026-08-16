/**
 * RenoEstimate SG page metadata helper.
 * Design note: concise, factual page titles support the site's calm editorial utility style.
 */
import { useEffect } from "react";
import { SITE_URL } from "@/const";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
};

function updateMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export function Seo({ title, description, path = "/" }: SeoProps) {
  useEffect(() => {
    document.title = title;
    updateMeta("description", description);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`);
  }, [title, description, path]);

  return null;
}

