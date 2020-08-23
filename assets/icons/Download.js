import * as React from "react"
import Svg, { Path, G, Circle, Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Download(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="15.976" height="15.976" viewBox="0 0 15.976 15.976">
      <Path id="download" d="M6.74,0h2.5a.747.747,0,0,1,.749.749V5.991h2.736a.623.623,0,0,1,.44,1.064L8.415,11.8a.6.6,0,0,1-.852,0L2.811,7.055a.623.623,0,0,1,.44-1.064h2.74V.749A.747.747,0,0,1,6.74,0Zm9.236,11.732v3.495a.747.747,0,0,1-.749.749H.749A.747.747,0,0,1,0,15.227V11.732a.747.747,0,0,1,.749-.749H5.326l1.529,1.529a1.6,1.6,0,0,0,2.265,0l1.529-1.529h4.577A.747.747,0,0,1,15.976,11.732Zm-3.869,2.746a.624.624,0,1,0-.624.624A.626.626,0,0,0,12.107,14.478Zm2,0a.624.624,0,1,0-.624.624A.626.626,0,0,0,14.1,14.478Z" fill="#2b2b2b" />
    </Svg>


  )
}

export default Download

