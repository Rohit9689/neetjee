import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Form } from 'react-bootstrap';


class TextEditor extends Component {
    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        // Call the parent's handler if strictly needed with the event object structure they expect, 
        // or update the parent to accept content string.
        // The previous code passed 'e', and parent used e.target.getContent().
        // We will simulate that structure or better yet, update the parent to use the content directly if we could.
        // But for minimal breakage, we'll try to match or assume the parent might need adaption.
        // Actually, looking at the previous code: `onChange={this.props.handleEditorChange}`
        // And TextEditor's own `handleEditorChange` was not used in render? 
        // Ah, `onChange={this.props.handleEditorChange}` was passed to TinyMCE.
        // TinyMCE-react's onEditorChange passes (content, editor).

        // We will create a synthetic event-like object if the parent expects `e.target.getContent()`
        // But the parent code I saw in NotifyStudentSection.jsx:
        // handleEditorChange = (e) => { console.log(..., e.target.getContent()); ... }
        // So yes, we need to mock it.
        const mockEvent = {
            target: {
                getContent: () => content
            }
        };
        this.props.handleEditorChange(mockEvent);
    }

    constructor(props) {
        super(props);
        let plugins = [];
        let toolbar = "";
        let height = 300;
        let content = "";
        if (this.props.type == "studentnote") {
            height = 360;
            plugins = [
                'image',
                'searchreplace wordcount visualblocks code fullscreen',
                'insertdatetime media table help wordcount'
            ]
            content = this.props.content

            toolbar = 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent| image | fullscreen'
        }
        else {
            plugins = [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ]
            //fullscreen
            toolbar = 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
        }
        this.state = {
            plugins: plugins,
            toolbar: toolbar,
            content: content,
            height: height
        }
    }
    render() {
        console.log("textcurrentstate", this.state);
        return (
            <React.Fragment>
                <Form.Group controlId="my-file" style={{ display: "none" }}>
                    <Form.Control type="file" name="my-file" onChange={() => { }} />
                </Form.Group>
                <Editor
                    value={this.state.content}
                    init={{
                        height: this.state.height,
                        menubar: false,
                        plugins: this.state.plugins,
                        toolbar: this.state.toolbar,
                        content_css: '//www.tinymce.com/css/codepen.min.css',
                        file_picker_types: 'image',
                        file_picker_callback: function (callback, value, meta) {
                            if (meta.filetype == 'image') {
                                var input = document.getElementById('my-file');
                                input.click();
                                input.onchange = function () {
                                    var file = input.files[0];
                                    var reader = new FileReader();
                                    reader.onload = function (e) {
                                        console.log('name', e.target.result);
                                        callback(e.target.result, {
                                            alt: file.name
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                };
                            }
                        },
                        paste_data_images: true,
                    }}
                    onEditorChange={this.handleEditorChange}
                />
            </React.Fragment>


        )
    }
}

export default TextEditor;
