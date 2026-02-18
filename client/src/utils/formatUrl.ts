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
 * Transforme "bebe-fille" en "Bebe_fille" pour la requête MongoDB
 */
export const fromSlug = (slug: string, originalList: string[]): string => {
  return originalList.find(item => toSlug(item) === slug) || slug;
};