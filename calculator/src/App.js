import './App.css';
import {useState, useEffect} from 'react'
import { NumericFormat } from 'react-number-format';

<style>

</style>

function App() {
  const [preState, setPreState] = useState("")
  const [curState, setCurState] = useState("")
  const [input, setInput] = useState("0")
  const [operator, setOperator] = useState(null)
  const [total, setTotal] = useState(false)

  const inputNum = e => {
    // This line checks if current state includes a decimal point
    // And if input is also a decimal point
    // If both conditions are true, it returns early perventing multiple decimals
    if (curState.includes(".") && e.target.innerText === ".") {
      return; 
    }
    
    // If total state variable is true, meaning a calculation is completed
    // It sets previous state to an empty string
    // So it clears the previous calculation result from the display
    if (total){
      setPreState("");
    }

    curState 
    ? setCurState((pre) => pre + e.target.innerText) 
    : setCurState(e.target.innerText);
    setTotal(false);

  };

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const operatorType = e => {
    setTotal(false)
    setOperator(e.target.innerText)
    if (curState === ""){
      return;
    }

    if (preState !== ""){
      equals()
    }

    else{
      setPreState(curState)
      setCurState("")
    }
  };

  const equals = e => {
    if (e?.target.innerText === "="){
      setTotal(true)
    }
    let cal;
    switch (operator){
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "*":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const plusMinus = () => {

  };

  const reset  = () => {
    setPreState("")
    setCurState("")
    // setInput("0")

  };

  const percent = () => {
    
  };
  return <div className = "container">
    <div className="wrapper">
    <div className='screen'>
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}>
            </NumericFormat>
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
          </div>
      <div className="btn light-gray" onClick={reset}>AC</div>
      <div className="btn light-gray" onClick={percent}>%</div>
      <div className="btn light-gray" onClick={plusMinus}>+/-</div>
      <div className="btn orange" onClick={operatorType}>/</div>
      <div className="btn" onClick={inputNum}>7</div>
      <div className="btn" onClick={inputNum}>8</div>
      <div className="btn" onClick={inputNum}>9</div>
      <div className="btn orange" onClick={operatorType}>*</div>
      <div className="btn" onClick={inputNum}>4</div>
      <div className="btn" onClick={inputNum}>5</div>
      <div className="btn" onClick={inputNum}>6</div>
      <div className="btn orange" onClick={operatorType}>+</div>
      <div className="btn" onClick={inputNum}>1</div>
      <div className="btn" onClick={inputNum}>2</div>
      <div className="btn" onClick={inputNum}>3</div>
      <div className="btn orange" onClick={operatorType}>-</div>
      <div className="btn zero" onClick={inputNum}>0</div>
      <div className="btn" onClick={inputNum}>.</div>
      <div className="btn" onClick={equals}>=</div>
    </div>
  </div>
  
}

export default App;
