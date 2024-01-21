import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from '../../redux/store';
import styles from './userList.module.css'

const userList = () => {
    const userList = useSelector((state: RootState) => state.user.userList);
    return (
        <Box className={styles.tableView}>
            <Typography className={styles.headerName}>--- UserList ---</Typography>
            <table className={styles.table}>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Mobile Number</th>
                    <th>ID Type</th>
                    <th>ID</th>
                    <th>Sex</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Pincode</th>
                </tr>
                {
                    userList.map((e, i) => {

                        return <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.age}</td>
                            <td>{e.mobile}</td>
                            <td>{e.idType}</td>
                            <td>{e.id}</td>
                            <td>{e.sex}</td>
                            <td>{e.country}</td>
                            <td>{e.state}</td>
                            <td>{e.city}</td>
                            <td>{e.pincode}</td>
                        </tr>
                    })

                }
            </table>
        </Box>
    )
}

export default userList
