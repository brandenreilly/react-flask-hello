import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import SpotifyPlayer from "react-spotify-web-playback";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const songPreview = useRef(null)
	useEffect(()=>{
		handleVolume()
	},[])
	const handleVolume = () => {
		songPreview.volume = 0.3
	}
	const testvar = "3GCL1PydwsLodcpv0Ll1ch"

	return (
		<div className="text-center mt-5">
			<button className="btn btn-dark" onClick={()=>{actions.callAPI()}}>API CALL ONCLICK</button>
			<iframe ref={songPreview} style={{borderRadius: "12px"}} src={`https://open.spotify.com/embed/track/${testvar}?utm_source=generator&theme=0`} width="75%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
