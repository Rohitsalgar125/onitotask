import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
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
    age: yup.string().required('Age is required').test('ispostive', 'Enter only positvie number', (value: string | any) => {
        const regex = /^[0-9]*\.?[0-9]+$/
        if (value.length === 0) {
            return true
        }
        else {
            return value.match(regex)
        }

    }),
    sex: yup.string().required('Sex is required'),
    mobile: yup.string().required('Mobile is required'),
    idType: yup.string().required('ID Type is required'),
    id: yup.string().required('ID is required').when('idType', {
        is: (value: string | any) => value === "PAN",
        then: (schema: object | any) => schema.max(10, 'it should be 10 characters').min(10, 'it should be 10 characters'),
        otherwise: (schema: object | any) => schema.max(12, 'it should be 12 character').min(12, 'it should be 12 characters')
    }),
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
                    <Typography sx={{ fontWeight: '700' }}>Personal Details</Typography>

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
                            <FormControl>
                                <InputLabel id="Sex">Sex</InputLabel>
                                <Controller
                                    name="sex"
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Sex"
                                            labelId='Sex'
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
                            </FormControl>
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
                            <FormControl>
                                <InputLabel id="idType">ID Type</InputLabel>
                                <Controller
                                    name="idType"
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="idType"
                                            labelId='idType'
                                            error={!!errors.idType}
                                            className={styles.dropdwon}
                                        >
                                            <MenuItem value="PAN">PAN</MenuItem>
                                            <MenuItem value="Aadhar">Aadhar</MenuItem>
                                        </Select>
                                    )}
                                />
                                <Typography className={styles.errorMsg}>{errors.idType?.message}</Typography>
                            </FormControl>
                        </Box>

                        <Controller
                            name="id"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="ID"
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
