import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";


function RequestsNanny({ currentUser }) {
    return (
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
            <TableRow>
                <TableCell>From User</TableCell>
                <TableCell>To User</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>

            </Table>
        </TableContainer>
    )
}

export default RequestsNanny;