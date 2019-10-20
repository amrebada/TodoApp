import React from 'react';
import { Button, withStyles } from '@material-ui/core';



const ColorButton = withStyles(theme => ({
    root: {
        color: 'white',
        backgroundColor: '#254463',
        '&:hover': {
            backgroundColor: '#45acdd',
        },
    },
}))((props) => <Button  {...props}>{props.children}</Button>);


export default ColorButton;