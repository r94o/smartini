import { useState, useEffect } from 'react'

const YoutubeAPI = ({drink}) => {

  const [youtubeData, setYoutubeData] = useState({});

  useEffect(()=> {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=how%20to%20make%20${drink}%20cocktail&type=video&key=AIzaSyBBcViTJ4hlUznphW_P-qQkXui22TGs8dM`)
    .then(response => response.json())
    .then(data => {
      const videoId = data.items[0].id.videoId
      setYoutubeData(videoId)
    });
  }, [])
  
  return (
    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${youtubeData}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    )
}


export default YoutubeAPI;


