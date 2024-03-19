"use client"
import React, {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useCallback,
    useEffect,
} from "react";
const WebContext = createContext();

export function useWebContext() {
    return useContext(WebContext);
}

function reducer(state, { type, payload }) {
    return {
        ...state,
        [type]: payload
    }
}

const INIT_STATE = {
    loading: true,
    walletBalance: 0,
    disconnect_able: false,
    address: null,
    selectedwallet:"",
    accounts: [],
    connected: false,
    balance: {
        confirmed: 0,
        unconfirmed: 0,
        total: 0,
    },
};


export default function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
0
    return (
        <WebContext.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        dispatch
                    }
                ],
                [state]
            )}
        >
            {children}
        </WebContext.Provider>
    );
}