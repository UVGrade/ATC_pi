import {Form, Button} from 'react-bootstrap';
import React, { useEffect, useState }  from "react";

function Settings(){
  const [metric,setMetric]= useState(false);

  const changedMetric=(e)=>{
    setMetric(!metric)
  }

  const fetchSettings = async () =>{
    const response = await fetch("http://localhost:8000/api/settings")
    const settJ= await response.json()
    console.log(settJ)
    
    setMetric(settJ['metric'])
  }

  useEffect(() => {
    fetchSettings()
  },[]);

  const saveSettings = async (e)=>{
    try{
      e.preventDefault();
      const {metricA}= e.target.elements;
      
      let details={
        metric:metric
      }
      console.log(details)
      let response= await fetch("http://localhost:8000/api/settings",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(details)
      });
    }catch(e){
      alert("Whoops, we can't save these settings. Please try again later.")
    }
  }

  return (
    <div>
      <Form onSubmit={saveSettings}>
          <Form.Check 
            type="switch"
            id="metricA"
            checked={metric}
            onChange={changedMetric}
            label= {metric?"Metric System (Celcius)":"Metric System (Farenheit)"}
            />
            <Button variant="primary" type="submit">
              Apply
            </Button>
      </Form>
    </div>
  );

}
export default Settings;
