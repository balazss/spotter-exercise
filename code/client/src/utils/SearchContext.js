import { apiHost } from "config";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

export const SearchContextState = createContext();
export const SearchContextUpdater = createContext();

const LIMIT = 12;

const initialState = {
  loading: true,
  error: null,
  products: [],
  currentOffset: 0,
  hasMore: false,
  count: 0,
  query: "",
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
        query: action.payload.query,
      };
    case "FIRST_FETCH": {
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload.products,
        currentOffset: 0,
        hasMore: action.payload.count > state.currentOffset + LIMIT,
        count: action.payload.count,
        query: action.payload.query,
      };
    }
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        products: [...state.products, ...action.payload.products],
        currentOffset: state.currentOffset + LIMIT,
        hasMore: action.payload.count > state.currentOffset + LIMIT,
        count: action.payload.count,
        query: action.payload.query,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        products: [],
        currentOffset: 0,
        hasMore: false,
        count: 0,
        query: action.payload.query,
      };
    default:
      return state;
  }
};

function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const loadProducts = useCallback(async (query, offset = 0) => {
    dispatch({ type: "FETCH_INIT", payload: { query } });
    try {
      // TODO: This could be moved to a separate file with other API calls
      const url = `${apiHost}/api/products?${new URLSearchParams({
        query: query,
        offset: offset,
        limit: LIMIT,
      })}`;

      const response = await fetch(url);

      const { data } = await response.json();
      const { products, count } = data;
      if (offset === 0) {
        dispatch({ type: "FIRST_FETCH", payload: { products, count, query } });
      } else {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { products, count, query },
        });
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: { error, query } });
    }
  }, []);

  const contextStateValue = useMemo(() => ({ ...state }), [state]);
  const contextUpdaterValue = useMemo(() => ({ loadProducts }), [loadProducts]);

  return (
    <SearchContextState.Provider value={contextStateValue}>
      <SearchContextUpdater.Provider value={contextUpdaterValue}>
        {children}
      </SearchContextUpdater.Provider>
    </SearchContextState.Provider>
  );
}

function useSearchState() {
  const context = useContext(SearchContextState);
  if (context === undefined) {
    throw new Error("useSearchState must be used within its Provider");
  }
  return context;
}

function useSearchUpdater() {
  const context = useContext(SearchContextUpdater);
  if (context === undefined) {
    throw new Error("useSearchUpdater must be used within its Provider");
  }
  return context;
}

export { SearchProvider, useSearchState, useSearchUpdater };
