import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
export default function Grid(props){
    return (
      <div style={{width: '100%', height:300}}>
          <DataGrid 
          rows={props.dataset} 
          columns={props.columns} 
          pageSize={10} 
          loading={props.loading}/>
      </div>);
}