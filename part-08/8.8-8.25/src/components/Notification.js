import { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {
  const [show, setShow] = useState(true)

  if (show && message) {
    return (
      <Alert
        variant="info"
        onClose={() => setShow(false)}
        dismissible
        style={{
          marginTop: '20px',
        }}
      >
        {message}
      </Alert>
    )
  }
}

export default Notification
