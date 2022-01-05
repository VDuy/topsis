export function criteriaToDataColumns (criteria){
    return [{field: 'name', headerName: 'Name', width: 300},
    ...criteria.map((d) => ({
    field: d.criterionName,
    headerName: [...d.criterionName[0].toUpperCase(), d.criterionName.slice(1)],
    type: "number",
    width: 100 
  }))]
}