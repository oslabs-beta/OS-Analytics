import puppeteer from "puppeteer"
import { Request, Response, NextFunction } from "express"


const puppeteerController = {
    // take screenshot of user's website 
    async takeScreenshot(req: Request, res: Response, next: NextFunction) {
        try{
            const homepage_url:any = req.query.url // URL is given by the "user" (your client-side application)
        
            // launch headless browser, navigate to webpage, and take screenshot
            const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']}); 
            const page:any = await browser.newPage();

            // Set the viewport (width, height, and optional device scale factor)
            await page.setViewport({
                width: 1280,  // Set the desired width
                height: 720,  // Set the desired height
                deviceScaleFactor: 1 // Adjust for HiDPI screens, default is 1
            });

            // No timeout when generating
            page.setDefaultNavigationTimeout(0);

            await page.goto(homepage_url); 
            const screenshotBuffer = await page.screenshot();
            res.locals.screenshotBuffer = await screenshotBuffer;
            await browser.close();
            return next();
        }
        catch(err) {
            const error = err as Error;
            return next({
                message: "Error in takeScreenshot: " + error.message,
                log: err,
             });
        }
        // const query:any = req.query.url
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto(query); // URL is given by the "user" (your client-side application)
        // const screenshotBuffer = await page.screenshot();
        
        // // Respond with the image
        // res.writeHead(200, {
        //     'Content-Type': 'image/png',
        //     'Content-Length': screenshotBuffer.length
        // });
        // res.end(screenshotBuffer);
        
        // await browser.close();
        }
}

export default puppeteerController;