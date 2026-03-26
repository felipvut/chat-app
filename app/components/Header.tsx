import { Box, Button, ButtonBase, Divider, Drawer, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { AuthService } from "../services/auth.queries";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header({ callback }: any) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const authService = new AuthService();

    const { data: user } = useQuery({
        queryKey: ['user', typeof window !== "undefined" && window?.localStorage .getItem('@chat-app/token')],
        queryFn: () => authService.me().then(r => r),
    })

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const logOut = () => {
        callback?.()
        typeof window !== "undefined" && window?.localStorage .setItem('@chat-app/token', '');
        router.push('/login');
    }

    return (
        <header style={{ background: '#1976d2', height: 55, padding: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ ml: 2, color: '#fff' }}>Chat App</Typography>
            <ButtonBase sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: '30px', color: '#fff' }}></MenuIcon>
            </ButtonBase>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{
                    height: '100vh',
                    width: '280px', p: 1, display: 'flex',
                    flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
                        <Image src={user?.data?.person?.photo ? user?.data?.person?.photo : '/user.png'} width={55} height={55} alt={"Usuário"}
                            style={{ borderRadius: '50%', marginBottom: '15px' }} />
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>{user?.data?.person?.name}</Typography>
                        <Divider color="#f8f8f8" sx={{ width: '100%', mb: 2 }} />
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Button sx={{ mr: 1, mb: 2 }} color="primary" size="large" variant="contained" fullWidth
                            onClick={() => {
                                callback?.()
                                router.push('/my-profile')
                            }}>Meu perfil</Button>
                        <Button sx={{ mr: 1 }} color="error" size="large" variant="contained" fullWidth onClick={logOut}>Sair</Button>
                    </Box>
                </Box>
            </Drawer>
        </header>
    )
}