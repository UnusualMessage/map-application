import React from "react";
import {useTable} from "react-table";
import {observer} from "mobx-react-lite";

import css from "./table.module.scss";

import MapStore from "../../../stores/MapStore";

const Table = ({data, columns}: Props) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({columns, data});
	
	return (
		<table className={`${css.table}`} {...getTableProps()}>
			<thead className={`${css.head}`}>
			{headerGroups.map(headerGroup => (
				<tr {...headerGroup.getHeaderGroupProps()} className={`${css.row}`}>
					{headerGroup.headers.map(column => (
						<th className={`${css.item}`} {...column.getHeaderProps()}>
							{column.render("Header")}
						</th>
					))}
				</tr>
			))}
			</thead>
			<tbody className={`${css.body}`} {...getTableBodyProps()}>
			{rows.map(row => {
				prepareRow(row);
				
				const onRowClick = () => {
					MapStore.show(row.original, true);
				};
				
				return (
					<tr className={`${css.row}`}
					    {...row.getRowProps()}
					    onClick={onRowClick}
					>
						
						{row.cells.map(cell => {
							return (
								<td className={`${css.item}`} {...cell.getCellProps()}>
									{cell.render("Cell")}
								</td>
							);
						})}
					</tr>
				);
			})}
			</tbody>
		</table>
	);
};

interface Props {
	data: Record<string, string>[],
	columns: {
		Header: string,
		accessor: string
	}[]
}

export default observer(Table);