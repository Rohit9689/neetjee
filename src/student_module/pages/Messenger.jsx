import React, { Component } from 'react'

import {Helmet} from "react-helmet";

class Messenger extends Component {
    render() {
        return (

            
            <Helmet defer={false}>
                <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/8456667.js"></script>
            </Helmet>
        

        )
    }
}

export default Messenger
