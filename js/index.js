let trending = document.querySelector("#trends");
let carousel = document.querySelector("#points");


let second = document.querySelector("#second");
let searchTerm = document.querySelector("#search").vlaue; //search
let category = document.querySelector("#category");      //selector


let secondtv = document.querySelector("#secondtv");
let searchTermtv = document.querySelector("#searchtv").vlaue; //search
let categorytv = document.querySelector("#categorytv");      //selector


var posts = [];
var trends =[];
let allSearch=[];
let tv=[];

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    $("#navbar").slideDown(1000);
    $(".nav-item").fadeIn(1000);
    $(".up").fadeOut(500);
  } else {
    $("#navbar").slideUp(1000);
    $(".nav-item").fadeOut(1000);
    $(".up").fadeIn(500);
    
  }
  prevScrollpos = currentScrollPos;
}


async function getTrendAPI() {
    var response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=9b3a5414c1198ebced482e012a215ab5`);

    var finalResult = await response.json();
    trends = finalResult;

    trends=finalResult.results;
       displayTrends();
}
async function getAPI() {
    let x = category.value
    if(category.value == "1")
    {
        x="now_playing";
    }
    var response = await fetch(`https://api.themoviedb.org/3/movie/${x}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1`);

    var finalResult = await response.json();
    posts = finalResult;

    posts=finalResult.results;
       display(posts);
}
async function getAPI_Link(linkApi) {
    var response = await fetch(linkApi);

    var finalResult = await response.json();
    allSearch = finalResult;
    allSearch=finalResult.results;
       display(allSearch);
}
(async function () {
    await getTrendAPI();
    await getAPI();
})();
function displayTrends(){
    let container_2=` `;
    let rects= ` `;
    let names=``;
    let stars=``;
    rects =`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active circle" aria-current="true" aria-label="Slide 1" ></button>`


    for(var i =0 ;i<trends.length-1 ;i++)
    {
        stars=``;
        var number = trends[i].vote_average 
        var rounded = Math.trunc(number) 
        //console.log(rounded);
        for(var u=0;u<rounded;u++)
        {
            stars+=` <i class="fa-solid fa-star mx-1"></i>`
        }
        if(number%10 !=0)
        {
            stars+=` <i class="fa-solid fa-star-half"></i>`
        }
        if(i==0)
        {
            container_2+=
            `
            <div class="carousel-item active mb-10 w-100 text-white justify-content-around">
                <div class="row">
                    <div class="  col-lg-8 col-md-12 d-flex justify-content-center align-items-center">

                        <div class="p-50">
                            <h2 class="mb-2 fw-bolder fa-2x name-color">${trends[i].title}</h2>
                            <p class="desc mb-4">${trends[i].overview}</p>

                            <div class="d-flex text-gold">
                            ${stars}
                            </div>   

                        </div>
                                        
                    </div>

                    <div class=" col-lg-4 col-md-12">
                    <img class="d-block w-75 m-auto my-2" src="https://image.tmdb.org/t/p/w500${trends[i].poster_path}" alt="First slide">
                    </div>
                </div>

            </div>
                
                
            `
            names+= `
                    <div class="carousel-item  active">
                         <h3>${trends[i].title}</h3>
                    </div>
            
            `
        }
        else
        {
            container_2+=
            `
               

            <div class="carousel-item  mb-10 w-100 text-white justify-content-around">
                <div class="row">

                    <div class="  col-lg-8 col-md-12 d-flex justify-content-center align-items-center">
                        <div class="p-50">
                            <h2 class="mb-2 fw-bolder fa-2x name-color">${trends[i].title}</h2>
                            <p class="desc mb-4">${trends[i].overview}</p>

                            <div class="d-flex text-gold">
                            ${stars}
                            </div>   
                        </div>                 
                    </div>

                    <div class=" col-lg-4 col-md-12">
                          <img class="d-block w-75 m-auto my-2" src="https://image.tmdb.org/t/p/w500${trends[i].poster_path}" alt="First slide">
                    </div>


                </div>

            </div>
            `
            rects+=` <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}" class="circle"></button>`
               
            names+= `
            <div class="carousel-item  active">
                 <h3>${trends[i].title}</h3>
            </div>
    
    `
        }
       
    }
    trending.innerHTML=container_2;
    carousel.innerHTML=rects;
   // tName.innerHTML=names;
}
function display(array)
{
    let container=` `;

    for(var i =0 ;i<array.length ;i++)
    {
        var number = array[i].vote_average 
        var rounded = Math.round(number * 10) / 10
        if(array[i].poster_path == null)
        {
            continue;
        }
        else
        {
            container+=
            `<div class="position-relative col-lg-3 col-md-4 col-sm-6 mb-5 ">

                <div class=" position-relative  poster">

                      

                    <img src="https://image.tmdb.org/t/p/w500${array[i].poster_path}" alt="" class="w-100 " >
                    <div class="film-info text-white w-100 p-4 m-auto">
                        <h5>${array[i].title}</h5>
                        <p>${array[i].overview}</p>
                    </div>

                 </div>


              <div class="position-absolute rate d-flex justify-content-center align-items-center name-color">
              <div class=" ratein  d-flex align-items-center justify-content-center reteIcon position-relative">
                <i class="fa-solid fa-star position-absolute"></i>
                
                <h4 class="num">${rounded}</h4>
              </div>
            </div>
            </div>
            `
        }
        
    }
    second.innerHTML=container;
}
function search(searchTerm , array){
    var searchResult=[];

    if(searchTerm == "")
    {
        searchResult=posts;
    }

    else{
        for(var i=0 ; i<array.length ;i++)
        {
            if(String(array[i].title).toLowerCase().includes(String(searchTerm.toLowerCase())))
            {
                searchResult.push(array[i]);
            }
        }
    }
  
    
     display(searchResult);
}
function searchAll(searchTerm){
    if(searchTerm == "")
    {
        //allSearch=posts;
        display(posts);
    }
    else
    {
        allSearch=null;
        let apiURL = `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${searchTerm}`
        getAPI_Link(apiURL)
    }
    

}





