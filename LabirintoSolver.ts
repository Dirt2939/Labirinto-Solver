import { Position } from "./shared/types";
import { reconstruirLabirinto } from "./shared/utils";

export class LabirintoSolver {
  private limit: number;
  private linhas: string[][];
  private locE: Position;
  private locS: Position;
  private posicao: Position;
  private possibilidades: Position[];

  constructor(labirinto: string) {
    this.limit = 0;
    this.linhas = [];
    this.locE = { y: -1, x: -1 };
    this.locS = { y: -1, x: -1 };
    this.posicao = { y: -1, x: -1 };
    this.possibilidades = [];

    this.inicializar(labirinto);
  }

  private async inicializar(lab: string) {
    this.contarLimite(lab);
    this.transformarEmMatriz(lab);
    this.encontrarEntrada();
    this.encontrarSaida();
    this.encontrarInicio();

    await this.explorar();
  }

  private encontrarInicio(): void {
    this.linhas[this.locE.y][this.locE.x + 1] = "$";

    this.posicao = {
      y: this.locE.y,
      x: this.locE.x + 1,
    };
  }

  private chegouNaSaida(): boolean {
    return this.posicao.y === this.locS.y && this.posicao.x === this.locS.x - 1;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async explorar(): Promise<boolean> {
    if (this.chegouNaSaida()) {
      console.clear()
      this.mostrarLabirinto()
      console.log("CHEGUEI!")

      return true;
    }

    this.olharAoRedor();

    const possibilidades = [...this.possibilidades];

    if (possibilidades.length === 0) {
      return false;
    }

    for (const pos of possibilidades) {
      const anterior = { ...this.posicao };

      await this.aplicarMovimento(pos);

      const encontrou = await this.explorar();

      if (encontrou) {
        return true;
      }

      await this.voltar(anterior);
    }

    this.linhas[this.posicao.y][this.posicao.x] = ".";

    return false;
  }

  private async voltar(pos: Position): Promise<void> {
    this.linhas[this.posicao.y][this.posicao.x] = ".";

    this.linhas[pos.y][pos.x] = "$";

    this.posicao = {
      y: pos.y,
      x: pos.x,
    };

    console.clear();
    this.mostrarLabirinto();
    console.log("OPS...")

    await this.sleep(50);
  }

  private async aplicarMovimento(pos: Position): Promise<void> {
    this.linhas[this.posicao.y][this.posicao.x] = "#";

    this.linhas[pos.y][pos.x] = "$";

    
    this.posicao = {
      y: pos.y,
      x: pos.x,
    };
    
    console.clear();
    this.mostrarLabirinto();
    console.log("INDO...")

    await this.sleep(50);
  }

  private olharAoRedor(): void {
    this.possibilidades = [];

    const direcoes = [
      { y: 0, x: 1 },
      { y: 0, x: -1 },
      { y: 1, x: 0 },
      { y: -1, x: 0 },
    ];

    for (const dir of direcoes) {
      const novoY = this.posicao.y + dir.y;
      const novoX = this.posicao.x + dir.x;

      if (this.linhas[novoY]?.[novoX] === " ") {
        this.possibilidades.push({
          y: novoY,
          x: novoX,
        });
      }
    }
  }

  private contarLimite(labirinto: string): void {
    for (const c of labirinto) {
      if (c === "\n") {
        break;
      }

      this.limit++;
    }
  }

  private transformarEmMatriz(labirinto: string): void {
    this.linhas = labirinto
      .trim()
      .split("\n")
      .map((linha) => linha.split(""));
  }

  public encontrarEntrada(): void {
    for (let y = 0; y < this.linhas.length; y++) {
      for (let x = 0; x < this.linhas[y].length - 1; x++) {
        if (this.linhas[y][x] === " " && this.linhas[y][x + 1] === " ") {
          this.linhas[y][x] = "E";

          this.locE = {
            y,
            x,
          };

          return;
        }
      }
    }
  }

  public encontrarSaida(): void {
    for (let y = 0; y < this.linhas.length; y++) {
      if (this.linhas[y][this.limit - 1] === " ") {
        this.linhas[y][this.limit - 1] = "S";

        this.locS = {
          y,
          x: this.limit - 1,
        };

        return;
      }
    }
  }

  public mostrarLabirinto(): void {
    console.log(reconstruirLabirinto(this.linhas));
  }
}
