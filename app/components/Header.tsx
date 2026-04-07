import { Avatar, Box, Button, ButtonBase, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { AuthService } from "../services/auth.queries";
import { useQuery } from "@tanstack/react-query";
import { ChatBubbleOutline, Logout, Person } from "@mui/icons-material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header({ callback }: any) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const authService = new AuthService();
    const pathname = usePathname();

    const { data: user } = useQuery({
        queryKey: ['user', typeof window !== "undefined" && window?.localStorage.getItem('@chat-app/token')],
        queryFn: () => authService.me().then(r => r),
    })

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const logOut = () => {
        callback?.()
        typeof window !== "undefined" && window?.localStorage.setItem('@chat-app/token', '');
        router.push('/login');
    }

    return (
        <header style={{ background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)', height: 65, padding: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box
                sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Box sx={{
                    color: '#fff', background: '#1c6dbd', width: 45, height: 45,
                    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto'
                }}>
                    <ChatBubbleOutline sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h6" sx={{ ml: 2, color: '#fff', fontWeight: 700 }}>Chat App</Typography>
            </Box>
            <ButtonBase sx={{ mr: 2, background: '#227eda', p: 1, borderRadius: 4 }} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: '30px', color: '#fff' }}></MenuIcon>
            </ButtonBase>
  <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: { width: 300, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }
                }}
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.default',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Avatar
                            src={user?.data?.person?.photo ? user?.data?.person?.photo : '/user.png'}
                            alt={user?.data?.person?.name || "Usuário"}
                            sx={{ width: 88, height: 88, mb: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                            {user?.data?.person?.name || 'Carregando...'}
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, py: 2, px: 2 }}>
                        <List>
                            <ListItemButton
                                sx={{ borderRadius: 2, mb: 1, background: pathname?.startsWith('/my-profile') ? 'rgba(25, 118, 210, 0.1)' : '' }}
                                onClick={() => {
                                    callback?.()
                                    setOpen(false)
                                    router.push('/my-profile')
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Person color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Meu perfil" primaryTypographyProps={{ fontWeight: 500 }} />
                            </ListItemButton>
                        </List>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        <ListItemButton
                            sx={{
                                borderRadius: 2,
                                bgcolor: '#ffebee',
                                color: 'error.main',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: 'error.main', color: 'error.contrastText' }
                            }}
                            onClick={logOut}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Sair da Conta" primaryTypographyProps={{ fontWeight: 600 }} />
                        </ListItemButton>
                    </Box>
                </Box>
            </Drawer>
        </header>
    )
}