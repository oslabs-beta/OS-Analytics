import h337 from "heatmap.js";
import { useState, useEffect } from "react";
import { NoKeywordChart } from "../../../../types";
import ScreenshotComponent from './ScreenshotComponent.tsx';


/*******HEATMAP********/
const Heatmap = ({ data }: NoKeywordChart) => {
    // length and width of viewport
    const screenHeight:number = 720;
    const screenWidth:number = 1280;
    const [pageUrl, setPageUrl] = useState(""); // page we are looking at

    // rerender on data change
    useEffect(() => {
        // grab x,y coords from data
        const heatData: {'x':number, 'y': number, 'value': number}[] = data.map(point => ({
            "x":Math.round(point.x_coord * screenWidth), 
            "y":Math.round(point.y_coord * screenHeight), 
            "value": 1, 
            "radius": 10
        }));

        // check if heatmap already exists, if yes, remove existing heatmap
        if (document.querySelector('.heatmap-canvas')) {document.querySelectorAll('.heatmap-canvas')?.forEach(e => e.remove());}
        // the element we are looking for
        const container = document.querySelector('.heatmapContainer');
        // create heatmap
        const heatmapInstance = h337.create({            
            container: container as HTMLElement,
          })
        
        const points: {min: number, max:number, data: {'x':number, 'y': number, 'value': number}[]} = {
            min: 1,
            max: 1,
            data: heatData
        };
        
        heatmapInstance.setData(points);
        if (data.length > 0) setPageUrl(data['0']['page_url'])
    }, [data])

    return (
        <div>
            <h1 style = {{display: 'flex', justifyContent: 'center', marginBottom: '5px', padding:'20px'}}> Website Heatmap </h1>
            <div className="heatmapContainer" style = {{height:`${screenHeight}px`, width: `${screenWidth}px`}}>
                <ScreenshotComponent pageUrl = {pageUrl}/>
            </div>
        </div>
    )
}

export default Heatmap;