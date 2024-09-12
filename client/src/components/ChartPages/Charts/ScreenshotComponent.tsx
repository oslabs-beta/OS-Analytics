// import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {backendUrl} from '../../../state/Atoms';

/*******WEBSITE SCREENSHOT REQUEST********/
const ScreenshotComponent = ({pageUrl}:any) => {
    // store image src
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const webpage = pageUrl; // <--------- webpage to screenshot!!
    const token = localStorage.getItem("token")!; 
    
    // rerender on pageurl change
    useEffect(() => {
        // fetchImage takes in a webpage url and sets imagesrc state to be a decoded url image 
        const fetchImage = async () => {
            await console.log(webpage)
            try {
                // Make a GET request to fetch the image as a binary buffer
                const response = await axios.get(`${backendUrl}/api/screenshot?url=${webpage}`,
                    {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        responseType: 'arraybuffer'
                      });

                // Convert the ArrayBuffer to a base64-encoded string
                const base64String = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                // Construct a data URL for the image
                const imageSrc = `data:image/png;base64,${base64String}`;

                // Update the state with the image source
                setImageSrc(imageSrc);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        if (pageUrl !== '') fetchImage();
    }, [pageUrl]);

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt="Screenshot" style = {{height:'720px', width: '1280px',
                     padding: '20px', 
                }}/>
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ScreenshotComponent;