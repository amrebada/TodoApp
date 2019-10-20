import React from 'react';


import classes from "./Checkbox.css";

import { Checkbox, FormControlLabel } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
const CustomCheckBox = withStyles({
    root: {
        color: '#45acdd',
        '&$checked': {
            color: '#45acdd',
        },
    },
    checked: {},
})(props => <Checkbox

    color="default"
    {...props}
/>);


const Checkboxe = (props) => {



    return (
        <div className={classes.Checkbox}>
            <FormControlLabel
                control={<CustomCheckBox
                    checked={props.checked}
                    onChange={props.onChange}
                    value={props.label} />}
                label={props.label}
            />
        </div>
    );
}

export default Checkboxe;