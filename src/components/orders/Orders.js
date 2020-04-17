import React, { useState, useEffect } from 'reactn'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'

import API from '../../utils/api.js'

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})
const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR'
})

export default ({ orders }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Prix</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o._id}>
              <TableCell>
                {dateFormatter.format(new Date(o.createdAt))}
              </TableCell>
              <TableCell>{o.type}</TableCell>
              <TableCell>{o.status}</TableCell>
              <TableCell>
                {currencyFormatter.format(
                  o.items.reduce(
                    (total, cur) => total + cur.price * cur.quantity,
                    0
                  ) / 100
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
