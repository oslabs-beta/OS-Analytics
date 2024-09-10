// import { HeatmapProps } from "../../../../types";
import h337 from "heatmap.js";
import { useEffect } from "react";
import { NoKeywordChart } from "../../../../types";
import ScreenshotComponent from './ScreenshotComponent.tsx';


/*******HEATMAP********/
const Heatmap = ({ data }: NoKeywordChart) => {
    // length and width of viewport
    const screenHeight:number = 720;
    const screenWidth:number = 1280;

    // grab x,y coords from data
    const heatData: {'x':number, 'y': number, 'value': number}[] = data.map(point => ({"x":Math.round(point.x_coord * screenWidth), "y":Math.round(point.y_coord * screenHeight), "value": 1}));
    console.log(heatData);
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
            <div className="heatmapContainer" style = {{height:'720px', width: '1280px' 
            }}>
                <ScreenshotComponent />
            </div>
        </div>
    )
}

export default Heatmap;