import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import AppTheme from './theme/AppTheme';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, removeAuth } from '../../reduxs/reducers/authReducers';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { Grid2 } from '@mui/material';
import TextComponent from '../../components/TextComponent';
import { apis } from '../../constrants/apis';
import eventAPI from '../../apis/eventAPI';
import { Validate } from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';
import LoadingModal from '../../modals/LoadingModal';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    border: 'none',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    // boxShadow:
    //     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    // ...theme.applyStyles('dark', {
    //     boxShadow:
    //         'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    // }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    height: '100vh',
    // padding: theme.spacing(2),
    // [theme.breakpoints.up('sm')]: {
    //     padding: theme.spacing(4),
    // },
    backgroundColor: 'white',
    // '&::before': {
    //     content: '""',
    //     display: 'block',
    //     position: 'absolute',
    //     zIndex: -1,
    //     inset: 0,
    //     backgroundImage:
    //         'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    //     backgroundRepeat: 'no-repeat',
    //     ...theme.applyStyles('dark', {
    //         backgroundImage:
    //             'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    //     }),
    // },
}));

export default function LoginPage(props: any) {
    // const [emailError, setEmailError] = React.useState(false);
    // const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    // const [passwordError, setPasswordError] = React.useState(false);
    // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [errorMessage,setErrorMessage] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = React.useState(false)
    const auth = useSelector((state: any) => state.auth)
    // React.useEffect(()=>{
    //     dispatch(removeAuth())
    // },[])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // if (emailError || passwordError) {
        //     event.preventDefault();
        //     return;
        // }
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        event.preventDefault();
    };
   
    const loginGoogle = () => {
        navigate('/organizer/EventPage')    
    }
    const handleOnchange = (e: any, name: 'email' | 'password') => {
        const target = e.target as HTMLInputElement;
        if (name === 'email') {
            setEmail(target.value)
        } else if (name === 'password') {
            setPassword(target.value)
        }
    }

    const handleCallAPILogin = async () => {    
        const emailValidation = Validate.email(email)
        if(email && password){
          if (emailValidation) {
            try {
                setIsLoading(true)
              const res:any = await authenticationAPI.HandleAuthentication(apis.auth.login(), { email, password }, 'post');
              if(res && res.status===200){
                dispatch(addAuth({...res.data,loginMethod:'account'}))
                navigate('/organizer/EventPage')    
              }
              setIsLoading(false)
            } catch (error:any) {
                setIsLoading(false)
              const errorMessage = JSON.parse(error.message)
              if(errorMessage.statusCode === 403){
                setErrorMessage(errorMessage.message)
              }else{
                setErrorMessage('Đăng nhập thất bại')
              }
            }
          }
          else {
            setErrorMessage('Email không đúng dịnh dạng!!!')
          }
        }
        else {
          setErrorMessage('Hãy nhập đầy đủ thông tin')
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid2 container>
                <Grid2 component={"div"} size={{ lg: 8, xs: 0, md: 6 }} sx={{
                    display: {
                        lg: 'block',
                        md: 'block',
                        xs: 'none'
                    }
                }}>
                    <Box sx={{
                        height: '100vh', width: '100%', position: 'relative',
                        backgroundImage: 'url(https://img.freepik.com/free-photo/blue-surface-with-study-tools_23-2147864592.jpg)',
                        backgroundSize: 'cover', objectFit: '', backgroundPosition: 'center'
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)' // Điều chỉnh màu sắc và độ mờ của lớp phủ
                        }} />
                        <Box sx={{ position: 'relative', padding: {
                            lg:'150px 100px',
                            md:'100px 50px',

                        }, width: '100%' }} >
                            <h1 style={{ fontWeight: 'bold', fontSize: 50 }}>Trang quản lý sự kiện</h1>
                            <TextComponent size={16} mb={16}  text='Chào mừng bạn đến với hệ thống quản lý EventHub, giải pháp trọn gói của bạn để tổ chức và quản lý sự
                                kiện hiệu quả. Tại đây, bạn có thể tạo sự kiện mới, cập nhật sự kiện hiện có và theo dõi hiệu suất sự kiện bằng dữ liệu thời gian thực.'/>

                            <TextComponent size={16} text='Khám phá các tính năng, tùy chỉnh cài đặt sự kiện và tận dụng sức mạnh
                                của công nghệ để mang đến trải nghiệm đặc biệt cho người tham dự.'/>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 component={"div"} size={{ lg: 4, xs: 12, md: 6 }}>
                    <AppTheme {...props} >
                        <SignInContainer direction="column" justifyContent="space-between" >
                            <Card variant="outlined">
                                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img style={{ width: '100%', maxWidth: 300 }} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-WlQ_o8q2pBl-bCv6N9XZgWhFaa4b_DRUw&s'} />
                                </Box>
                                <TextComponent size={28} fontWeight={500} text='Đăng nhập tài khoản'/>
                                <Box
                                    // component="form"
                                    // onSubmit={handleSubmit}
                                    // noValidate
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        gap: 2,
                                    }}
                                >
                                    <FormControl>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <TextField
                                            // error={emailError}
                                            // helperText={emailErrorMessage}
                                            id="email"
                                            type="email"
                                            name="email"
                                            onChange={(e) => handleOnchange(e, 'email')}
                                            placeholder="examle@gmail.com"
                                            autoComplete="email"
                                            autoFocus
                                            required
                                            fullWidth
                                            variant="outlined"
                                            value={email}
                                            // color={emailError ? 'error' : 'primary'}
                                            sx={{ ariaLabel: 'email' }}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                                            <Link
                                                component="button"
                                                type="button"
                                                onClick={handleClickOpen}
                                                variant="body2"
                                                sx={{ alignSelf: 'baseline' }}
                                            >
                                                Quên mật khẩu?
                                            </Link>
                                        </Box>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={(e) => handleOnchange(e, 'password')}
                                            value={password}
                                            name="password"
                                            placeholder="••••••"
                                            // error={passwordError}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Nhớ mật khẩu"
                                    />
                                    {errorMessage && <p className='mb-0 text-center text-red-500'>{errorMessage}</p>}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={handleCallAPILogin}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Box>
                                {/* <Divider>or</Divider> */}
                                {/* <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => loginGoogle()}
                                    startIcon={<GoogleIcon />}
                                >
                                    Đăng nhập bằng google
                                </Button> */}
                            </Card>
                            <LoadingModal visible={isLoading} />
                        </SignInContainer>
                    </AppTheme>
                </Grid2>
            </Grid2>
        </Box>

    );
}
