var searchYouTube = (options, callback, errorCallback) => {
  // TODO
  options['part'] = 'snippet';
  options['videoEmbeddable'] = true;
  options["type"] = "video";

  $.ajax({
    timeout: 5000,
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: options,
    contentType: 'application/json',
    success: callback,
    error: errorCallback || function(error) {
      console.error('Youtube: Failed to fetch messages', error);
    }
  });
};

export default searchYouTube;
