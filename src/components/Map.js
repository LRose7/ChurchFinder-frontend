import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { listChurches } from './churchListApi';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

function Map() {
  const [selectedChurch, setSelectedChurch] = useState(null);
  const [churches, setChurches] = useState([]);
  const [viewport, setViewport] = useState({
    longitude: -85.1386015,
    latitude: 41.0799898,
    width: '97vw',
    height: '70vh',
    zoom: 10
  });

  const mapRef = useRef();


  useEffect(() => {
    (async () => {
      const churchList = await listChurches();
      setChurches(churchList);
    })();
    console.log(churches);

    return () => {
      // clean up things ...
      // is like a componentUnmount()
    };
  }, []);

  return (
    <div >
      <ReactMapGL
        className='mapContainer'
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        maxZoom={20}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(newViewport) => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
      >
        {
          churches.map(church =>

            <Marker
              key={church.id}
              longitude={parseFloat(church.Longitude)}
              latitude={parseFloat(church.Latitude)}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div>
                <button
                  className='marker-btn'
                  onClick={e => {
                    e.preventDefault();
                    setSelectedChurch(church);
                  }}
                >
                  <img src='/theOne.svg' alt='Church Clipart Photos' />
                </button>
              </div>
            </Marker>
          )
        }

        {/* ternary operator - if it is the selectedChurch then show Popup.  If not null.*/}

        {selectedChurch ? (
          <Popup
            className='popup'
            latitude={parseFloat(selectedChurch.Latitude)}
            longitude={parseFloat(selectedChurch.Longitude)}

          // In the video they use an onClose function to close Popup window but it wont allow web_URL to be clicked on
          // onClose ={() => {
          //   setSelectedChurch(null);
          // }}
          >

            {/* Using a simple redirect to close the popup window.  Looking for a smoother way to do so. */}
            <div className='close-popup-btn'>
              <button className='close-popup'
                onClick={e => window.location.href = '/Findchurch'}
              >x</button>
            </div>
            <div>
              <ul className='marker-popup'>
                <li>
                  <h2>{selectedChurch.Name}</h2>
                </li>
                <li>
                  <h4>
                    {selectedChurch.Mailing_One}<br></br>
                    {selectedChurch.Mailing_Two}<br></br>
                    {selectedChurch.City}, {selectedChurch.State} {selectedChurch.PostalCode}
                  </h4>
                </li>
                <li>
                  <a className='church-links' href={selectedChurch.Web_URL} target='_blank'>{selectedChurch.Web_URL}</a>
                </li>
              </ul>

            </div>
          </Popup>

        ) : null}

      </ReactMapGL>
    </div>
  )
}

export default Map;
