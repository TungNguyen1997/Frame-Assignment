import { useState } from "react"

export default function Counter () {
    const [counter, setCounter] = useState(0)
    return (
      <div className="App" >
       <h2>Counter</h2>
       <h2>{counter}</h2>
       <button className="btn-primary" onClick={()=>setCounter(0)} >Reset</button>
       <button className="btn-primary" onClick={()=>setCounter(counter+1)}>Increase</button>
      </div>
    )
  };