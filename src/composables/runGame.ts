import { ref, computed } from "vue";

export type Marker = "X" | "O" | "";
type Board = Marker[];

export const runGame = () => {
  const board = ref<Board>(["", "", "", "", "", "", "", "", ""]);
  const currentMarker = ref<Marker>("X");

  const resetBoard = () => {
    board.value = ["", "", "", "", "", "", "", "", ""];
    currentMarker.value = "X";
  };

  const takeTurn = (index: number) => {
    board.value[index] = currentMarker.value;
    currentMarker.value = currentMarker.value === "X" ? "O" : "X";
  };

  const isBoardFull = computed(() => board.value.every((cell) => cell !== ""));
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isGameWon = computed(() => {
    for (const position of winningPositions) {
      const [a, b, c] = position;
      if (
        board.value[a] !== "" &&
        board.value[a] === board.value[b] &&
        board.value[b] === board.value[c]
      ) {
        return true;
      }
    }
    return false;
  });

  return {
    board: computed(() => board.value),
    currentMarker: computed(() => currentMarker.value),
    isBoardFull,
    isGameWon,
    takeTurn,
    resetBoard,
  };
};
