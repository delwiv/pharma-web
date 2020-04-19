import { TextField } from '@material-ui/core'

export default ({ user }) => (
  <div>
    <h1>Mon profil</h1>
    <form>
      <TextField label='email' value={user.email} />
    </form>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </div>
)
