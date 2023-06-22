import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {Clusterer, Placemark, YMaps, Map} from '@pbe/react-yandex-maps';
import {getMarkers} from "../api/markersAPI";

const MapYa = () => {
    const dispatch = useDispatch();
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchMarkers = async () => {
            const markers = await getMarkers();
            setResponse(markers);
        };
        fetchMarkers();
    }, []);

    return (
        <div className={styles.cardDeck}>
            <div className={styles.blogItemDeck} style={{alignItems:"center"}}>
                <div style={{ width: '100%', height: 800 }}>
                    {response && (<YMaps
                        query={{
                            load: "package.full",
                            apikey: 'debea9fc-f178-4e9a-8227-311f63cb4560'
                        }}>
                        <Map
                            width={1000}
                            height={800}
                            defaultState={{
                                center: [56.47294178407618, 84.9598073833667],
                                zoom: 14,
                            }}
                        >
                            <Clusterer
                                options={{
                                    preset: "islands#invertedVioletClusterIcons",
                                    groupByCoordinates: false,
                                }}
                            >
                                {response.map(markerItem => (
                                    <Placemark geometry={[parseFloat(markerItem.x_pos), parseFloat(markerItem.y_pos)]}
                                               properties={{
                                                   balloonContent:
                                                       '<div class="Map__balloon">' + markerItem.marker + "</div>"
                                               }}
                                    />
                                ))}
                            </Clusterer>
                        </Map>
                    </YMaps>)}
                </div>
            </div>
        </div>
    );
}

export default MapYa;