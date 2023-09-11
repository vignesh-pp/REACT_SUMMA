import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, isLogged } from "./actions";

function ReduxConcept() {
  const counter = useSelector((state) => state.counter);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  return (
    <div className="App">
      {login && (
        <>
          <h1>Counter:{counter}</h1>
          <button
            onClick={() => {
              dispatch(increment());
            }}
          >
            Increment
          </button>
          <button
            onClick={() => {
              dispatch(decrement());
            }}
          >
            Decrement
          </button>
        </>
      )}
      {login ? (
        <p>THIS IS COUNTER VALUE</p>
      ) : (
        <p>SIGNIN TO SEE VALUE COUNTER VALUE </p>
      )}
      <button
        onClick={() => {
          dispatch(isLogged());
        }}
      >
        {login ? "SIGN OUT" : "SIGN IN"}
      </button>
    </div>
  );
}

export default ReduxConcept;
