import * as React from "react"
import Svg, { Path, G, Circle, Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Fax(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58">
  {/* <defs>
    <filter id="Ellipse_7" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse">
      <feOffset input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-opacity="0.11"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs> */}
  <G id="fax" transform="translate(-21 -303)">
    <G transform="matrix(1, 0, 0, 1, 21, 303)" filter="url(#Ellipse_7)">
      <Circle id="Ellipse_7-2" data-name="Ellipse 7" cx="20" cy="20" r="20" transform="translate(9 9)" fill="#fff"/>
    </G>
    <Path id="Icon_awesome-fax" data-name="Icon awesome-fax" d="M2.5,5H1.25A1.25,1.25,0,0,0,0,6.25v12.5A1.25,1.25,0,0,0,1.25,20H2.5a1.25,1.25,0,0,0,1.25-1.25V6.25A1.25,1.25,0,0,0,2.5,5ZM18.75,6.25V3.018a1.251,1.251,0,0,0-.366-.884L16.616.366A1.25,1.25,0,0,0,15.732,0H6.25A1.25,1.25,0,0,0,5,1.25v17.5A1.25,1.25,0,0,0,6.25,20h12.5A1.25,1.25,0,0,0,20,18.75V7.5A1.25,1.25,0,0,0,18.75,6.25Zm-7.5,10.625a.625.625,0,0,1-.625.625H9.375a.625.625,0,0,1-.625-.625v-1.25A.625.625,0,0,1,9.375,15h1.25a.625.625,0,0,1,.625.625Zm0-5a.625.625,0,0,1-.625.625H9.375a.625.625,0,0,1-.625-.625v-1.25A.625.625,0,0,1,9.375,10h1.25a.625.625,0,0,1,.625.625Zm5,5a.625.625,0,0,1-.625.625h-1.25a.625.625,0,0,1-.625-.625v-1.25A.625.625,0,0,1,14.375,15h1.25a.625.625,0,0,1,.625.625Zm0-5a.625.625,0,0,1-.625.625h-1.25a.625.625,0,0,1-.625-.625v-1.25A.625.625,0,0,1,14.375,10h1.25a.625.625,0,0,1,.625.625ZM16.875,7.5h-10V1.875H15v1.25a.625.625,0,0,0,.625.625h1.25Z" transform="translate(40 322)" fill="#43afe8"/>
  </G>
</Svg>


  )
}

export default Fax

