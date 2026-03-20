'use client'

import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { UsersService } from "../services/users.queries";

export default function Home() {
  const usersService = new UsersService()

  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.list().then(r => r),
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Box className="w-80" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" color="primary">Home</Typography>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data?.data?.map((x: any) => <Typography color="textSecondary" key={x.uuid}>{x.email}</Typography>)
        }
      </Box>
    </div>
  );
}
