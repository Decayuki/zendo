// src/utils/formatUrl.ts

/**
 * Transforme "Bebe_fille" en "bebe-fille" pour l'URL
 */
export const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/_/g, '-')           // Remplace les underscores par des tirets
    .normalize("NFD")             // Sépare les accents des lettres
    .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
};

/**
 * Transforme "bebe-fille" ou "vêtements" en "Bebe_fille" / "Vetements" pour la requête MongoDB.
 * Compare en normalisant les deux côtés (casse + accents) pour que l’URL matche toujours.
 */
export const fromSlug = (slug: string, originalList: string[]): string => {
  const normalizedSlug = toSlug(slug);
  return originalList.find((item) => toSlug(item) === normalizedSlug) || slug;
};