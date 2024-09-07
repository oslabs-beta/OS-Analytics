// import { HeatmapProps } from "../../../../types";
import h337 from "heatmap.js";
import { useEffect } from "react";
import { NoKeywordChart } from "../../../../types";
import ScreenshotComponent from './ScreenshotComponent.tsx';


/*******HEATMAP********/
const Heatmap = ({ data }: NoKeywordChart) => {
    // grab x,y coords from data
    const heatData: {'x':number, 'y': number, 'value': number}[] = data.map(point => ({"x":point.x_coord, "y":point.y_coord, "value": 1}));
    useEffect(() => {
        // the element we are looking for
        const container = document.querySelector('.heatmapContainer');
        // create heatmap
        const heatmapInstance = h337.create({            
            container: container as HTMLElement
          })
        
        const points: {min: number, max:number, data: {'x':number, 'y': number, 'value': number}[]} = {
            min: 1,
            max: 1,
            data: heatData
        };
        
        heatmapInstance.setData(points);
    })

    return (
        <div>
            <div className="heatmapContainer" style = {{height:'1500px', width: '1500px'}}>
            <ScreenshotComponent />
            </div>
        </div>
    )
}

export default Heatmap;