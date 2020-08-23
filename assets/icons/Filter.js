import * as React from "react"
import Svg, { Path, G, Circle,Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export function Filter(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15.976 15.976">
  <Path id="filter" d="M15.226,0H.75A.749.749,0,0,0,.22,1.278L5.991,7.05v6.43a.749.749,0,0,0,.319.613l2.5,1.747a.749.749,0,0,0,1.178-.613V7.05l5.771-5.771A.749.749,0,0,0,15.226,0Z" fill="#2b2b2b"/>
</Svg>


  )
}

export default Filter

