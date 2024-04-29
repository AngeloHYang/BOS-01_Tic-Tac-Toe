import { ref, computed } from 'vue'

export type Marker = 'X' | 'O' | ''
type Board = Marker[]

export const useBoardController = (boardDimension: number) => {

  const currentPlayer = ref<Marker>('X')
  const winner = ref(false)

  const createBoard = (): Board => {
    return Array(boardDimension ** 2).fill('')
  }
  
  const board = ref(createBoard())

  const calculateWinner = () => {

    const getReducer = (getIndexInAcc: (i: number) => number) => (acc: Marker[][], curr: Marker, i: number) => {
      const indexIntoAcc = getIndexInAcc(i)
      const arr = acc[indexIntoAcc]
      if (arr) arr.push(curr)
      return acc
    }
    const cols = board.value.reduce<Marker[][]>(getReducer((i) => i % boardDimension), [[], [], []])
    const rows = board.value.reduce<Marker[][]>(getReducer((i) => Math.floor(i / boardDimension)), [[], [], []])
    
    const diagonalLeftToRight: Marker[] = []
    for (let i = 0; i < board.value.length; i += boardDimension + 1) {
      diagonalLeftToRight.push(board.value[i])
    }

    const diagonalRightToLeft: Marker[] = []
    for (let i = boardDimension - 1; i < board.value.length - 1; i += boardDimension -  1) {
      diagonalRightToLeft.push(board.value[i])
    }
    return [...cols, ...rows, diagonalLeftToRight, diagonalRightToLeft].some((combo) => combo.join('') === currentPlayer.value.repeat(boardDimension))
  }
  
  const computeIsBoardFull = computed(() => {
    return board.value.every(cell => cell !== '')
  })

  const playMove = (cell: number) => {
    if (cell > boardDimension ** 2 || cell < 0) return false
    if (board.value[cell]) return false
    board.value[cell] = currentPlayer.value
    winner.value = calculateWinner()
    if (!winner.value) currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    return true
  }

  return {
    board: computed(() => board.value),
    currentPlayer: computed(() => currentPlayer.value),

    computeWinner: computed(() => winner.value),
    computeIsBoardFull,
    playMove, 
  }
}