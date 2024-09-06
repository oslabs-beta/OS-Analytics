// import { HeatmapProps } from "../../../../types";
import h337 from "heatmap.js";
import { useEffect } from "react";
import { NoKeywordChart } from "../../../../types";

/*******HEATMAP********/
const Heatmap = ({ data }: NoKeywordChart) => {
    console.log('in heatmap component',data)
    // grab x,y coords from data
    const heatData: {'x':number, 'y': number, 'value': number}[] = data.map(point => ({"x":point.x_coord, "y":point.y_coord, "value": 1}));
    console.log('heatData',heatData)
    useEffect(() => {
        // the element we are looking for
        const container = document.querySelector('.heatmapContainer');
        // create heatmap
        const heatmapInstance = h337.create({            
            container: container as HTMLElement
          })
        // now generate some random data
        // var points = [];
        // var max = 0;
        // var width = 840;
        // var height = 400;
        // var len = 200;


        // while (len--) {
        //     const val = Math.floor(Math.random()*100);
        //     max = Math.max(max, val);
        //     const point = {
        //     x: Math.floor(Math.random()*width),
        //     y: Math.floor(Math.random()*height),
        //     value: val
        // };
        // points.push(point);
        // heatmap data format
        const points2: {min: number, max:number, data: {'x':number, 'y': number, 'value': number}[]} = {
            min: 1,
            max: 1,
            data: heatData
        };
        // if you have a set of datapoints always use setData instead of addData
        // for data initialization
        heatmapInstance.setData(points2);
    })

    // const containerWidth = Math.max(heatData.map(point => point.x))

    return (
        <div>
            <div className="heatmapContainer" style = {{height:'1500px', width: '1500px'}}>
            </div>
        </div>
    )
}

export default Heatmap;