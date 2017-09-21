import React from 'react';
import ValidationError from '../ValidationError';
import ReactS3Uploader from 'react-s3-uploader';
import autobind from 'react-autobind';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import ConfirmButton from 'material-ui-confirm-button';
import DeleteForEver from 'material-ui/svg-icons/action/delete-forever';

import '../css/File.css';

const buttonText = 'Choose a file';
const buttonTextUploaded = 'Uploaded';

export default class File extends React.Component {
    constructor(props, context) {
        super(props, context);
        autobind( this );

        this.state = {
            value: props.value || null,
            error: false,
            errorMsg: '',
            completed: 0,
            displayProgressBar: 'none',
            labelButton: (props.value) ? buttonTextUploaded : buttonText,
            disableButton: !!(props.value),
            previewFile: (props.value) ? props.value.name : null,
            previewFileSrc: (props.value) ? props.value.publicLink : null
        };
    }

    validate() {
        const {
            label,
            required, requiredMsg
        } = this.props;
        if ((this.state.value === null) && required) return new ValidationError(this, label, requiredMsg || "Value is required");

        return true;
    }

    onUploadStart(file, next) {
        this.setState({ labelButton: 'Uploading...', disableButton: true, displayProgressBar: 'block' });

        return next(file);
    }

    onUploadFinish(signResult, file) {
        const publicLink = signResult.signedUrl.split('?')[0];
        const { name, type } = file;
        const { publicRead } = this.props;

        file.publicLink = publicLink;

        if (file.type.indexOf('image')  > -1 && publicRead) {
            this.setState({ previewFile: file.name, previewFileSrc: file.publicLink });
        } else {
            this.setState({ previewFile: file.name });
        }

        const value = {
            publicLink,
            type,
            name,
            publicRead,
        };

        this.setState({ value, displayProgressBar: 'none', labelButton: buttonTextUploaded });
    }

    onUploadProgress(percent) {
        const completed = parseInt(percent, 10);

        this.setState({ completed });
    }

    onUploadError(err) {
        console.error(err);

        this.setState({ labelButton: 'Upload ERROR', disableButton: true, displayProgressBar: 'none' });
    }


    deleteObject() {
        this.props.s3DeleteObject(this.state.value.publicLink).then(() => {
            this.setState({ labelButton: buttonText, disableButton: false, displayProgressBar: 'none', value: null, previewFileSrc: null, previewFile: null });
        }).catch((reason => {
            console.error(reason);
        }));
    }

    render() {
        const { label } = this.props;
        const headers = (this.props.publicRead) ? { 'x-amz-acl': 'public-read' } : {};

        if(this.props.s3GetSignedUrl === undefined) console.error('input File : s3GetSignedUrl is undefined');
        if(this.props.s3DeleteObject === undefined) console.error('input File : s3DeleteObject is undefined');

        return <div>
                <span>
                    {label}
                </span>
                <RaisedButton containerElement='label' label={this.state.labelButton} secondary={true} disabled={this.state.disableButton}>
                    <ReactS3Uploader
                        getSignedUrl={this.props.s3GetSignedUrl}
                        s3path={this.props.path}
                        accept={this.props.accept}
                        preprocess={this.onUploadStart}
                        onProgress={this.onUploadProgress}
                        onError={this.onUploadError}
                        onFinish={this.onUploadFinish}
                        uploadRequestHeaders={headers}  // this is the default
                        contentDisposition="auto"
                        className="input-file"
                        disabled={this.state.disableButton}
                    />
                </RaisedButton>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                { (this.state.previewFileSrc === null) ? <span id="previewFile">{this.state.previewFile}</span> : null }
                                { (this.state.previewFileSrc !== null) ? <span id="previewImage"><img width="100px" alt="" src={this.state.previewFileSrc} /></span> : null }
                            </td>
                            <td>
                                { (this.state.value !== null) ? <ConfirmButton icon={<DeleteForEver />} confirmMessage="Delete" onSubmit={() => this.deleteObject()} /> : null }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <LinearProgress mode="determinate" style={{display: this.state.displayProgressBar}} value={this.state.completed} />
            </div>;
    }
}