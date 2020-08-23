import * as React from "react"
import Svg, { Path, G, Circle, Rect,Defs ,Filter} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function MobileForContact(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg"  width="58" height="58" viewBox="0 0 58 58">
    {/* <Defs>
      <Filter id="Ellipse_10" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse">
        <feOffset input="SourceAlpha"/>
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feFlood flood-opacity="0.11"/>
        <feComposite operator="in" in2="blur"/>
        <feComposite in="SourceGraphic"/>
      </Filter>
    </Defs> */}
    <G id="mobile" transform="translate(-21 -210)">
      <G transform="matrix(1, 0, 0, 1, 21, 210)" filter="url(#Ellipse_10)">
        <Circle id="Ellipse_10-2" data-name="Ellipse 10" cx="20" cy="20" r="20" transform="translate(9 9)" fill="#fff"/>
      </G>
      <G id="smartphone" transform="translate(-68.692 229)">
        <G id="Group_18" data-name="Group 18" transform="translate(113.692)">
          <Path id="Path_47" data-name="Path 47" d="M122.573,0h-6.757a2.123,2.123,0,0,0-2.125,2.085V17.917A2.1,2.1,0,0,0,115.8,20l6.768-.007a2.09,2.09,0,0,0,2.088-2.083l.01-15.826A2.085,2.085,0,0,0,122.573,0Zm-4.354,1.25h1.96a.312.312,0,1,1,0,.625h-1.96a.312.312,0,1,1,0-.625Zm-1.178.1a.324.324,0,0,1,.442,0,.313.313,0,0,1-.22.534.32.32,0,0,1-.222-.092.315.315,0,0,1,0-.442Zm2.095,18.031a.935.935,0,1,1,.935-.935A.936.936,0,0,1,119.136,19.381Zm4.556-2.506h-8.906V2.969h8.906V16.875Z" transform="translate(-113.692)" fill="#66308c"/>
        </G>
      </G>
    </G>
  </Svg>
  
  )
}

export default MobileForContact

