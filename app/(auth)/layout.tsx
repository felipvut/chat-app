'use client'

import { usePathname, useRouter } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Paper, Box, alpha, useTheme } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Oculta o BottomNavigation dentro da tela de conversa individual
    const hideBottomNav = pathname?.startsWith('/chat');

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            pb: hideBottomNav ? 0 : '65px'
        }}>
            <Box sx={{ flex: 1 }}>
                {children}
            </Box>

            {!hideBottomNav && mounted && (
                <Paper
                    elevation={0}
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        bgcolor: alpha(theme.palette.background.paper, 0.85),
                        backdropFilter: 'blur(12px)',
                        paddingBottom: 'env(safe-area-inset-bottom)', // Para iPhones (Safe frame)
                    }}
                >
                    <BottomNavigation
                        showLabels
                        value={pathname}
                        onChange={(event, newValue) => {
                            router.push(newValue);
                        }}
                        sx={{
                            height: 65,
                            bgcolor: 'transparent',
                            '& .MuiBottomNavigationAction-root': {
                                minWidth: 'auto',
                                color: 'text.secondary',
                                transition: 'all 0.2s',
                                '&.Mui-selected': {
                                    color: 'primary.main',
                                    transform: 'scale(1.05)',
                                },
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '0.75rem',
                                    mt: 0.5,
                                    '&.Mui-selected': {
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                    }
                                }
                            }
                        }}
                    >
                        <BottomNavigationAction
                            label="Contatos"
                            value="/home"
                            icon={<ChatBubbleOutlineIcon />}
                        />
                        <BottomNavigationAction
                            label="Novo"
                            value="/persons"
                            icon={<Add />}
                        />
                        <BottomNavigationAction
                            label="Perfil"
                            value="/my-profile"
                            icon={<PersonOutlineIcon />}
                        />
                    </BottomNavigation>
                </Paper>
            )}
        </Box>
    );
}
