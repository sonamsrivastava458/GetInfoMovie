const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");
const accessKey = "dbf0de52"
const fetchvovieDetails= async(query) =>{
    try{
    let url = `http://www.omdbapi.com/?t=${query}&apikey=${accessKey}`;
    let res =  await fetch(url);

     if(!res.ok){
        throw new Error("Unable to fetch movie data");
     }
    let data =  await res.json();
    

    showmovieData(data);
}
catch(e){
    showErrorMessage("No movie found!!!")

}
}
const showmovieData =(data)=>{
    movieContainer.innerHTML ='';
    movieContainer.classList.remove("no-background");
    //Use destructuring assignment to extract propeties from data object....
     const{Title ,imdbRating,Genre,Released ,Runtime , Actors,Plot,Poster} = data;
     const movieElement = document.createElement('div');
     movieElement.classList.add("movie-info");
     movieElement.innerHTML = `<h2>${Title}</h2> <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

     const movieGenreElement = document.createElement('div');
     movieGenreElement.classList.add("movie-genre");

     Genre.split(",").forEach(element =>{
        const p = document.createElement("p");
        p.innerText = element;
        movieGenreElement.appendChild(p);
     });
     movieElement.appendChild(movieGenreElement);

     movieElement.innerHTML += `<p><strong>Released Date:</strong>${Released}</p>
     <p><strong>Duration:</strong>${Runtime}</p>
     <p><strong>Cast:</strong>${Actors}</p>
     <p><strong>Plot:</strong>${Plot}</p>`;

     //creating a div for movie poster..
     const moviePosterElement = document.createElement("div");
     moviePosterElement.classList.add("movie-poster");
     moviePosterElement.innerHTML = `<img src= ${Poster}/>`;
     movieContainer.appendChild(moviePosterElement);
     movieContainer.appendChild(movieElement);
     
}

const showErrorMessage = (msg) =>{
    movieContainer.innerHTML = `<h2>${msg}</h2>`;
    movieContainer.classList.add("no-background");

}
 searchForm.addEventListener("submit" , (e)=>{
    e.preventDefault(); //form not auto submit
     let movieName = inputBox.value.trim();
        if(movieName !== ''){
            showErrorMessage("Fetching movie information...")
       fetchvovieDetails(movieName);
        }
        else{
            showErrorMessage("Please enter movie name to fetch the movie details...");

        }
       });