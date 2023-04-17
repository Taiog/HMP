import { createContext, useReducer } from "react";

const stages = ["start", "playing", "end"]

const initialState = {
    gameStage: stages[0],
    result: false,
    roundScore: 0,
    gameMap: 1,
    city: false,
    data: [],
    roundPop: 0,
    roundGuess: 0,
    finalScore: []
}

const gameReducer = (state, action) => {

    switch(action.type) {
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: stages[1],
                result: false
            };

        case "ROUND_STATE":
            let msg = `Next Round ${state.gameMap} / 5`
            if(state.gameMap >= 5){
                msg = "Finish Game"
            }
        return {
            ...state,
            roundMsg: msg,
            result: true
        };

        case "NEXT_ROUND":
            const nextRound = state.gameMap + 1
            let endGame = false
            if(state.gameMap >= 5){
                endGame = true
            }

        return {
            ...state,
            gameMap: nextRound,
            city: false,
            gameStage: endGame ? stages[2] : stages[1],
            result: false
        };

        case "NEW_GAME":
            return {...initialState, finalScore: []}

        default:
            return state
    }
}

export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const value = useReducer(gameReducer, initialState)

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}