async function getAPItv() {
    let y = categorytv.value
    if(categorytv.value == "1")
    {
        y="popular";
    }
    var response = await fetch(`https://api.themoviedb.org/3/tv/${y}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1`);

    var finalResult = await response.json();
    tv=finalResult.results;
    displaytv(tv);
}
(async function () {
    await getAPItv("popular");
})();
async function getAPI_Linktv(linkApi) {
    var response = await fetch(linkApi);

    var finalResult = await response.json();
    allSearch = finalResult;
    allSearch=finalResult.results;
    displaytv(allSearch);
}


function displaytv(array)
{
    let container=` `;

    for(var i =0 ;i<array.length ;i++)
    {
        var number = array[i].vote_average 
        var rounded = Math.round(number * 10) / 10
        if(array[i].poster_path == null)
        {
            continue;
        }
        else
        {
            container+=
            `<div class="position-relative col-lg-3 col-md-4 col-sm-6 mb-5">
            <div class=" position-relative  poster">
                <img src="https://image.tmdb.org/t/p/w500${array[i].poster_path}" alt="" class="w-100 ">
                <div class="film-info text-white w-100 p-4 m-auto">
                  <h5>${array[i].name}</h5>
                  <p>${array[i].overview}</p>
                </div>
              </div>
              <div class="position-absolute rate d-flex justify-content-center align-items-center name-color">
              <div class=" ratein  d-flex align-items-center justify-content-center reteIcon position-relative">
                <i class="fa-solid fa-star position-absolute"></i>
                
                <h4 class="num">${rounded}</h4>
              </div>
            </div>
            </div>
            `
        }
        
    }
    secondtv.innerHTML=container;
}

function searchtv(searchTermtv , array){

    if(searchTermtv=="")
    {
        displaytv(tv);
    }
  
    else
    {
        var searchResult=[];
        for(var i=0 ; i<array.length ;i++)
        {
            if(String(array[i].name).toLowerCase().includes(String(searchTermtv.toLowerCase())))
            {
                searchResult.push(array[i]);
            }
        }
        displaytv(searchResult);
    }
    
    
     
}

function searchAlltv(searchTerm){
    if(searchTerm=="")
    {
        displaytv(tv);

    }
    else
    {
        allSearch=null;
        let apiURL = `https://api.themoviedb.org/3/search/tv?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${searchTerm}`
        getAPI_Linktv(apiURL)
    }
   

}



$(document).ready(function(){

    $(".loading-screen .sk-folding-cube").fadeOut(1000 , function(){
        $("body").css("overflow","auto");
        $(".loading-screen").fadeOut(1000 ,function()
        {
            
            $(".loading .sk-folding-cube").fadeOut(1000, function()
            {
                $(".loading ").fadeOut(1000)
            }); 
        })
    })
   
}
)




$('.search-movie').on('input', function() {
   $('.loading-movies , .loading-movies .sk-folding-cube ').css("display", "block")

    function fading()
    {
        $(".loading .sk-folding-cube").fadeOut(600, function()
        {
            $(".loading ").fadeOut(600)
        }); 
    }
    setTimeout(fading, 600);
   
})

$('.search-tv').on('input', function() {
    $('.loading-tv , .loading-tv .sk-folding-cube ').css("display", "block")
 
     function fading()
     {
         $(".loading .sk-folding-cube").fadeOut(600, function()
         {
             $(".loading ").fadeOut(600)
         }); 
     }
     setTimeout(fading, 600);
    
 })



 $('#category').on('change', function() {
    $('.loading-movies , .loading-movies .sk-folding-cube ').css("display", "block")
 
     function fading()
     {
         $(".loading .sk-folding-cube").fadeOut(600, function()
         {
             $(".loading ").fadeOut(600)
         }); 
     }
     setTimeout(fading, 600);
    
 })

 $('#categorytv').on('change', function() {
    $('.loading-tv , .loading-tv .sk-folding-cube ').css("display", "block")
 
     function fading()
     {
         $(".loading .sk-folding-cube").fadeOut(600, function()
         {
             $(".loading ").fadeOut(600)
         }); 
     }
     setTimeout(fading, 600);
    
 })
 