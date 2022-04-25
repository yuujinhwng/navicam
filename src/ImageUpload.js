import React, { useState } from 'react'
import axios from 'axios';

function ImageUpload() {

    const information = () => {
		window.confirm("Navi\nIris recognition is considered by far the most accurate modality of biometric identification. It is 1,000 times less error-prone than fingerprint.\n" +
            "stays constant through your entire lifetime.\n\nBut this is a double-edged sword:\n\tOnce your original iris pattern is exposed, it is compromised forever.\n\t" +
            "What if your iris template is extractable from images publicly available on the internet?\n\t" +
            "We built a system for visually imperceptible obfuscation (i.e., an intentional destruction) of iris biometric data.")
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
            <input id='file' type="file" class="hidden" onChange={saveFile} />
            <button id='upload'onClick={uploadFile}></button>
            <button id='info' onClick={information}></button>
        </div>
    );
}
    
export default ImageUpload;