export interface GameState {
    holes: number[];
    banks: [number, number];
    currentPlayer: number;
    gameOver: boolean;
    winner: number | null;
    status: string;
  }
  
  export type GameAction = {
    type: 'sow';
    holeIndex: number;
  }; 