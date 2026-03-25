import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter()

    const logOut = () => {
        localStorage.setItem('@chat-app/token', '');
        router.push('/login');
    }

    return (
        <header style={{ background: '#1976d2', height: 55, padding: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ ml: 2, color: '#fff' }}>Meu Perfil</Typography>
            <Button sx={{ mr: 1 }} color="error" variant="contained" onClick={logOut}>Sair</Button>
        </header>
    )
}