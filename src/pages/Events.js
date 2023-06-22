import styles from "./style.module.css";
import { load } from '@2gis/mapgl';
import {useEffect} from "react";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadMarkersThunkCreator} from "../store/markersReducer";
import {useNavigate} from "react-router-dom";
import {getMarkers, markersAPI} from "../api/markersAPI";

const MapWrapper = React.memo(
    () => {
        return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>;
    },
    () => false,
);

export const Map = () => {
    const dispatch = useDispatch();
    const API_KEY = "16088834-d028-430b-918e-bcbcf5cb9e09"

    useEffect(() => {
        const asyncFn = async () => {
            let response = await getMarkers();
            console.log(response);
            let map;
            let marker;
            let popup;
            load().then((mapglAPI) => {
                map = new mapglAPI.Map('map-container', {
                    center: [84.954097, 56.483611],
                    zoom: 13,
                    key: API_KEY,
                });

                response.map((markerItem) => {
                    console.log(markerItem);
                    marker = new mapglAPI.Marker(map,
                        {coordinates: [parseFloat(markerItem.y_pos), parseFloat(markerItem.x_pos)]});
                    popup = new mapglAPI.HtmlMarker(map, {
                        coordinates: marker.getCoordinates(),
                        html: `<div class="popup">
                    <div class="popup-content">
                        ${markerItem.marker}
                    </div>
                    <div class="popup-close">x</div>
                    <div class="popup-tip"></div>
                </div>`,
                    });
                    const popupHtml = popup.getContent();
                    hidePopup();

                    marker.on('click', () => (popupHtml.style.display = 'block'));

                    popupHtml.querySelector('.popup-close').addEventListener('click', hidePopup);
                    map.on('click', hidePopup);

                    function hidePopup() {
                        popupHtml.style.display = 'none';
                    }
                })

            });
            return () => map && map.remove();
        }
        asyncFn();

    }, [dispatch]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );
};

const Events = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(1);

    }, []);

    return (
        <div className={styles.cardDeck}>
            <div className={styles.blogItemDeck} style={{alignItems:"center"}}>
                <div style={{ width: '100%', height: 800 }}>
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default Events;