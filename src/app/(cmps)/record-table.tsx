//@ts-nocheck
"use client"
import { useState } from "react"
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell } from '@table-library/react-table-library/table'
import { useTheme } from "@table-library/react-table-library/theme"
import { getTheme } from "@table-library/react-table-library/baseline"
import { HeaderCellSort, useSort } from "@table-library/react-table-library/sort"
import { usePagination } from "@table-library/react-table-library/pagination"
import { Record } from "@/interfaces/record"
import Button from '@mui/material/Button'
import { Pagination } from "@mui/material"
import { RecordModal } from "./record-modal"
import Link from "next/link"
import { SnackbarOrigin } from '@mui/material/Snackbar'
import { AlertBar } from "./alert-bar"
import { MdDeleteOutline, MdEdit } from "react-icons/md"
import { User } from "@/interfaces/user"

interface State extends SnackbarOrigin {
    open: boolean;
}

export const RecordTable = ({ user, initialRecords, handleDeleteRecord }: { user: User, initialRecords: Record[], handleDeleteRecord: any }) => {

    const [records, setRecords] = useState(initialRecords)
    const [search, setSearch] = useState("")
    const [alertMsg, setAlertMsg] = useState("")
    const [alertState, setAlertState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })
    const theme = useTheme([
        getTheme(),
        {
            Table: `
                margin-bottom: 1rem;
            `,
            HeaderRow: `
              background-color: #2A9FFF;
            `,
            Row: `
              &:nth-of-type(odd) {
                background-color: #d2e9fb;
              }
      
              &:nth-of-type(even) {
                background-color: #eaf5fd;
              }
            `,
            BaseCell: `
    
            text-align: center;
            padding: 0.8rem 0.5rem;
            &:first-of-type {
              text-align: center;
            }
    
            &:last-of-type {
              text-align: center;
            }
          `,
        },
    ])

    let recordsToRender = {
        nodes: records.filter((record: any) =>
            record.startingPoint.toLowerCase().includes(search.toLowerCase()) ||
            record.driver.name.toLowerCase().includes(search.toLowerCase()) ||
            record.destinationPoint.toLowerCase().includes(search.toLowerCase())
        ).reverse(),
    }

    const pagination = usePagination(records, {
        state: {
            page: 0,
            size: 7,
        }
    })

    const handlePageChange = (ev, newPage) => {
        pagination.fns.onSetPage(newPage - 1)
    }



    const sort = useSort(
        records,
        {
            onChange: onSortChange,
        },
        {
            sortFns: {
                ENDKM: (array: Record[]) => array.sort((a, b) => a.driveEndKm - b.driveEndKm),
                STARTKM: (array: Record[]) => array.sort((a, b) => a.startKm - b.startKm),
                startingPoint: (array: Record[]) => array.sort((a, b) => a.startingPoint.localeCompare(b.startingPoint)),
                destination: (array: Record[]) => array.sort((a, b) => a.destinationPoint.localeCompare(b.destinationPoint)),
            }
        }
    )

    function onSortChange(action: any, state: any) {
        console.log(action, state)
    }

    const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(target.value)
    }

    const handleDelete = async (recordId) => {
        const verifyAction = confirm("האם אתה בטוח רוצה למחוק את הרשומה ? ")
        if (verifyAction) {
            setRecords(records.filter(rec => rec._id != recordId))
            await handleDeleteRecord(recordId)
            setAlertMsg(`נסיעה נמחקה בהצלחה`)
            setAlertState(prevState => ({ ...prevState, open: true }))
        }
    }

    return (
        <>
            <div className="flex space-between table-top-toolbar">
                <Link href={`/record/edit?lastRideKm=${records.length > 0 ? records[records.length - 1].driveEndKm : 0}`}>
                    <Button variant="contained" color="success">הוסף נסיעה חדשה</Button>
                </Link>
                <input id="search" type="search" value={search} onChange={handleSearch} placeholder="חפש" />
            </div>

            <Table data={recordsToRender} theme={theme} layout={{ fixedHeader: true }} sort={sort} pagination={pagination}>
                {(records) => (
                    <>
                        <Header>
                            <HeaderRow>
                                {user?.isAdmin && <HeaderCell resize="true">פעולות</HeaderCell>}
                                <HeaderCell resize="true">תאריך סיום</HeaderCell>
                                <HeaderCell resize="true">תאריך התחלה</HeaderCell>
                                <HeaderCellSort sortKey="ENDKM" resize="true">ק"מ סוף נסיעה</HeaderCellSort>
                                <HeaderCellSort sortKey="STARTKM" resize="true">ק"מ תחילת נסיעה</HeaderCellSort>
                                <HeaderCellSort sortKey="destination" resize="true">נקודת יעד</HeaderCellSort>
                                <HeaderCellSort sortKey="startingPoint" resize="true">נקודת מוצא</HeaderCellSort>
                                <HeaderCell resize="true">נהג</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {records.map((record: Record) => (
                                <Row key={record._id} record={record}>
                                    {user?.isAdmin && (
                                        <Cell>
                                            <div className="flex space-evenly admin-actions">
                                                <div className="icon-wrapper" onClick={() => handleDelete(record._id)}>
                                                    <MdDeleteOutline color="white" size={20} />
                                                </div>
                                                <Link href={`/record/edit/${record._id}`}>
                                                    <div className="icon-wrapper">
                                                        <MdEdit color="white" size={15} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </Cell>
                                    )}
                                    <Cell>{new Date(record.endDate).toLocaleDateString('he-IL')}</Cell>
                                    <Cell>{new Date(record.startDate).toLocaleDateString('he-IL')}</Cell>
                                    <Cell>{record.driveEndKm.toLocaleString("he-IL")}</Cell>
                                    <Cell>{record.startKm.toLocaleString("he-IL")}</Cell>
                                    <Cell>{record.destinationPoint}</Cell>
                                    <Cell>{record.startingPoint}</Cell>
                                    <Cell><RecordModal record={record}/></Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>
            <Pagination count={pagination.state.getTotalPages(recordsToRender.nodes)} color="primary" onChange={handlePageChange} style={{ alignSelf: 'center' }} />
            <AlertBar msg={alertMsg} snackBarState={alertState} />
        </>
    )
}