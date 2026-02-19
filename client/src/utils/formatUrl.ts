// =============================================================
// UTILITAIRE FORMAT URL
// Convertit les noms de la BDD en slugs pour les URLs et inversement
// Exemple : "Bebe_fille" → "bebe-fille" (pour l'URL)
//           "bebe-fille" → "Bebe_fille" (pour la requete MongoDB)
// =============================================================

// Transforme un nom BDD en slug URL
// "Bebe_fille" → "bebe-fille"
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/_/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Transforme un slug URL en nom BDD
// "bebe-fille" → "Bebe_fille"
// On cherche dans la liste originale pour retrouver la bonne casse
function fromSlug(slug: string, originalList: string[]): string {
  const found = originalList.find(function (item) {
    return toSlug(item) === slug;
  });
  return found || slug;
}

export { toSlug, fromSlug };
