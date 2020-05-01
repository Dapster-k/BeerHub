"use strict";

// Use to check if data exists in object
const notEmpty = value => typeof value !== "undefined";

// Get parameters from url
$.urlParam = function (name) {
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
        window.location.href
    );
    if (results === null) {
        return null;
    } else {
        return decodeURI(results[1]) || 0;
    }
};

function getBeer(beerId) {
    $.ajax({
        url: "/beer/getbeer?id=" + beerId,
        success: function (response) {
            console.log(response);

            let beer = JSON.parse(response)[0];
            let abv = beer.abv;
            let description = beer.description;
            let image = beer.labels;
            let tagline = beer.tagline;

            

            if (image) {
                $(".media-right").html(
                    `<a href="${image.large}"><img src="${image.medium}"></a>`
                );
            } else {
                $(".media-right").html(`<img src="/images/default_logo_gray.svg">`);
            }

            $("img").addClass("media-object");
            $(".media-object").css("height", "128px");

            $(".media-body").append(`<h4>${beer.name}</h4>`);

            if (tagline) {
                $(".media-body").append(`<h4>${tagline}</h4>`);
            }
            if (abv) {
                $(".media-body").append(`<h4>ABV: ${abv}%</h4>`);
            }

            $(".info").append(`<br>`);

            if (description) {
                $(".info")
                    .append(`<p><b>Beer Description</b></p>`)
                    .append(`<p>${description}</p><br>`);
            }
            
            

            $(".info")
                .append(`<br>`)
                .append(
                `<a href="/Favourites/Add?id=${beer.id}&name=${beer.name}" role="button">Add ${beer.name} To Fav</a>`
                );

            $("a[role='button']").addClass("btn btn-success");
        }
    });
}

/*
function getBrewery(breweryId) {
    $.ajax({
        url: "/home/getbrewery?id" + breweryId,
        success: function (response) {
            console.log(response);
        }
    });
}
function getFeatured() {
    $.ajax({
        url: "/home/getfeatured/",
        success: function (response) {
            console.log(response);
        }
    });
}
*/

$(document).ready(function () {
    //$(".logo-box").hide().fadeIn(1600);

    if ($(".info").length) {
        getBeer($.urlParam("id"));
    }

    // Modal pop up to confirm deletion of entry when icon is clicked
    $('#deleteConfirmation').on('click', '#deleteEntry', function (e) {
        let $modalDiv = $(e.delegateTarget);
        let id = $(this).data('recordId');
        console.log(id);
        $.post('/Entry/Remove?id=' + id).then(function () {
            $modalDiv.modal('hide');
            window.location.reload();
        });
    });

    $('#deleteConfirmation').on('show.bs.modal', function (e) {
        let data = $(e.relatedTarget).data();
        $('.title', this).text(data.recordTitle);
        $('#deleteEntry', this).data('recordId', data.recordId);
    });
});

