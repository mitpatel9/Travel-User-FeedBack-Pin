/* eslint-disable-line */
import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Map, { Marker, Popup } from 'react-map-gl';
import Room from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import { format } from 'timeago.js'

//componenet
import Register from './component/Register';



export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentplaceid, setcurrentplaceid] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [pins, setpins] = useState([]);
  const [tital, settital] = useState(null);
  const [desc, setdesc] = useState(null);
  const [rating, setrating] = useState(0);
  const [viewState, setViewState] = useState({
    zoom: 1
  });

  useEffect(() => {
    const getpins = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/pins");
        setpins(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    getpins();
  }, [])

  const HandelMarkerClick = (id, lat, long) => {
    setcurrentplaceid(id);
    setViewState({ ...viewState, longitude: long, latitude: lat })
  }
  const handelAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({ lng, lat })
  }

  const handelsubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      tital,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng
    }
    // set to backend
    try {
      console.log(newPin)
      const res = await axios.post("http://localhost:8000/api/pins", newPin);
      setpins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="app">
      <Map
        {...viewState}
        mapStyle="mapbox://styles/patelmit9/clclvtq8v00nt14s1n8eozqbh"
        style={{ width: '100%', height: 600 }}
        mapboxAccessToken='pk.eyJ1IjoicGF0ZWxtaXQ5IiwiYSI6ImNsY2YzYzU3OTdkZnozcGtlcTVhcXg1NGMifQ.eJ2esZXsHyU_1AYQNzUBbw'
        onDblClick={handelAddClick}

      >
        {pins.map(p => (
          <div>

            {/* add Marker */}

            <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
              <Room style={{ fontsize: viewState.zoom * 10, color: "red" }} onClick={() => HandelMarkerClick(p._id, p.lat, p.long)} />
            </Marker>

            {/* Add popup */}
            {p._id === currentplaceid &&
              <Popup longitude={p.long} latitude={p.lat} anchor="left" closeButton={true} closeOnClick={false} onClose={() => setcurrentplaceid(null)}>
                <div className="card">
                  <lable>Place</lable>
                  <h4 className="placename">{p.tital}</h4>
                  <lable>Review</lable>
                  <p className='desc'>{p.desc}</p>
                  <lable>Rating</lable>
                  <div className="star">
                    {Array(p.rating).fill(<StarIcon />)}
                  </div>
                  <lable>Information</lable>
                  <span className="username"><b>Creted By {p.username}</b></span>
                  <span className="Date"><b>{format(p.createdAt)}</b></span>
                </div>
              </Popup>
            }
          </div>
        ))}

        {/* add new popup for dubleclick */}

        {newPlace && (
          <Popup longitude={newPlace.lng}
            latitude={newPlace.lat} anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}>
            <div className="">
              <form onSubmit={handelsubmit}>
                <lable>Tital</lable>
                <input type="text" placeholder='Enter Tital' onChange={(e) => settital(e.target.value)} />
                <lable>Review</lable>
                <textarea name="" id="" cols="30" rows="5" placeholder='Say Something This place' onChange={(e) => setdesc(e.target.value)} />
                <lable>Rating</lable>
                <select name="" id="" onChange={(e) => setrating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitbtn" type='submit'>Add pin</button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (<button className='btn logout'>log Out</button>) : (
          <div className="btns">
            <button className='btn login'>Login</button>
            <button className='btn register'>Register</button>
          </div>
        )}
        <Register/>
      </Map>
    </div>
  )
}


