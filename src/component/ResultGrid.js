import React from 'react';
import Grid from "./Grid";
import { useState, useEffect } from "react";
import topsis_predict from "../services/topsis";


export default function ResultGrid(props) {

    const columns = [
        { field: 'ranking', headerName: 'Rank', width: 100 },
        { field: 'name', headerName: 'Name', width: 360 },
    ];

    const [loading, setLoading] = useState(true);
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
        const _criteria = props.criteria.map(d => ({ name: d.criterionName, type: d.type, weight: parseFloat(d.weight / 100.0) }))
        const _dataset = props.dataset.map(row => ([..._criteria.map(d => row[d.name])]))
        const result = topsis_predict(_dataset, _criteria);
        setTimeout(() => {
            setDataset(result.map((_idx, idx_ranking) => ({
                id: idx_ranking,
                name: props.dataset[_idx].name,
                ranking: idx_ranking + 1
            }
            )))
            setLoading(false);
        }, 1000);
    }, [props.criteria, props.dataset]);

    return (
        <Grid
            loading={loading}
            dataset={dataset}
            columns={columns}
        />
    );
}
