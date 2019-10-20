import React from 'react';

import classes from "./Table.css";


const Table = (props) => {

    return (
        props.data && props.data.records && props.data.records.length > 0 ? <table cellSpacing={0} className={classes.table}>
            <thead>
                <tr>
                    {props.data.header.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.data.records.map((r, i) => <tr key={i}>{r.map((d, j) => <td key={j}>{d}</td>)}</tr>)}
            </tbody>
        </table> : <div className={classes.no_data}>No Data</div>

    );
}

export default Table;