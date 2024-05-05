<template>
  <div
    :style="{
      width: '50px',
      height: '50px',
      background: 'green',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
  >
    {{ props.cellDisplay }}
  </div>
</template>

<script setup lang="ts">
import { Marker, runGame } from "../composables/runGame";

// const { takeTurn } = runGame();
const props = defineProps<{
  cellDisplay: Marker;
}>();
</script>
