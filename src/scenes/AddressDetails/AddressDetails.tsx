import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './AddressDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addSubmitUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';


interface FormValues {
    address: string;
    state: string;
    city: string;
    country: string;
    pincode: string;
}

const schema = yup.object().shape({
    address: yup.string().required('Address is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    pincode: yup.string().required('Pincode is required'),
});

const AddressDetails: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const stepone = useSelector((state: RootState) => state.user.stepOne);
    const userList  = useSelector((state: RootState) => state.user.userList);

    const dispatch = useDispatch();


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        let payload = { ...data,...stepone[0]};
        return dispatch(addSubmitUser(payload))
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
                                <TextField
                                    {...field}
                                    label="Country"
                                    error={!!errors.country}
                                    helperText={errors.country?.message}
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
