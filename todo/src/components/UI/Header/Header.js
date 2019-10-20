import React from 'react';

import classes from "./Header.css";

const Header = ({ Icon, title, actions = [], actionClicked }) => {
    return (
        <div className={classes.title}>
            {Icon && <Icon style={{ margin: '0 5px' }} />}
            <p >{title}</p>
            <div className={classes.actions}>
                {actions.map((a, i) => {
                    let ActionIcon = a.Icon;
                    return (<div key={i} onClick={() => actionClicked(a.name)}>
                        <ActionIcon />
                    </div>)
                })}

            </div>
        </div>
    );
}

export default Header;