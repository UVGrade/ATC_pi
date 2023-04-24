import React, { useEffect, useState }  from "react";
import '../Components/global'

const TodosContext = React.createContext({
    upT: [], setUpT: () => {}
  })

class System extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      showTemps: true,
      showStorage: true
    }
    this.toggleTemp= this.toggleTemp.bind(this);
    this.toggleStorage= this.toggleStorage.bind(this);
  }

  toggleTemp(e){
    this.setState({showTemps: !this.state.showTemps})
  }
  toggleStorage(e){
    this.setState({showStorage: !this.state.showStorage})
  }

  render(){
    return (
      <div>
        <UptimeSection />
        <hr/>
        <h2 className="sectionDivider" onClick= {(e) => {this.toggleTemp(e)}} >Temps {this.state.showTemps?"+":"-"}</h2>
        {this.state.showTemps?<TempsSection />:null}
        <h2 className="sectionDivider" onClick= {(e) => {this.toggleStorage(e)}}>Storage {this.state.showStorage?"+":"-"}</h2>
        {this.state.showStorage?<StorageSection />:null}
        <h2 className="sectionDivider">Networking</h2>
      </div>
    );
  }
}
export default System;

function StorageSection(){
  const [disks,setDisks]= useState([]);

  const fetchDisks = async () =>{
    const response = await fetch(global.config.mainUrl+":8000/api/storage")
    const storeJ= await response.json()
    console.log(storeJ)
    setDisks(storeJ)
  }

  useEffect(() => {
    fetchDisks()
  },[]);

  return(
    <div className="arrangeHorizont">
      {disks.map(({dev,mount,used,total})=>{
        return(
          <Widget key={dev} sub={mount} title={dev}><StorageFormat used={used} total={total}/></Widget>
        );
      })}
    </div>
  );
}  

function TempsSection(){
  const [temps,setTemps]= useState([]);
  
  const fetchTemps = async () => {
      
      const response = await fetch(global.config.mainUrl+":8000/api/temps")
      const tempJ= await response.json()
      setTemps(tempJ)
  }

  useEffect(() => {
      // call api or anything
      fetchTemps()
  },[]);
  return(
    <div className="arrangeHorizont">
      {temps.map(({id,temp_m,temp_f,alias})=>{
        return(
          <Widget key={id} title={alias}>{temp_f} °{temp_m?'C':'F'}</Widget>
          
        );
      })}
      <Widget title='CPU_dsfsdjfkjsdal;fjsdkl'>75 °F</Widget>
    </div>
  );
}

function UptimeSection(){
  const [upT,setUpT] = useState('...');
const [bootT,setBootT]= useState('///');
const fetchupT = async () => {
    const response = await fetch(global.config.mainUrl+":8000/api/uptime")
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
},[]);
  return(
    <div>
      <h4>Last Restart on: {upT}</h4>
      <h4>Running for: {bootT}</h4>
    </div>
  );
}

function Widget(props){
  var limit= 14
  var title= Limit(props.title)
  var sub= Limit(props.sub)
  return(
    <div className="widgetCard">
      <div className="widgetTop">{title}</div>
      <div className="widgetCenter">{props.children}</div>
      {sub!==undefined?<div className="widgetBtm">{sub}</div>:<></>}
    </div>
  );
}

function Limit(item){
  var limit=14
  if(item!==undefined){
    if(item.length>limit){
      return item.substring(0,limit)+'...'
    }else{
      return item
    }
  }else{
    return undefined
  }
}

function StorageFormat(props){
  var percent= Math.round(props.used / props.total * 1000)/10
  var total=props.total
  var measure='B'
  if(total>1000){
    total=total/1000
    measure='KB'
  }
  if(total>1000){
    total=total/1000
    measure="MB"
  }
  if(total>1000){
    total=total/1000
    measure="GB"
  }
  if(total>1000){
    total=total/1000
    measure="TB"
  }
  total=Math.round(total * 10)/10
  return(
    <div>
      {percent}%<div className="subCard">Total {total+' '+measure}</div>
    </div>
  );
}