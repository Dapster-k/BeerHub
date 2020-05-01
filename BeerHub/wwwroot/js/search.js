'use strict';
function searchBeers(query, pageNum) {
    $.ajax({
        url: "/home/searchbeers?beer=" + query + "&pageNum=" + pageNum,
        success: function (response) {
            
            console.log(response);

            let beers = JSON.parse(response);
            console.log(Object.keys(beers).length);
            let numResults = 10//response.totalResults;
            //let pages = 1//response.numberOfPages;
            let currentPage = 0;
            if (pageNum)
                currentPage = parseInt(pageNum);//response.currentPage;

            // Create pager component if returning more than 50 results
            if (currentPage > 0) {
                $('.pager').append(`<li class="previous"><a href="?beer=${query}&pageNum=${parseInt(currentPage)-1}">&larr; Previous</a></li>`);
                //console.log("beer = ${"+ query +"} & pageNum=${"+ currentPage - 1+"}");
            }
            if (Object.keys(beers).length == 10) {
                $('.pager').append(`<li class="next"><a href="?beer=${query}&pageNum=${parseInt(currentPage)+1}">Next &rarr;</a></li>`);
            }

            // Display number of results and page number
            if (beers) {
                $('.results')
                    .append(`<p><i>Displaying ${Object.keys(beers).length}</i></p>`)
                    .append("<br>");
            } else {
                $('.results').append("<i>No search results.</i>");
            }

            //let resultsOnPage = Object.keys(beers).length;
            for (let i = 0; i < Object.keys(beers).length; i++) {

                let name = beers[i].name;
                let tagline = beers[i].tagline;
                let abv = beers[i].abv;
                let description = beers[i].description;
                let beerId = beers[i].id;
                let image = beers[i].image_url;

                $('.results').append(`<b><a href="/Beer?id=${beerId}">${name}</a></b><br>`);
                
             
               /* $('.results').append(`<img
                    className="item-favorite-icon"
                    src="/images/icons8-beer-96.png"
                    alt="Favorite Beer Icon"
                    key={i.id}
                    onClick={() => this.props.itemFavorited(item)}
                />`);*/
                // Use placeholder image if label not available
                if (image) {
                    $('.results').append(`<img src="${image}">`);
                } else {
                    $('.results').append(`<img src="/images/default_logo_gray.svg">`);
                }

                $('img')
                    .addClass('pull-right')
                    .height(64);

                // Link to individual beer page will implement in future
                if (tagline) {
                    $('.results').append(`<b>${tagline}</b><br>`);
                }
                if (abv) {
                    $('.results').append(`<b>ABV: ${abv}%</b><br>`);
                }
               

                $('.results').append("<br>");

                if (description) {
                    $('.results')
                        .append(description)
                        .append("<br>");
                }
                
                
                $('.results').append("<hr>");
                $(".results")
                    .append(`<br>`)
                    .append(
                        `<a href="/Favourites/Add?id=${beerId}&name=${name}" role="button">Add To Favourites</a>`
                    );

                $("a[role='button']").addClass("btn btn-success");
                $('.results').append("<hr>");
            }
        }
        
    });
}

$(document).ready(function () {
    searchBeers($.urlParam('beer'), $.urlParam('pageNum'));
});


