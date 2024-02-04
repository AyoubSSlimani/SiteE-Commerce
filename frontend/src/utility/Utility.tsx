export function TrimEmail(str: string): string | null {
  const parts = str.split("@");
  if (parts.length === 2) {
    return parts[0];
  } else {
    return null; // Retourne null si le format de l'e-mail n'est pas conforme
  }
}
