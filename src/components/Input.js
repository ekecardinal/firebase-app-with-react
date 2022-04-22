import {
  Box,
  Button,
  TextField,
  Collapse,
  Alert,
  IconButton,
} from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useFirestore } from '../hooks/useFirestore'

export default function Input() {
  const [details, setDetails] = useState('')
  const [file, setFile] = useState()
  const [open, setOpen] = useState(true)
  const { addDocument, response } = useFirestore('Documents')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({ details, file })
    setDetails('')
    setFile(null)
  }

  return (
    <Box onSubmit={handleSubmit} component="form">
      {response.success && (
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Submitted Successfully
          </Alert>
        </Collapse>
      )}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mt: 2,
          mr: { sm: 0, lg: 20, md: 0 },
          ml: { sm: 0, md: 0, lg: 20 },
          justifyContent: 'center',
          '& > :not(style)': {
            m: '0.3em',
            width: 300,
          },
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="details"
          label="Picture Details"
          name="details"
          onChange={(e) => setDetails(e.target.value)}
        />
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: '#282828' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}
