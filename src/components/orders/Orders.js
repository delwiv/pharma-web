import React, { useState, useEffect } from 'reactn'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import API from '../../utils/api.js'

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: 'pointer',
  },
  newRow: {
    backgroundColor: '#7D5B6A',
  },
}))

export default ({ orders }) => {
  const classes = useStyles()
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
          {orders.map((o) => (
            <Link key={o._id} href='/orders/[orderId]' as={`/orders/${o._id}`}>
              <TableRow
                className={o.status === 'new' ? classes.newRow : classes.row}
                hover={true}
              >
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
            </Link>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
