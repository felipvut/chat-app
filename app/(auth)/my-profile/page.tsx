'use client'

import { Badge, Box, Button, ButtonBase, IconButton, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from "next/image";
import Header from "@/app/components/Header";
import { AuthService } from "@/app/services/auth.queries";
import { ProfileFormData, profileSchema } from "@/app/types/profile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateIcon from '@mui/icons-material/Create';
import "../../globals.css";
import { useEffect } from "react";
import { useSaveProfile } from "@/app/hooks/person/person.hook";

export interface Person {
  uuid?: string;
  name?: string;
}

export default function MyProfile() {
  const authService = new AuthService()
  const router = useRouter()

  const { mutate, isPending } = useSaveProfile();

  const { data: user, isFetching } = useQuery({
    queryKey: ['user', localStorage.getItem('@chat-app/token')],
    queryFn: () => authService.me().then(r => r),
  })

  const {
    register,
    setValue,
    watch,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  });

  const onSubmit = () => {
    if (!watch('name')) return
    mutate(getValues());
  };

  const setPhoto = (files: FileList | null) => {
    if (!files) return;
    if (files?.length <= 0) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      console.log(reader.result)
      setValue('photo', reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  useEffect(() => {
    if (user?.data?.person?.name) {
      setValue('name', user?.data?.person?.name)
    }
    if (user?.data?.person?.photo) {
      setValue('photo', user?.data?.person?.photo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Box>
      <Header />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ButtonBase sx={{ mr: 2 }} onClick={() => router.push('/home')}>
            <ArrowBackIcon sx={{ fontSize: '30px', color: '#5a5a5a' }}></ArrowBackIcon>
          </ButtonBase>
          <Typography variant="h4" color="primary">Meu perfil</Typography>
        </Box>
        {
          isFetching &&
          <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>Carregando...</Typography>
        }
        {
          (!isFetching) &&
          <>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={() => {
                  const photo = document.getElementById('photo')
                  photo?.click?.()
                }} sx={{ p: 0 }} >
                  <Badge
                    overlap="circular"
                    badgeContent={<CreateIcon sx={{ color: '#fff', fontSize: '17px' }}></CreateIcon>}
                    sx={{
                      mb: 3,
                      '& .MuiBadge-badge': {
                        width: 36,
                        height: 36,
                        borderRadius: '50%'
                      }
                    }}
                    color="primary">
                    <Box
                      sx={{
                        width: 110,
                        height: 110,
                        borderRadius: '50%',
                        overflow: 'hidden'
                      }}
                    >
                      <Image
                        src={watch('photo') ? watch('photo') : "/user.png"}
                        loading="eager" width={110} height={110} alt={"Usuário"}
                        style={{
                          borderRadius: '50%',
                          objectFit: 'cover',
                          display: 'block',
                          height: 'inherit'
                        }} />
                    </Box>

                  </Badge>
                </IconButton>
              </Box>
              <input id="photo" type="file" name="file" onChange={(e) => { setPhoto(e.target.files) }} style={{ display: 'none' }} />
              <TextField
                label="Nome Completo"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained"
                  type="submit"
                  color="primary"
                  size="large"
                  disabled={isPending}
                  fullWidth>Salvar</Button>
              </Box>
            </Box>
          </>
        }
      </Box>
    </Box>
  );
}
