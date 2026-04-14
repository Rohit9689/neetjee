import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

import CreatableSelect from 'react-select/creatable';

const components = {
    DropdownIndicator: null,
};

const createOption = (label: string) => ({
    label,
    value: label,
});

class PromoteModal extends Component {
    state = {
        inputValue: '',
        value: [],
    };
    handleChange = (value: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(value);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        this.setState({ value });
    };
    handleInputChange = (inputValue: string) => {
        this.setState({ inputValue });
    };
    handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
        const { inputValue, value } = this.state;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                console.group('Value Added');
                console.log(value);
                console.groupEnd();
                this.setState({
                    inputValue: '',
                    value: [...value, createOption(inputValue)],
                });
                event.preventDefault();
        }
    };
    render() {
        const { inputValue, value } = this.state;
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Add Students</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <CreatableSelect
                        components={components}
                        inputValue={inputValue}
                        isClearable
                        isMulti
                        menuIsOpen={false}
                        onChange={this.handleChange}
                        onInputChange={this.handleInputChange}
                        onKeyDown={this.handleKeyDown}
                        placeholder="Type something and press enter..."
                        value={value}
                    />
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button variant="success" className="px-5" onClick={() => { this.props.onHide() }}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default PromoteModal
