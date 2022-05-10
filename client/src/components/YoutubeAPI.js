import { useState, useEffect } from 'react'

const YoutubeAPI = ({drink}) => {

  const [youtubeData, setYoutubeData] = useState();

  useEffect(()=> {
    fetch(`http://localhost:3001/drinks/video/${drink.name}`)
    .then(response => response.json())
    .then(({ videoId }) => {
      setYoutubeData(videoId)
    });
  }, [drink])

  if (drink) {
    return (
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${youtubeData}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      )
  }
}

export default YoutubeAPI;


