import { GoogleMap, InfoWindowF, MarkerF, InfoWindow, Marker, LoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import ImageTask from "./ImageTask";

// Day.js
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('th');
dayjs.extend(buddhistEra);
dayjs.extend(relativeTime);

const markers = [
    {
        id: 1,
        name: "Chicago, Illinois",
        position: { lat: 41.881832, lng: -87.623177 }
    },
    {
        id: 2,
        name: "Denver, Colorado",
        position: { lat: 39.739235, lng: -104.99025 }
    },
    {
        id: 3,
        name: "Los Angeles, California",
        position: { lat: 34.052235, lng: -118.243683 }
    },
    {
        id: 4,
        name: "New York, New York",
        position: { lat: 40.712776, lng: -74.005974 }
    }
];

function MapComp({ tasks }) {
    let zoom = 16;
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    const status_check = (status) => {
        if (status === 0) {
            return "รอรับเรื่อง"
        } else if (status === 1) {
            return "ดำเนินการ"
        } else if (status === 2) {
            return "เสร็จสิ้น"
        }
    }

    return (
        <>
            <LoadScript googleMapsApiKey="AIzaSyBHBTkH9fICG5hTL1xNFkyLXaQGyZU6fek">
                <GoogleMap
                    options={{
                        streetViewControl: true,
                        zoom: zoom
                    }}
                    onLoad={handleOnLoad}
                    center={{ lat: 14.160833268480362, lng: 101.34863184895529 }}
                    onClick={() => setActiveMarker(null)}
                    mapContainerStyle={{ width: "100vw", height: "100vh" }}
                >
                    {tasks.map(({ _id, lat, lon, detail, imgStart, imgEnd, type, startDate_timeStamp, address, status }) => (
                        <MarkerF
                            key={_id}
                            position={{ lat: lat, lng: lon }}
                            onClick={() => handleActiveMarker(_id)}
                        >
                            {activeMarker === _id ? (
                                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                    <>
                                        <ImageTask imgStart={imgStart} imgEnd={imgEnd} />
                                        <h1>สถานะ : <span className="text-red-500">{status_check(status)}</span> {dayjs().to(dayjs.unix(startDate_timeStamp))}</h1>
                                        <h1>รายละเอียด : {detail} </h1>
                                        <h1>ประเภท : {type}</h1>
                                        <h1>วันที่แจ้ง {dayjs
                                            .unix(startDate_timeStamp)
                                            .format('D MMM BBBB เวลา HH:mm น.')}</h1>
                                        <h1>สถานที่ {address}</h1>
                                    </>
                                </InfoWindowF>
                            ) : null}
                        </MarkerF>
                    ))}
                </GoogleMap>
            </LoadScript>
        </>
    )
}

export default MapComp