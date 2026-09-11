import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aura-about-you.com";
  const paths = [
    "", "/book", "/aura-photography", "/reiki", "/hypnosis",
    "/energy-clearing", "/private-events", "/about", "/media",
    "/gallery", "/journal", "/journal/what-aura-camera-measures",
    "/journal/what-reiki-feels-like", "/journal/hypnosis-myths",
    "/journal/from-medical-examiner-office-to-paranormal-research",
  ];
  return paths.map((path) => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/book" ? 0.95 : 0.8,
  }));
}
