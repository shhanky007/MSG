import * as React from "react"
import Svg, { Path, G, Circle, Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Feedback(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18">
    <Path id="feedback" d="M17.3,9.447c-.133-.355,3.539-3.634,1.4-6.291-.5-.621-2.2,2.975-4.615,4.6-1.332.9-4.431,2.81-4.431,3.867v6.842c0,1.271,4.914,2.617,8.648,2.617,1.369,0,3.352-8.576,3.352-9.938S17.434,9.8,17.3,9.447Zm-8.648.1a2.964,2.964,0,0,0-3,3.123v4.848a2.865,2.865,0,0,0,3,3.021c.657,0-1-.572-1-2.26V11.9C7.656,10.133,9.312,9.542,8.656,9.542Z" transform="translate(-5.656 -3.084)" fill="#2b2b2b"/>
  </Svg>
  

  )
}

export default Feedback

