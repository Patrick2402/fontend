import { useState,useEffect } from "react";
export default function Stats(props) {
    const data = props.times;

    const [average, setaverage] = useState(0.00);
    const [best,setbest] = useState(null);
    const handleaverageClick = () => {
        if(data.length === 0) {
            setbest(null)
            setaverage(null)
        }
        let sum = 0;
        let arr = [];
        if(data.length >= 5 ){
          for(let i = data.length-1 ; i > data.length-6; i--){
            arr.push(data[i]);
          } 
          arr.sort(); arr.pop(); arr.shift();

          for(let i = 0 ; i < arr.length ; i++) sum +=arr[i];
          setaverage((sum/3).toFixed(2));
        }
      }
      const thebesttime = () => {
        if(data.length === 1) setbest(data[0])
        for(let i = 0 ; i < data.length ; i ++){
            if(data[i] < best) setbest(data[i])
        }
      }
      useEffect(() => {
        handleaverageClick()
        thebesttime()
      },[data])

  return (
    <div className="stats"> 
        <h1>Statistics</h1>
        <p>Ao5: {Math.floor((average % 60000) / 1000)}.{Math.floor((average % 1000) / 10)}</p>
        <p>Best: {Math.floor((best % 60000) / 1000)}.{Math.floor((best % 1000) / 10)}</p>
    </div>

  )
}
