import { Typography } from '@material-ui/core'
import Link from 'next/link'

export default () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <a href='https://www.otzii.com/'>ŌTZII</a> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
