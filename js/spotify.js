var item_array = [];
var counter = 0;
// Variables
var $overlay = $('#overlay');
var $overlay_content = $('#overlay-content');
var $img = $('#overlay-img');
var $title = $('#title');
var $artist = $('#artist');
var $popularity = $('#popularity');
var $track_number = $('#track-number');
var $linktofile = $('#linktofile');
var $prev_btn = $('#btn-prev');
var $next_btn = $('#btn-next');
// Functions
var spotifyResponse = function(data) {
  $.each(data.tracks, function(i, track) {
    console.log("each data started");
    var data = {
      image: track.album.images[0].url,
      title: track.name,
      album: track.album.name,
      popularity: track.popularity,
      track_number: track.track_number,
      artist: track.artists[0].name,
      linktofile: track.external_urls.spotify,
      id: i
    };
    item_array.push(data);
    console.log("each data ended");
  });
  update_gallery();
};

function get_next_item() {
  if (counter < item_array.length - 1 && counter >= 0) {
    counter++;
  } else {
    counter = 0;
  }
  update_overlay();
}

function get_prev_item() {
  if (counter <= item_array.length - 1 && counter > 0) {
    counter--;
  } else {
    counter = item_array.length - 1;
  }
  update_overlay();
}

function update_overlay() {
  console.log("update overlay started");
  $img.attr("src", "" + item_array[counter].image + "");
  $img.attr("alt", item_array[counter].title);
  console.log("image source has been added");
  $title.html(item_array[counter].title);
  $artist.html(item_array[counter].artist);
  $track_number.html('Track Number <strong>' + item_array[counter].track_number + '</strong>');
  $popularity.html('Popularity: <strong>' + item_array[counter].popularity + '</strong> / 100');
  $linktofile.attr("href", "" + item_array[counter].linktofile + "");
  console.log("update overlay ended");

  $overlay.show();
  $overlay_content.fadeIn();
}

function update_gallery() {
  var track_HTML = '';
  console.log("update gallery started");
  $.each(item_array, function(i, item) {
    console.log("each item data started");
    track_HTML += '<li class="card"' + '" id="' + item.id + '"">';
    track_HTML += '<a href="' + item.linktofile + '" title="' + item.title + '">';
    track_HTML += '<img class="thumb" src="' + item.image + '" alt="' + item.title + '" title="' + item.title + '"/>';
    track_HTML += '<p>' + item.title + '</p>';
    track_HTML += '</a>';
    track_HTML += '</li>';
  });
  console.log("each item data ended");
  $('#list').html(track_HTML);
}
// on gallery item click function
$(".list-wrapper").on("click", ".card", function(event) {
  event.preventDefault();
  var unique_id = $(this).attr("id");
  for (var i = 0; i < item_array.length; i++) {
    if (item_array[i].id == unique_id) {
      counter = i;
    }
  }
  // update overlay
  update_overlay();
  // Show overlay
  $overlay.show();
});
//on next button
$next_btn.click(function(event) {
  event.preventDefault();
  event.stopPropagation();
  get_next_item();
});
//on previous button
$prev_btn.click(function(event) {
  event.preventDefault();
  event.stopPropagation();
  get_prev_item();
});
// on close button
$overlay.click(function() {
  //hide overlay
  $overlay.fadeOut();
});
$(document).ready(function() {
  $('#overlay').hide();
  console.log("overlay hidden");
  var spotifyAPI = "https://api.spotify.com/v1/artists/0YrtvWJMgSdVrk3SfNjTbx/top-tracks";
  var spotifyOptions = {
    country: 'US',
    limit: 20
  };
  // $.getJSON(url, data, callback)
  $.getJSON(spotifyAPI, spotifyOptions, spotifyResponse);
});