import { Button, Box, Stack } from '@mui/material';

const GameRoomModal = () => {
  return (
    <Box sx={{ width: '320px',height: '320px', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', gap:'30px'}}>
       <Stack sx={{ width: '200px' }}>
            <Button  variant="contained" color="primary" size="large">
            Unirse a una sala
            </Button>
       </Stack>
       <Stack sx={{ width: '200px' }}>
            <Button variant="contained" color="primary" size="large">
                    Crear sala
            </Button>
       </Stack>
    </Box>
    )
}
export default GameRoomModal;
  
 