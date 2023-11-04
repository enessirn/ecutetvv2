import { useEffect, useState } from "react";
import axios from "axios";
function TrailerWatch({ bool, title }) {
  const [idVideo, setIdVideo] = useState([]);
  const options = {
    method: 'GET',
    url: 'https://simple-youtube-search.p.rapidapi.com/search',
    params: {
      query: `${title}+watch+trailer`,
      type: 'video',
      safesearch: 'false'
    },
    headers: {
      'X-RapidAPI-Key': 'ac1011830emsh4c4f97cbec1fc73p10dbc3jsnff79a19d0613',
      'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com'
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setIdVideo(response.data.results[0].id)
      } catch (error) {
        console.error('Youtube API hatası :', error);
      }
    };

    fetchData();
  }, [bool]);
  return (

    <>
      <iframe className="rounded-2xl" type="text/html" width="720" height="405"
        src={`https://www.youtube.com/embed/${idVideo}?controls=0&disablekb=1&fs=0&modestbranding=1&color=white&iv_load_policy=3`}
        frameBorder="0" allowfullscreen />
    </>
  )
}

export default TrailerWatch
/*
ORIGINAL LINK
`https://youtube.googleapis.com/youtube/v3/search?q=${title}%20trailer&key=${yt_key}`
*/