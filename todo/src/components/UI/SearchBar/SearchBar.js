import React from 'react';

import classes from "./SearchBar.css";
import { useRef, useState } from "react";
import { SearchOutlined } from "@material-ui/icons";
import { MenuList, MenuItem } from '@material-ui/core';



const SearchBar = (props) => {
    const ref = useRef();
    const Suggestions = props.suggestions;

    return (
        <div className={classes.searchArea}>
            <input ref={ref} className={classes.input} placeholder="Search..." onChange={(v) => props.onChange(v.target.value)} />
            <div className={classes.icon}>
                <SearchOutlined />
            </div>
            {Suggestions && Suggestions.length > 0 &&
                <MenuList className={classes.suggestions} >
                    {Suggestions.map((sug, i) => <MenuItem key={i} ><div className={classes.sug} onClick={() => props.onSelected(sug)}>{sug}</div></MenuItem>)}
                </MenuList>
            }
        </div>);
}

export default SearchBar;