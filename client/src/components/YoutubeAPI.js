import { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const YoutubeAPI = ({drink}) => {

  const [youtubeData, setYoutubeData] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(()=> {
    fetch(`http://localhost:3001/drinks/video/${drink.name}`)
    .then(response => response.json())
    .then(({ videoId }) => {
      setYoutubeData(videoId)
    });
  }, [drink])

  if (drink) {
    return (
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Youtube Video
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{drink.displayName} Cocktail - How to Make</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <iframe width="400" height="215" src={`https://www.youtube.com/embed/${youtubeData}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </Typography>
        </AccordionDetails>
      </Accordion>
      )
  }
}

export default YoutubeAPI;


