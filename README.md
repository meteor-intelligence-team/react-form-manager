# react-form-manager

> `react-form-manager` is a dynamic form for react with validation and data posting support with customizable input components.

## Installation
```bash
$ npm i --save react-form-manager
```

## Example
**The simplest use case**
``` javascript
import React, { Component } from 'react';
import Form from "react-form-manager";
import 'semantic-ui-css/semantic.css';

const Separator = (self) => (<h4 style={{margin: "3rem 0 -1rem 0"}}>{self.props.title}</h4>);

const modelAttributes = [
    [
        { name: "name", type: "Text", label:"Name", placeholder: "Enter your name", required: true },
        { name: "title", type: "Deferred", label: "Title", required: true, minLength: 3 },
    ],
    [
        { name: "sex", type: "Radio", label: "Sex", required: true, options: [
            {value: 'male', text: "Male"},
            {value:'female', text: "Female"}
        ]},
        { name: "age", type: "Number", label: "Age", required: true},
        { name: "dob", type: "Date", label: "Date of Birth", required: true, min:'1991-03-28', max: '1991-03-31'},
        { name: "human", type: "Boolean", label: "Is Human", required: true, verticalAlign: 'middle' },
    ],
    { name: "sn", type: "Number", label: "SN", placeholder: "Your Serial Number", max: 999, min: 100 },
    [
        { name: "hobbies", type: "Select", label: "Hobbies", options: [
            {value:'foot', text:'Football'},
            {value:'base', text:'Baseball'},
            {value:'rug', text:'Rugby'},
            {value:'dev', text:'Code'},
        ]},
        { name: "select", type: "Select", label: "Select One", options : [
            {value:"one", text: "Option 1"},
            {value:"two", text: "Option 2"},
            {value:"three", text: "Option 3"},
        ], required: true, search:true, multiple:true},
    ],
    <Separator title="Environment" />,
     /*{ name: "environment", type: "Json", label: "Environment", options: [
            {name: "ROOT_URL", required: true, placeholder: 'http://yourApp.techexmachina.com'},
            {name: "MONGO_URL", required: true, placeholder: 'mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]'},
            {name: "SOME_OTHER_VAR"}
        ]},*/
    { name: "description", type: "TextArea", label: "Description" },
    { name: "submit", type: "Submit", label: "Submit", textAlign:"center" }
];

const modelValues = {
    sn: 150,
    dob: '1991-03-30',
    hobbies: 'dev',
    select: ['one', 'two'],
    description: "hola!",
    human: true
};

class App extends Component {
    handleSubmit = (e, values) => {
        e.preventDefault();

        console.log(values);
    }

    render() {
        return (
            <div className="App">
                <Form onSubmit={this.handleSubmit} name="semantic" attributes={modelAttributes} values={modelValues} material={false} />
            </div>
        );
    }
}

export default App;
```

## Form Props

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|name|`string`| YES | The name of your form
|onSubmit|`function`| NO | A callback used when the form was submitted. Receives `SyntheticEvent` and an object with values `{ name: value }`
|attributes|`array`| YES | Array of Object to construct the form. You can group inputs on the same line with array in this array.
|values|`object`| NO | An object to initialize the form `{ name: value }`
|errorHeader|`string`| NO | Custom header of error box
|lang|`string`| NO | The lang used for default error messages.
|material|`boolean`| YES | If true, the form will be display with material-ui instead semantic.

You can submit the form with ref: call ref.submit();

## Attributes Props

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|name|`string`| YES | The name of this input.
|label|`string`| YES | The label of this input.
|type|`string`| YES | One of `Text`, `TextArea`, `Number`, `Radio`, `Boolean`, `Date`, `Select`, `Json`, `File` (see below).
|required|`boolean`| NO | This input can be required or not.
|textAlign|`string`| NO | Text Alignment in Grid. One of `left`, `center` or `right`.
|verticalAlign|`string`| NO | Vertical Alignment in Grid. One of `left`, `center` or `right`.

Attributes can be a React Element directly, to use separator for example.

**`Text` element**

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|placeholder|`string`| NO | Only if type is `Text`. The placeholder for this input.
|minLength|`string`| NO | The mix length of strings for this input.
|maxLength|`string`| NO | The max length of strings for this input.

**`Number` element**

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|min|`number`| NO | The minimum number (`number`).
|max|`number`| NO | The maximum number (`number`).

**`Date` element**

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|min|`string`| NO | The minimum date (`string` Format: YYYY-MM-DD).
|max|`string`| NO | The maximum date (`string` Format: YYYY-MM-DD).


**`TextArea` element**

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|minLength|`string`| NO | The mix length of strings for this input.
|maxLength|`string`| NO | The max length of strings for this input.


**`Select` element**

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|multiple|`string`| NO | Multiple selection or not.
|search|`string`| NO | The select can be searchable or not. This can't be used with material.
|options|`[object]`| YES | An Array of object to construct the select `{ value: 'some', text: 'example' }` or a function which return the same structure to live update the select input


**`Json` element**

A Json element is useful to display a gui to construct a json string which will be return on form submit.

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|options|`[object]`| YES | An Array of object to construct the json `{ name: 'some', placeholder: 'example', required: true, regexp: myRegexp, regexpMsg: 'Some Error Msg', readOnly: false }`
|required|`boolean`| NO | If true, the Json must have at least one value

**`File` element**

A File element can upload a file on AWS s3 bucket.

|       |Format|Required|What it does ?|
|-------|-------|-------|-------|
|path|`string`| YES | path in bucket where store the file
|publicRead|`boolean`| YES | If true, the file have a public URL. If false, the file will be private
|accept|`string`| YES | Mime type to filter sended file
|s3GetSignedUrl|`function`| YES | The function you provide should take file and callback arguments. Callback should be called with an object containing signedUrl key.
|s3DeleteObject|`function`| YES | A function to delete the object on aws. The function you provide should take the public link argument. Must return a promise


## Customizing the Form
Alternatively you can use `Field` to define a input.
@TODO Needs some extra examples

```javascript
  import React from 'react';
  import { render } from 'react-dom';
  import Form, { Field } from 'react-form-manager';
  import 'semantic-ui-css/semantic.css';

  render(
      <Form>
        <Field type="Text" name="username" label="Username" required />,
      </Form>
  ,document.body);
```
