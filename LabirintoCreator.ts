import { Position } from "./shared/types";
import { reconstruirLabirinto } from "./shared/utils";

export class LabirintoCreator {
  private min: number;
  private max: number;
  private altura: number;
  private linhas: string[][];
  private largura: number;
  private locE: Position;
  private locS: Position;

  constructor() {
    this.linhas = [];
    this.min = 8;
    this.max = 22;
    this.altura =
      Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    this.largura =
      Math.floor(Math.random() * (this.max + 20 - (this.min + 20) + 1)) +
      (this.min + 20);
    this.locE = {
      y: 0, 
      x: Math.floor(Math.random() * (this.largura - 2)) + 1, 
    };

    this.locS = {
      y: this.altura - 1, 
      x: Math.floor(Math.random() * (this.largura - 2)) + 1, 
    };
    this.inicializar();
  }

  private inicializar() {
    this.gerarLinhas();
    this.mostrarLabirinto();
  }

  private gerarLinhas() {
    this.linhas = [];

    // 1. Gera a estrutura da moldura totalmente fechada
    for (let i = 0; i < this.altura; i++) {
      let novaLinha: string[] = [];

      if (i === 0 || i === this.altura - 1) {
        // Linhas de cima e de baixo totalmente cheias de "#"
        for (let z = 0; z < this.largura; z++) {
          novaLinha.push("#");
        }
      } else {
        // Linhas do meio com as laterais fechadas e miolo vazio
        novaLinha.push("#");
        for (let z = 0; z < this.largura - 2; z++) {
          novaLinha.push(" "); // Use espaço em branco para não quebrar o visual
        }
        novaLinha.push("#");
      }

      this.linhas.push(novaLinha);
    }

    this.linhas[this.locE.y][this.locE.x] = " "; // Abre o teto
    this.linhas[this.locS.y][this.locS.x] = " "; // Abre o chão
  }

  private mostrarLabirinto() {
    console.log(reconstruirLabirinto(this.linhas));
  }
}
