import { Box, Button, Alert } from '@mui/material'
import Input from '../components/Input'
import Lists from '../components/Lists'
import { useLogout } from '../hooks/useLogout'
import { useCollection } from '../hooks/useCollection'

export default function Home() {
  const { logout } = useLogout()
  const { documents, error } = useCollection('Documents')

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mr: 28 }}>
        <Button
          onClick={logout}
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: '#696969' }}
        >
          Logout
        </Button>
      </Box>
      <Input />
      {error && <Alert severity="error">{error}</Alert>}
      {documents && <Lists items={documents} />}
    </div>
  )
}
