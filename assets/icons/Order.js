import * as React from "react"
import Svg, { Path, G, Circle, } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Order(props) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="19.516" viewBox="0 0 21.999 19.516">
            <G id="orders" transform="translate(-36.001 -331.485)">
                <Path id="Subtraction_1" data-name="Subtraction 1" d="M-4578,5344h0l-8.421-2.875v-4.867l-2.578-.88,2.8-4.579,3.2-1.092v1.4l-.728.249,5.729,1.956,5.728-1.956-.729-.249v-1.4l3.2,1.092,2.8,4.579-2.576.88v4.867L-4578,5344Zm-7.132-7.3h0v3.47l6.488,2.214v-6.073l-1.317,2.154-5.171-1.765Zm7.777-.39h0v6.073l6.489-2.214v-3.47l-5.172,1.765-1.317-2.154Zm-8.145-4.161h0l-1.531,2.5,6.517,2.225,1.532-2.5-6.517-2.225Zm15,0h0l-6.518,2.225,1.532,2.5,6.517-2.225-1.53-2.5Z" transform="translate(4625 -4993)" fill="#2b2b2b" />
                <Path id="Icon_awesome-check" data-name="Icon awesome-check" d="M2.717,10.426l-2.6-2.6a.4.4,0,0,1,0-.566l.566-.566a.4.4,0,0,1,.566,0L3,8.446,6.752,4.694a.4.4,0,0,1,.566,0l.566.566a.4.4,0,0,1,0,.566l-4.6,4.6A.4.4,0,0,1,2.717,10.426Z" transform="translate(43 326.908)" fill="#2b2b2b" />
            </G>
        </Svg>
    )
}

export default Order

