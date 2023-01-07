import React, { useEffect, useState }  from "react";

const TodosContext = React.createContext({
    upT: [], setUpT: () => {}
  })

export default function System() {
    const [upT,setUpT] = useState('');
    const [bootT,setBootT]= useState('');
    const fetchupT = async () => {
        const response = await fetch("http://localhost:8000/api/uptime")
        const TimeUp = await response.json()
        console.log(TimeUp)
        var formatBoot= new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(TimeUp.timestamp * 1000)
        
        var day= Math.floor(TimeUp.uptime / 86400)
        var hour= Math.floor((TimeUp.uptime- day * 86400)/3600)
        var min= Math.floor((TimeUp.uptime- day * 86400 - hour * 3600)/60)
        var sec= Math.floor(TimeUp.uptime - (day * 86400) - (hour * 3600) - (min * 60))
        var uptFormat= day+' days '+hour+' hours '+min+' minutes '+sec+ ' seconds '
        
        setUpT(formatBoot)
        setBootT(uptFormat)
    }
    useEffect(() => {
        // call api or anything
        fetchupT()
    });
    return (
      <div>
        <h4>Last Restart on: {upT}</h4>
        <h4>Running for: {bootT}</h4>
        <hr/>
        <h2>Temps</h2>
        <Widget><h5>75 °F</h5></Widget>
        <hr/>
        <h2>Storage</h2>
        <hr/>
        <h2>Networking</h2>
      </div>
    );
  }


  function Widget(props){
    return(
      <div className="widgetCard">
        <div className="widgetTop">CPU</div>
        <div className="widgetCenter">75 °F</div>
        <div className="widgetBtm"></div>
        {/*<div>{props.children}</div>*/}
      </div>
    );
  }
