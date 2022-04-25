import React, { useState } from 'react'
import axios from 'axios';

function ImageUpload() {

    const information = () => {
		window.confirm("information: this is a camera contains animation to show the obfuscation process that is otherwise imperceptible to human eyes.")
	}
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/process",formData);
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div>
            <input type="file" onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
            <button onClick={information}>info</button>
        </div>
    );
}
    
export default ImageUpload;