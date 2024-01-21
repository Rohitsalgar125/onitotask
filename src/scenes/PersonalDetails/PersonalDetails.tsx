import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import styles from './PersonalDetails.module.css';
import { addStepOne } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


interface FormValues {
    name: string;
    age: string;
    sex: string;
    mobile: string;
    idType: string;
    id: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Minimum 3 characters required'),
    age: yup.string().required('Age is required'),
    sex: yup.string().required('Sex is required'),
    mobile: yup.string().required('Mobile is required'),
    idType: yup.string().required('ID Type is required'),
    id: yup.string().required('ID is required'),
});

const PersonalDetails: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
         dispatch(addStepOne(data));
         navigate('/addressdetails')

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={styles.mainDiv}>
                <Box className={styles.subMainDiv}>
                    <Typography>Personal Details</Typography>

                    <Box className={styles.subDiv}>

                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="age"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Age"
                                    error={!!errors.age}
                                    helperText={errors.age?.message}
                                />
                            )}
                        />
                    </Box>
                    <Box className={styles.subDiv}>
                        <Box>

                            <Controller
                                name="sex"
                                
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Sex"
                                        error={!!errors.sex}
                                        className={styles.dropdwon}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                )}
                            />
                            <Typography className={styles.errorMsg}>{errors.sex?.message}</Typography>
                        </Box>
                        <Controller
                            name="mobile"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Mobile"
                                    error={!!errors.mobile}
                                    helperText={errors.mobile?.message}
                                />
                            )}
                        />

                    </Box>
                    <Box className={styles.subDiv}>
                        <Box>
                            <Controller
                                name="idType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Id Type"
                                        error={!!errors.sex}
                                        className={styles.dropdwon}

                                    >
                                        <MenuItem selected> ID Type</MenuItem>
                                        <MenuItem value="Aadhar">Aadhar</MenuItem>
                                        <MenuItem value="PAN">PAN</MenuItem>
                                    </Select>
                                )}
                            />
                            <Typography className={styles.errorMsg}>{errors.idType?.message}</Typography>
                        </Box>

                        <Controller
                            name="id"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Id"
                                    error={!!errors.id}
                                    helperText={errors.id?.message}
                                />
                            )}
                        />
                    </Box>

                    <Button type="submit" variant="contained" color="primary" className={styles.submitBtn}>
                        Next Step
                    </Button>


                </Box>

            </Box>
        </form>
    );
};

export default PersonalDetails;
