import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUpload from "./ImageUpload";
import axios from 'axios';
// import { axiosClient } from "use-axios-client";
import React, { useRef, useEffect, useState } from "react";

function App() {

	const videoRef = useRef(null);
	const photoRef = useRef(null);

	const [hasPhoto, setHasPhoto] = useState(false);

	const getVideo = () => {
		navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080}})
		.then(stream => {
			let video = videoRef.current;
			video.srcObject = stream;
			video.play();
		})
		.catch(err => {
			console.error(err);
		})
	}

	const takePhoto = () => {
		const width = 414;
		const height = width / (16/9);

		let video = videoRef.current;
		let photo = photoRef.current;

		photo.width = width;
		photo.height = height;

		let ctx = photo.getContext('2d');
		ctx.drawImage(video, 0, 0, width, height);
		setHasPhoto(true);
	}

	const closePhoto = () => {
		let photo = photoRef.current;
		let ctx = photo.getContext('2d');
		setHasPhoto(false);

		ctx.clearRect(0, 0, photo.width, photo.height);
	}

	const sendPhoto = () => {
		const canvas= document.getElementById('my-canvas');
		canvas.toBlob(function(blob) {
			const newImg = document.createElement('img'),
			url = URL.createObjectURL(blob);
		newImg.onload = function() {
			URL.revokeObjectURL(url);
		};
		newImg.src = url;
		const ress = axios.post("http://127.0.0.1:8000/api/process", url);
            console.log(ress);
		});
	}

	// const ImageComponent = (imageIds) => {
	// 	const [images, setImages] = React.useState([])
	  
	// 	React.useEffect(() => {
	// 	  async function getImage (id) {
	// 		let imageBlob
	// 		try {
	// 		  imageBlob = (await axiosClient.get(`/api/image/${id}`, { responseType: 'blob' })).data
	// 		} catch (err) {
	// 		  return null
	// 		}
	// 		return URL.createObjectURL(imageBlob)
	// 	  }
	// 	  async function getImages () {
	// 		const imageArray = []
	// 		for (const id of imageIds) {
	// 		  imageArray.push(await getImage(id))
	// 		}
	// 		setImages(imageArray)
	// 	  }
	  
	// 	  getImages()
	// 	}, [imageIds])
	  
	// 	return images.map((img, i) => {
	// 	  return <img src={img} alt={`image-${i}`} key={i} />
	// 	})
	//   }

	useEffect(() => {
		getVideo();
	}, [videoRef])

  return (
	<div className="App">
		<div className="upper">
			<ImageUpload/>
		</div>
		<div className="camera">
			<video ref={videoRef}></video>
		  	<button id='takePhoto' onClick ={takePhoto}></button>
	  	</div>
	  	<div className={'result ' + (hasPhoto ? 'hasPhoto': '')}>
		  	<canvas id='my-canvas' ref={photoRef}></canvas>
		  	<button id='closePhoto' onClick ={closePhoto}></button>
			<button id='send' onClick={sendPhoto}></button>
			{/* <ImageComponent/> */}
		</div>
	</div>
  );
}

export default App;
