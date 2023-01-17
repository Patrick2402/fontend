import { useState, useEffect } from "react";
import Stats from "../components/Stats";
export default function Timer() {

    const [scramble, setscramble] = useState(null); // scramble 
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [time, setTime] = useState(0);
    const [times, setTimes] = useState([]); // array of all times
    const [json, setjson] = useState({ "id": 1, "scramble": scramble, "time": time / 1000 });
    const [id, setid] = useState(1);




    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    const moves = ['U', 'U2', 'U\'', 'D', 'D2', 'D\'', 'L', 'L2', 'L\'', 'R', 'R2', 'R\'', 'F', 'F2', 'F\'', 'B', 'B2', 'B\''];
    const axes = ['U', 'D', 'L', 'R', 'F', 'B'];


    function generateScramble() {
        const scrambleLength = 20; // the basic length of scramble
        let scramble = ''; //empty string for scramble 
        let lastAxis = null; // last axis is null bc there is no move no -1

        for (let i = 0; i < scrambleLength; i++) {
            let move; // for each iteration is generated new var called move
            do {
                move = moves[Math.floor(Math.random() * moves.length)]; // first iteration, just generation random move 
            } while (axes.indexOf(move[0]) === axes.indexOf(lastAxis));  // 
            scramble += move + ' ' // adding move to our scramble 
            lastAxis = move[0] // setting last axis
        }
        setscramble(scramble) // setting scramble to my var Hook
    }



    useEffect(() => { // new scramble is generating when timer is stopped
        if (!isRunning) {
            generateScramble()
        }

    }, [isRunning]);



    useEffect(() => {
        let interval = null;
        if (isRunning) {
            setTime(elapsedTime)
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
            }, 10)
        } else if (!isRunning && elapsedTime !== 0) {
            clearInterval(interval)
            setTime(elapsedTime)
            setTimes(prevTimes => [...prevTimes, time])
            //setjson({ "id": id, "scramble": scramble, "time": elapsedTime / 1000 })
            //setid(times.length + 1)
        }
        return () => clearInterval(interval)
    }, [isRunning, elapsedTime]);

    const handleKeyDown = event => {
        if (event.key === ' ') {
            setIsRunning((prevIsRunning) => !prevIsRunning);

        }
        if (!isRunning) {
            setElapsedTime(0);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    const showtimes = times.map((time, index) => (
        <div className="little-time" key={index}>
            {Math.floor(time / 60000)}:{Math.floor((time % 60000) / 1000)}:{Math.floor((time % 1000) / 10)}
        </div>
    ))


    const [average, setaverage] = useState(0.00);
    const [best, setbest] = useState(null);
    const handleaverageClick = () => {
        if (times.length === 0) {
            setbest(null)
            setaverage(null)
        }
        let sum = 0;
        let arr = [];
        if (times.length >= 5) {
            for (let i = times.length - 1; i > times.length - 6; i--) {
                arr.push(times[i]);
            }
            // arr.sort(); arr.pop(); arr.shift();
            for (let i = 0; i < arr.length; i++) sum += arr[i];
            setaverage((sum / 5).toFixed(2));
        }
    }
    const thebesttime = () => {
        if (times.length === 1) setbest(times[0])
        for (let i = 0; i < times.length; i++) {
            if (times[i] < best) setbest(times[i])
        }
    }
    useEffect(() => {
        handleaverageClick()
        thebesttime()
    }, [times])

    const handleDelete = () => {
        setTimes([])
        setResults('')
        setSingle('')
    }

    const [results, setResults] = useState('')
    const [single, setSingle] = useState('')

 
    const fun = async () => {
        const avg = (average / 10).toFixed(0);
        const res = await fetch('/api/timerstats', {
            method: 'POST',
            body: JSON.stringify({ avg: avg }),
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json();
        setResults(json);
    }

    const fun_two = async () => {
        const sin = (time/10).toFixed(0);

        const res = await fetch('/api/singleranks', {
            method: 'POST',
            body: JSON.stringify({ sin: sin }),
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json();
        setSingle(json);
        
    }

    useEffect(() => {
        if (times.length > 4) {
            fun()
        }
    }, [average])


    useEffect(() => {
        if(times.length > 0) fun_two()
    },[times])

    return (
        <div className="timer">
            <div className="scramble"><span>{scramble}</span></div>
            <div className="mains">
                <div className="left"> {showtimes} </div>
                <div className="center">{!minutes ? <span>{seconds}.{milliseconds}</span> : <span>{minutes}:{seconds}.{milliseconds}</span>}
                </div>
                <div className="right">
                    <div className="btnstack">
                        <button className="delete-times" onClick={handleDelete}>Delete times</button>
                    </div>
                    <div className="stats">
                        <h1>Statistics</h1>
                        <p>Ao5: {Math.floor((average % 60000) / 1000)}.{Math.floor((average % 1000) / 10)}</p>
                        <p>Best: {Math.floor((best % 60000) / 1000)}.{Math.floor((best % 1000) / 10)}</p>
                        {results !== '' ? <p>World Avg rank position: {results[0].position}</p> : <p>World Avg Rank position: DNF</p>}
                        {single !== '' ? <p>World Single rank position:{single[0].singlepos} </p> : <p>World Single Rank position: DNF</p>}

                    </div>

                </div>
            </div>

        </div>
    )
}



