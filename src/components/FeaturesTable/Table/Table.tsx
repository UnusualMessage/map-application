import React from "react";
import {useTable} from "react-table";
import {observer} from "mobx-react-lite";

import MapStore from "../../../stores/MapStore";

import css from "./table.module.scss";

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
			{headerGroups.map((headerGroup, idx) => (
				<tr {...headerGroup.getHeaderGroupProps()} className={`${css.row}`} key={idx}>
					{headerGroup.headers.map((column, idx) => (
						<th className={`${css.item}`} {...column.getHeaderProps()} key={idx}>
							{column.render("Header")}
						</th>
					))}
				</tr>
			))}
			</thead>
			<tbody className={`${css.body}`} {...getTableBodyProps()}>
			{rows.map((row, idx) => {
				prepareRow(row);
				
				const onRowClick = () => {
					MapStore.show(row.original, true);
				};
				
				return (
					<tr className={`${css.row}`}
					    {...row.getRowProps()}
					    onClick={onRowClick}
					    key={idx}
					>
						
						{row.cells.map(cell => {
							return (
								<td className={`${css.item}`} {...cell.getCellProps()} key={idx}>
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
	data: {[index: string]: string}[],
	columns: {
		Header: string,
		accessor: string
	}[]
}

export default observer(Table);