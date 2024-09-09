// import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import {backendUrl} from '../../../state/Atoms';

const ScreenshotComponent = () => {
    // store image src
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    // need to pull this from the db
    const webpage:string = 'http://localhost:3001'

    useEffect(() => {
        // fetchImage takes in a webpage url and sets imagesrc state to be a decoded url image 
        const fetchImage = async () => {
            try {
                // Make a GET request to fetch the image as a binary buffer
                const response = await axios.get(`${backendUrl}/api/screenshot?url=${webpage}`,
                    {
                        headers: {
                          Authorization: `Bearer eyJraWQiOiJ3dHNibmZ6eU5sN1BIT1R3QTVRVnU0STVMTGh6QWpEckdvejFLM2xHSFRFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3MWViNzVlMC1jMDIxLTcwNDYtM2Y1MS1lMDFiYTg2M2JhNjMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfbVcwMVpKYVVVIiwiY29nbml0bzp1c2VybmFtZSI6IjcxZWI3NWUwLWMwMjEtNzA0Ni0zZjUxLWUwMWJhODYzYmE2MyIsIm9yaWdpbl9qdGkiOiJmODczOTM2MC0zYzUwLTRiZTgtYWE0ZS00YmZmNmQyN2U3MTMiLCJhdWQiOiI1YWExbjFnN2RxZ3FsdmoydGc3cGswY2Y4YyIsImV2ZW50X2lkIjoiYjQwMDU0OWYtZjNkNi00OGY0LThhOGMtMjQyMjZlNzAyZWQyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MjU5MTM2NDMsImV4cCI6MTcyNjAwMDA0MywiaWF0IjoxNzI1OTEzNjQzLCJqdGkiOiIxNjQ5OTNjYi04NjY4LTRkNjUtYTU3YS0xYmMyMzFlOTQ4ZjIiLCJlbWFpbCI6InRlc3QwQDUuY29tIn0.asraxe0JtXiP2518KW4wQmz6-eWwsZdaPsvHMz2DJ-lyeWDf55-ULgC3G5Ug7sgkxbTBhfeiSVNodyLnl2rX7u6Mn6P8ThljJPHekTZ1fJpQFCCv_Nu212dDnsY4Ze6OsOepbxZA7_DsbnXAJ22Ud05MkAYvfvOHocY4stt76EjZiVQKFpLOa1MjZvRWovUbRhqV8Uq5V_XOGfRONCTbEsNGjhJYqSVdJZEUqSaIxptaJNNyrLpfC5SFd6pm7MkaAJdD6c339OakCQJ08ZNaeIhBQTQCH3hsUxG4D4sg_J7PExUzAwOWNyFs_OW2Wfdr_eNyZfDto3UeD088JSfVhQ`,
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

        fetchImage();
    }, []);

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt="Screenshot" style = {{'border': '5px solid red'}}/>
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ScreenshotComponent;