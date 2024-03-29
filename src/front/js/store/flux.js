const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			api_return: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			callAPI: () => {
				const opts = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer BQAEMjzHv7CbjA_iNr63wCagXgUBflsdSULEPDc4z8OJxdDXlSBLc9Gb8LPyhov2YLTv_LydpoKWWfec7GeTjTkZ4Q-tox7eSMuI27v1BK97CYFkLvQ'
					},
				}
				fetch("https://api.spotify.com/v1/search?q=Sleepy%20Hollow&type=track&market=US", opts)
				.then(resp => {if(resp.ok) resp.json()})
				.then(data => setStore({api_return: data.tracks}))
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
