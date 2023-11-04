import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from "react-slick";
import Series from "../.././json/series.json"
import Movies from "../.././json/movies.json"
import TrailerWatch from './TrailerWatch';
const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  rtl: true,
  arrows: false
};
function ratSettings(ratNumber) {
  const ratRound = Math.round(Number(ratNumber / 2));
  let rat = 5 - ratRound;
  let ratSvgs = [];

  for (let i = 0; i < ratRound; i++) {
    const ratSVG = (
      <svg key={i} className="w-4 h-4 text-yellow-300 mr-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
    ratSvgs.push(ratSVG);
  }
  for (let j = ratSvgs.length; j < 5; j++) {
    let svg = (<svg key={j} className="w-4 h-4 text-gray-300 mr-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>);
    ratSvgs.push(svg);
  }
  return ratSvgs;
}
function idConverter(bool, data) {
  let id = "";
  for (let i = 0; i < data.length; i++) {
    (bool ? Series : Movies).filter(item => {
      if (item.dataID == data[i]) {
        id += `${item.name}, `
      }
    })

  }
  return id.slice(0,id.length-2)
}
function SliderBanner({ toggle }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  // api
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
  const TMDB_API_KEY_HEAD = '&api_key='
  const TMDB_API_KEY = 'bf3cd4782b9e4403874602094b3d319c'
  const TMBDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original'
  const TMDB_NOW_POPULAR_MOVIES_KEY = '/discover/movie?sort_by=popularity.desc'
  const TMDB_NOW_YEAR_BEST_TV_LIST = '/discover/tv?sort_by=popularity.desc'
  useEffect(() => {
    const fetchData = async () => {
      try {
        setList([]); // toggle değiştiğinde listeyi temizle
        const response = await axios.get(`${TMDB_BASE_URL}${toggle ? TMDB_NOW_YEAR_BEST_TV_LIST : TMDB_NOW_POPULAR_MOVIES_KEY}${TMDB_API_KEY_HEAD}${TMDB_API_KEY}`);
        const data = response.data.results;
        // Mevcut list verilerini bir kopyasını alın
        const updatedList = [...list];
        // Yeni verileri kopya üzerine ekleyin
        for (let i = 0; i < 5; i++) {
          updatedList.push(data[i]);
        }
        // setState ile güncel veriyi ayarlayın
        setList(updatedList);
        console.log(updatedList);
        setLoading(false);
      } catch (error) {
        console.error('API hatası:', error);
      }
    };
  
    fetchData();
  }, [toggle]);
  
  

  if (loading) {
    return (
      <div role="status">
        <svg aria-hidden="true" className="w-60 h-60 m-auto mt-14 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div>

      <div className='absolute top-0 left-0 max-w-full min-w-full h-[800px] max-h-[800px] min-h-[800px] cursor-pointer'>
        <Slider {...settings}>
          {
            list.map((data, index) => (
              <div className='relative' key={index}>
                <img className='-z-50 w-full max-h-[800px] aspect-video object-cover blur-sm brightness-25' src={`${TMBDB_IMAGE_URL}${data.backdrop_path}`} alt={data.title} />
                <div className='absolute z-50 top-0 left-0 flex flex-col mt-[100px] px-24 gap-4 justify-between  md:flex-row'>
                  <div className='w-[300px] h-[450px] bg-gray-100 !object-cover '>
                    <img className='!object-cover w-[300px] h-[450px]' src={`${TMBDB_IMAGE_URL}${data.poster_path}`} alt={toggle ? data.name : data.title} />
                  </div>
                  <div className='flex flex-col !text-white w-[600px] px-9'>
                    <p className='text-6xl font-normal'>{toggle ? data.name : data.title}</p>
                    <p className='text-4xl mt-4 font-extralight'>{(toggle ? new Date(data.first_air_date).getFullYear().toString() : new Date(data.release_date).getFullYear().toString())}</p>
                    <p className='mt-2 font-medium text-2xl flex flex-row gap-1'>{
                      idConverter(toggle, data.genre_ids)
                    }</p>
                    <div className="flex items-center">
                      {
                        ratSettings(data.vote_average)
                      }

                      <p className="ml-2 text-sm font-medium text-gray-500">{Math.round(Number(data.vote_average) / 2)} out of 5</p>
                    </div>
                    <p className='mt-8'>{data.overview}</p>
                  </div>
                  <div className="text-white">
                    {/* <TrailerWatch 
                    bool={toggle}
                    title={toggle ? data.name : data.title}
                    /> */}
                  </div>
                </div>
              </div>
            ))


          }
        </Slider>

      </div>
    </div>
  )
}

export default SliderBanner




