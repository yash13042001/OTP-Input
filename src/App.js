import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const emptyArr = ["", "", "", ""];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setinputs] = useState(emptyArr);
  const [missing, setMissing] = useState(emptyArr);
  const CODE = "1234";

  const handleInputChange = (e, i) => {
    const val = e.target.value;
    if (!Number(val)) {
      return;
    }

    if (i < inputs.length - 1) {
      refs[i + 1].current.focus();
    }

    const copuInputs = [...inputs];
    copuInputs[i] = val;
    setinputs(copuInputs);
  };

  const handleKeyDown = (e, i) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[i] = "";
      setinputs(copyInputs);
      if (i > 0) {
        refs[i - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text");
    // console.log(data);
    if (!Number(data) || data.length !== inputs.length) {
      return;
    }
    const inputData = data.split("");
    // console.log(inputData);
    setinputs(inputData);
    refs[inputs.length - 1].current.focus();
  };

  const handleSubmit = () => {
    const missed = inputs
      .map((item, i) => {
        if (item === "") {
          return i;
        }
      })
      .filter((item) => item || item === 0);
    // console.log("missed", missed);
    setMissing(missed);
    if (missed.length) {
      return;
    }

    const userInput = inputs.join("");
    const isMatched = userInput === CODE;
    const msg = isMatched ? "Code is Valid" : "Code is not valid";
    alert(msg);
    setinputs(emptyArr);
  };

  // console.log(inputs);

  useEffect(() => {
    refs[0].current.focus();
  }, []);
  return (
    <div className="App">
      <h1>Two-Factor Code Input</h1>
      <div>
        {emptyArr.map((item, i) => {
          return (
            <input
              key={i}
              value={inputs[i]}
              ref={refs[i]}
              type="text"
              maxLength={1}
              onPaste={handlePaste}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={missing.includes(i) ? "error" : ""}
            />
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
