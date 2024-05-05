<template>
  {{ "isGameOver: " + isGameOver }}
  {{ "isGameWon: " + isGameWon }}
  {{ "isBoardFull: " + isBoardFull }}
  <p></p>

  {{
    "The Winner Is " +
    (isGameOver ? (isGameWon ? currentMarker : "Tie") : "Still Playing")
  }}
  <div
    :style="`display: flex; flex-wrap: wrap; gap: 5px; margin: 50px; max-width: 160px;`"
  >
    <Cell
      v-for="(cell, index) in board"
      :cellDisplay="cell"
      @click="takeTurn(index)"
    />
  </div>

  <button @click="resetBoard">RESET GAME</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Cell from "./components/Cell.vue";
import { runGame } from "./composables/runGame";

const { board, isGameWon, isBoardFull, currentMarker, takeTurn, resetBoard } =
  runGame();

const isGameOver = computed(() => isGameWon.value || isBoardFull.value);
</script>
