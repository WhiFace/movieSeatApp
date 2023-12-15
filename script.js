// 1. get all of the elements we want to manipulate
// container, seats that are not occupied, count, total, movieSelect

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');





//store movie data
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//get data from local storage to populate UI

const populateUi = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1 ){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
       movieSelect.selectedIndex =  selectedMovieIndex 
    }
}

populateUi();
// create a function that updates the count and total variable 
// when a seat is selected for a specific movie

const updateCounter = (e) => {
    //select all of the seats in the rows
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //store data in local storoage: select the seats, and map over each seats
    //then store it in local storage

    // use the spread operator to create an array of the selected seats 
    // then map over that array and get return an array of the seats selected at that index

const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
console.log(seatsIndex);
    // store seatIndex into localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //set the selected seats count to the number of seats selected
    const numOfSeatsSelected = selectedSeats.length;
    //change the inner text to reflect that count
    count.innerText = numOfSeatsSelected;
    //change the inner text to reflect the ticket price: 
    total.innerText = numOfSeatsSelected * ticketPrice
}

//create an eventListner that updates the ticket price when a different 
//movie is selected.
let ticketPrice = +movieSelect.value;

movieSelect.addEventListener('change', (e) =>{
    ticketPrice = +movieSelect.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateCounter();
})




// add an eventListiner to the container to listen 
// for clicks within the container. after that make the click specific
//to the seats that are not occupied. so we can select them

container.addEventListener('click', (e) =>{
    
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateCounter();
    }
})


updateCounter();