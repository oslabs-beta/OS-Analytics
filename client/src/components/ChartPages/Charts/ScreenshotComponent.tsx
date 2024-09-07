// import React from 'react';
import axios from 'axios';
import {backendUrl} from '../../../state/Atoms';

const ScreenshotComponent = () => {
    // const takeScreenshot = async (url: string, savePath: string): Promise<void> => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();

    //     try {
    //         await page.goto(url, { waitUntil: 'networkidle2' });
    //         await page.screenshot({ path: savePath });
    //         console.log(`Screenshot taken and saved to ${savePath}`);
    //     } catch (error) {
    //         console.error('Error taking screenshot:', error);
    //     } finally {
    //         await browser.close();
    //     }
    // };

    // // const url = 'http://localhost:3001';
    // // const savePath = 'screenshot.png';
    // // takeScreenshot(url, savePath)

    const handleClick = async () => {
        const url:string = 'http://localhost:3001'
        try {
            const response = await axios.get(`${backendUrl}/api/screenshot?url=${url}`);
            return response;
          } catch (error) {
            console.error('Error fetching screenshot:', error);
            throw error;
          }
        };

    return (
        <div>
            <button onClick={handleClick} style = {{height:'500px', width: '500px'}}>Take Screenshot</button>
        </div>
    )
}

export default ScreenshotComponent;