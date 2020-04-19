import useSWR from 'swr'

import api from '../utils/api.js'
import withLayout from '../components/layout/Layout.js'
import Loader from '../components/Loader.js'
import ProfileComponent from '../components/profile/Profile.js'

const Profile = () => {
  const { data } = useSWR('/users/me', api.get)
  return data ? <ProfileComponent user={data.user} /> : <Loader />
}

export default withLayout(Profile)
