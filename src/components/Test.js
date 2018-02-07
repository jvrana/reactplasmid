import React from 'react';
import {Alert, Badge, ButtonToolbar, Button, Jumbotron, Tabs, Tab, ProgressBar, DropdownButton, MenuItem} from 'react-bootstrap';

export default function BootstrapTest(props) {

    return <div className={"bstest"}>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        </link>
        <Jumbotron>
            <h1>ReactPlasmid</h1>
            <p>
                Beautiful plasmid visualization for all.
            </p>
        </Jumbotron>

        <Alert bsStyle={'warning'}><strong>Woah there!</strong></Alert>

        This is Badge: <Badge>42</Badge>

        <ButtonToolbar>
            {/* Standard button */}
            <Button>Default</Button>

            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
            <Button bsStyle="primary">Primary</Button>

            {/* Indicates a successful or positive action */}
            <Button bsStyle="success">Success</Button>

            {/* Contextual button for informational alert messages */}
            <Button bsStyle="info">Info</Button>

            {/* Indicates caution should be taken with this action */}
            <Button bsStyle="warning">Warning</Button>

            {/* Indicates a dangerous or potentially negative action */}
            <Button bsStyle="danger">Danger</Button>

            {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
            <Button bsStyle="link">Link</Button>
        </ButtonToolbar>


        <ProgressBar now={60} label={`60%`} />

        <DropdownButton
            bsStyle={"Info"}
            title={"Style"}
            key={1}
            id={1}
        >
            <MenuItem eventKey="1">Light</MenuItem>
            <MenuItem eventKey="2">Dark</MenuItem>
            <MenuItem eventKey="3" active>
                Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
        </DropdownButton>

    </div>;
}