export function reconstruirLabirinto(linhas: string[][]): string {
  return linhas.map((linha) => linha.join("")).join("\n");
}
