import React,{useState,useEffect} from 'react'
import './home.css'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

function Home() {
  const [data,Setdata]=useState({});
  const [lat,Setlat]=useState("");
  const [lon,Setlog]=useState("");
  const [val,Setval]=useState(false);
  const [curr,Setcurr]=useState({});
  const [daily,Setdaily]=useState({});
  
  
  const key="f9c6a16fdc31cf3ecff1920d99686a4c";
  
  useEffect(()=>navigator.geolocation.getCurrentPosition(position=>{
    Setlat(position.coords.latitude);
    Setlog(position.coords.longitude); 
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=29.3255&lon=76.2998&exclude=hourly,minutely&appid=${key}`).then(res=>res.json()).then(json=>{
      
      console.log(json)
      
      
      Setdata(json)
      Setcurr(json.current)
      Setdaily(json.daily)
                 
  }).catch(err=>console.log("error while fetching"));
  }),[])


  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: lat, lng: lon }}
    >
      <Marker
        position={{ lat: lat, lng: lon }}
      />
    </GoogleMap>
  ));

  
  
  var date=new Date(curr['dt']*1000).toDateString();
 
 const u1="http://openweathermap.org/img/wn/"+daily[1]['weather'][0].icon+"@2x.png";
 const u2="http://openweathermap.org/img/wn/"+daily[2]['weather'][0].icon+"@2x.png";
 const u3="http://openweathermap.org/img/wn/"+daily[3]['weather'][0].icon+"@2x.png";

 
  return (
      
     <div className="container">
      <div className="weather_info">
        <p className="date">{date}</p>
        <h2 className="location">{data['timezone']}</h2>
        
        <h1 clsssName="temp">{(curr['temp']-273).toPrecision(3)}&#176; C</h1>
       
     
        
        <button type="submit" onClick={()=>Setval(true)}>Next 3 days forcast</button>
        
        <div>
          {
          val? 
            <div>
            
              <div className="day1">
                <h4>{new Date(daily[1]['dt']*1000).toLocaleDateString()}</h4>
                <h4>{(daily[1]['temp'].min-273).toPrecision(3)}&#176; C/{(daily[1]['temp'].max-273).toPrecision(3)}&#176; C</h4>
                <h5>{daily[1]['weather'][0].main}</h5> 
                <img src={u1}/>

               
              </div>
            
              <div className="day2">
                <h4>{new Date(daily[2]['dt']*1000).toLocaleDateString()}</h4>
                <h4>{(daily[2]['temp'].min-273).toPrecision(3)}&#176; C/{(daily[2]['temp'].max-273).toPrecision(3)}&#176; C</h4>
                <h5>{daily[2]['weather'][0].main}</h5>
                <img src={u2}/>
               
              </div>
           
              <div className="day3">
                <h4>{new Date(daily[3]['dt']*1000).toLocaleDateString()}</h4>
                <h4>{(daily[3]['temp'].min-273).toPrecision(3)}&#176; C/{(daily[3]['temp'].max-273).toPrecision(3)}&#176; C</h4>
                <h5>{daily[3]['weather'][0].main}</h5>
                <img src={u3}/>
              </div>
            
            </div> : 
          <div>click button to get next three days forcast</div>

          }

        </div>
       
      </div>
      <div className="map">
      <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCVW2FKmXBf1EUQnvUUzogdad5hheqr8o&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%`, }} />}
      containerElement={<div style={{ height: `400px`,width:`400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      />
    <div>
      <table  >
        <tr>
          <th>Currency</th>
          <th>Price</th>
          <th>%change rate</th>
        </tr>
        <tr>
          <td>EURO</td>
          <td></td>
          <td></td>
    
        </tr>
        <tr>
          <td>USD</td>
          <td></td>
          <td></td>
    
        </tr>
      </table>
    </div>

      </div>
    
     
     
    </div>

  
  )}



export default Home



