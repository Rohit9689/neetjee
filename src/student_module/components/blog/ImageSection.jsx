import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import axios from "axios";
class ImageSection extends Component {
    constructor(props){
        super(props)
        this.state={
            path:"",
            title:""
        }
    }
    componentDidMount = () => {
        
        axios.get(`https://rizee.in/blog/wp-json/wp/v2/media/${this.props.featured_media}?context=embed&_fields=source_url,title,alt_text`)
            .then(response => {

                if (response.status == 200) {
                    console.log("response.data.source_url", response.data.source_url);
                    this.setState({
                        path:response.data.source_url,
                        title:response.data.alt_text
                    });
                 }
                else {
                    this.setState({
                        path:"",
                        title:""
                    }); 
                }
            })
            .catch(error => {
                console.log(error);
            });

    }
    render() {
        return (
            <Card.Img variant="top mb-2" src={this.state.path} alt={this.state.title} fluid="true" />
        )
    }
}

export default ImageSection
