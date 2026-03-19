'use client'

import { Box, Typography } from "@mui/material";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Box className="w-80" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" color="primary">Home</Typography>
      </Box>
    </div>
  );
}
