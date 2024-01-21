import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button,  TextField, Typography, Autocomplete } from '@mui/material';
import styles from './AddressDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addSubmitUser, clearStepOne } from '../../redux/userSlice';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';


interface FormValues {
    address: string;
    state: string;
    city: string;
    country: string;
    pincode: string;
}

const schema = yup.object().shape({
    address: yup.string(),
    state: yup.string(),
    city: yup.string(),
    country: yup.string().required('Country is required'),
    pincode: yup.string().required('Pincode is required'),
});

const AddressDetails: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const [countries, setCountries] = useState([])

    const fetchCountries = async () => {
        let response = await fetch("https://restcountries.com/v3.1/all")
        let responseData = await response.json()
        return responseData
    }

    useEffect(() => {
        (async () => {
            let countries = await fetchCountries()
            setCountries(countries)
        })()
    }, [])

    const stepone = useSelector((state: RootState) => state.user.stepOne);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        let payload = { ...data, ...stepone[0] };
        dispatch(clearStepOne());
        dispatch(addSubmitUser(payload));
        navigate('/userlist')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={styles.mainDiv}>
                <Box className={styles.subMainDiv}>
                    <Typography>Address Details</Typography>

                    <Box className={styles.subDiv}>

                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address"
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            )}
                        />
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={countries.map((e) => e.name.common)}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Country" />}
                                />
                            )}
                        />
                    </Box>
                    <Box className={styles.subDiv}>

                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="State"
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                />
                            )}
                        />
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="City"
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                />
                            )}
                        />

                    </Box>
                    <Box className={styles.subDiv}>

                        <Controller
                            name="pincode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Pincode"
                                    error={!!errors.pincode}
                                    helperText={errors.pincode?.message}
                                />
                            )}
                        />
                    </Box>

                    <Button type="submit" variant="contained" color="primary" className={styles.submitBtn}>
                        Submit
                    </Button>


                </Box>

            </Box>
        </form>
    );
};

export default AddressDetails;
