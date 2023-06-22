import {useEffect} from "react";
import {load} from "@2gis/mapgl";

export const Map = () => {
    const [_, setMapInstance] = React.useContext(MapContext);

    useEffect(() => {
        let map;
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [55.31878, 25.23584],
                zoom: 13,
                key: 'Your API access key',
            });
        });
        // Сохраняем ссылку на карту
        setMapInstance(map);
        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );
};