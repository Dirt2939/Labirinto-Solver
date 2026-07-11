# 🧩 Labirinto Solver

Um projeto em **TypeScript** que resolve labirintos utilizando **recursão**, **DFS (Depth-First Search)** e **Backtracking**, exibindo toda a exploração em tempo real no console.

O algoritmo percorre o labirinto, toma decisões em bifurcações, volta quando encontra becos sem saída e continua explorando até encontrar a saída.

## ✨ Demonstração

Durante a execução, o console é atualizado mostrando o progresso do algoritmo:

* `$` → posição atual do explorador
* `#` → caminho que está sendo percorrido
* `.` → caminhos já testados que não levam à saída
* `*` → paredes
* `E` → entrada
* `S` → saída

Exemplo Real:

```txt
*************************
E#*  #####*       *     *
*#***#***#* ***** * *** *
*###*#*###*     * * *   *
***#*#*#******* * * * ***
*###*#*#######* *    ###*
*#***#*******#* *****#*#*
*#####*     *#* ####*#*#*
*****.* *** *#**#**#*#*#*
*.....* *   *####.*###*$S
*************************
```

## 🧠 Como funciona

O algoritmo utiliza **busca em profundidade (DFS)**:

1. Verifica se chegou à saída.
2. Procura todas as posições possíveis ao redor.
3. Escolhe um caminho e avança.
4. Caso encontre um beco sem saída, realiza **backtracking**, retornando para a última decisão.
5. Continua explorando até encontrar a saída ou esgotar todas as possibilidades.

Fluxo simplificado:

```txt
explorar()
├─ chegou na saída? → true
├─ sem caminhos? → false
└─ para cada possibilidade:
      ├─ mover
      ├─ explorar()
      └─ voltar se falhar
```

## 📚 Conceitos estudados

Este projeto explora diversos conceitos importantes de Ciência da Computação:

* Recursão
* Pilha de chamadas (Call Stack)
* Depth-First Search (DFS)
* Backtracking
* Representação de labirintos em matrizes
* Animação no console com `async/await`
* Manipulação de estados

## 🚀 Executando

### Instalar dependências

```bash
npm install
```

### Executar

```bash
node src/index.ts
```

## 🏗 Estrutura do projeto

```txt
src/
├── index.ts
└── labirinto.ts
```

## 💡 Próximos passos

Possíveis melhorias para o projeto:

* [ ] Encontrar o menor caminho utilizando BFS.
* [ ] Implementar o algoritmo A*.
* [ ] Gerar labirintos aleatórios.
* [ ] Permitir diferentes velocidades de animação.
* [ ] Exportar a solução encontrada.
* [ ] Adicionar estatísticas de execução (passos, tempo e nós visitados).

## 📖 Aprendizados

Este projeto foi criado com o objetivo de estudar algoritmos e compreender, na prática, como computadores podem explorar e resolver problemas através de tentativa, erro e tomada de decisões.

Mais do que encontrar a saída de um labirinto, o objetivo foi entender como técnicas como **recursão** e **backtracking** funcionam internamente.

---

Feito com TypeScript e algumas horas olhando um `$` andar pelo console e achando isso absurdamente interessante.
