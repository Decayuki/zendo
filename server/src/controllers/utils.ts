import jwt from "jsonwebtoken";

export function getUserFromHeaders(req: any): string {
  // Etape 1 : recupere le token d'authorization dans les headers
  const token = req.header("authorization")?.replace("Bearer ", "");

  // Etape 2 : récuperer les infos du token pour savoir de quel user il s'agit
  // jwt.verify pour decoder le token
  const decodedToken = jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
  );
  // on recupere l'id du user à partir du token décodé
  const userId = (decodedToken as { id: string }).id;
  return userId;
}
