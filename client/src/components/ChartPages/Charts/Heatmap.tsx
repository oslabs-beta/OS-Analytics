// import { HeatmapProps } from "../../../../types";
import h337 from "heatmap.js";
import { useEffect } from "react";

/*******HEATMAP********/
const Heatmap = () => {
    useEffect(() => {
        // the element we are looking for
        const container = document.querySelector('.heatmapContainer');
        // create heatmap
        var heatmapInstance = h337.create({            
            container: container as HTMLElement
          });
        // now generate some random data
        var points = [];
        var max = 0;
        var width = 840;
        var height = 400;
        var len = 200;


        while (len--) {
            const val = Math.floor(Math.random()*100);
            max = Math.max(max, val);
            const point = {
            x: Math.floor(Math.random()*width),
            y: Math.floor(Math.random()*height),
            value: val
        };
        points.push(point);
    }
        // heatmap data format
        var data = {
            min: 0,
            max: max,
            data: points
        };
        // if you have a set of datapoints always use setData instead of addData
        // for data initialization
        heatmapInstance.setData(data);
    })

    return (
        <div>
            <div className="heatmapContainer" style = {{height:'500px', width: '500px'}}>
            </div>
        </div>
    )
}

export default Heatmap;