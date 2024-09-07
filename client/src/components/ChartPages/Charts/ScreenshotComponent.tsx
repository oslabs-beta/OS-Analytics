import puppeteer from 'puppeteer';

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

    // const url = 'https://example.com';
    // const savePath = 'screenshot.png';
    // takeScreenshot(url, savePath)

    // const handleClick = () => {
    //     const url = 'https://example.com';
    //     const savePath = 'screenshot.png';
    //     takeScreenshot(url, savePath)
    //         .then(() => console.log('Screenshot process completed'))
    //         .catch(err => console.error('Error in screenshot process:', err));
    // };

    return (
        <div>
            {/* <button onClick={handleClick}>Take Screenshot</button> */}
        </div>
    )
}

export default ScreenshotComponent;