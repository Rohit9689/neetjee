import React, { Component } from 'react';
import './_preloader.scss'

class PreloaderTwo extends Component {
    // PreLoaderElement() {
    //     return new Promise(resolve => setTimeout(resolve, 2000))
    // }

    // componentDidMount() {
    //     this.PreLoaderElement().then(() => {
    //         const preloaderEle = document.getElementById('preloader')
    //         if (preloaderEle) {
    //             // fade out
    //             preloaderEle.classList.add('available')
    //             setTimeout(() => {
    //                 // remove from DOM
    //                 preloaderEle.outerHTML = ''
    //             }, 1000)
    //         }
    //     })
    // }

    render() {
        return (
            <div className="preloaderTwo" id="preloader">
                <div className="divLoader">
                    <svg className="svgLoader" viewBox="0 0 1024 1024" width="5em" height="5em" aria-hidden="true">
                        <path fill="#36A1F5" d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
                    </svg>
                </div>
            </div>
        );
    }
}

export default PreloaderTwo;