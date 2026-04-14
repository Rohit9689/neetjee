import React, { Component } from 'react'

class UploadFile extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            files: [],
        };
    }

    onChange(e) {
        var files = e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);
        console.log(filesArr);
        this.setState({ files: [...this.state.files, ...filesArr] });
    }

    removeFile(f) {
        this.setState({ files: this.state.files.filter(x => x !== f) });
    }

    render() {
        return (
            <React.Fragment>
                <div className="uploadblock">
                    <div className="d-flex align-items-center justify-content-between">
                        <i className="fas fa-cloud-upload-alt fa-3x" />
                        <label className="ml-5 custom-file-upload">
                            <input type="file" multiple onChange={this.onChange} />
                            {this.props.titleData.Title}
                    </label>
                    </div>
                    {this.state.files.map(x =>
                        <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name} <i className="text-danger far fa-times-circle" /></div>
                    )}
                </div>
                {/* <Form.Text className="text-muted text-center">{this.props.titleData.SupportedFormats}</Form.Text> */}
            </React.Fragment>
        )
    }
}

export default UploadFile

