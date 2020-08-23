import * as React from "react"
import Svg, { Path, G, Circle, } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function NextArrow(props) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="10.04" height="17.56" viewBox="0 0 10.04 17.56">
            <Path id="next" d="M18.263,14.971,11.619,8.332A1.255,1.255,0,0,1,13.4,6.56l7.528,7.523a1.252,1.252,0,0,1,.037,1.73L13.4,23.388a1.255,1.255,0,0,1-1.777-1.772Z" transform="translate(-11.25 -6.194)" fill="#000" opacity="0.3" />
        </Svg>

    )
}

export default NextArrow

