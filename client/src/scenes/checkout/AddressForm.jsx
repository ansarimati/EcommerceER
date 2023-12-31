import React from 'react';
import { useMediaQuery, TextField, Box } from '@mui/material';
import { getIn } from 'formik';



const AddressForm = ({
    type,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
}) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const formattedName = (field) => `${type}.${field}`

    const fromattedError = (field) => 
        Boolean(
            getIn(touched, formattedName(field)) &&  
            getIn(errors, fromattedError(field))
        );

    const formattedHelper = (field) =>
            getIn(touched, formattedName(field) && 
            getIn(errors, fromattedError(field))
        );

  return (
    <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repaet(4, minmax(0, 1fr))"
        sx={{
            "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4"
            }
        }}
    >
        <TextField 
            fullWidth
            type='text'
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            name={formattedName("firstName")}
            error={fromattedError("firstName")}
            helperText={formattedHelper("firstName")}
            sx={{
                gridColumn: "span 2"
            }}
        />

        <TextField 
            fullWidth
            type='text'
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            name={formattedName("lastName")}
            error={fromattedError("lastName")}
            helperText={formattedHelper("lastName")}
            sx={{
                gridColumn: "span 2"
            }}
        />

        <TextField 
            fullWidth
            type='text'
            label="Country"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.country}
            name={formattedName("country")}
            error={fromattedError("country")}
            helperText={formattedHelper("country")}
            sx={{
                gridColumn: "span 4"
            }}
        />

        <TextField 
            fullWidth
            type='text'
            label="Street Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street1}
            name={formattedName("street1")}
            error={fromattedError("street1")}
            helperText={formattedHelper("street1")}
            sx={{
                gridColumn: "span 2"
            }}
        />

        <TextField 
            fullWidth
            type='text'
            label="Street Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street2}
            name={formattedName("street2")}
            error={fromattedError("street2")}
            helperText={formattedHelper("street2")}
            sx={{
                gridColumn: "span 2"
            }}
        />

        <TextField 
            fullWidth
            type='text'
            label="City"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city}
            name={formattedName("city")}
            error={fromattedError("city")}
            helperText={formattedHelper("city")}
            sx={{
                gridColumn: "span 2"
            }}
        />

        <TextField 
            fullWidth
            type='text'
            label="State"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.State}
            name={formattedName("State")}
            error={fromattedError("State")}
            helperText={formattedHelper("State")}
            sx={{
                gridColumn: "span 1fr"
            }}
        />

        <TextField 
            fullWidth
            type='text'
            label="Zip Code"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.zipCode}
            name={formattedName("zipCode")}
            error={fromattedError("zipCode")}
            helperText={formattedHelper("zipCode")}
            sx={{
                gridColumn: "span 1fr"
            }}
        />
    </Box>
  )
}

export default AddressForm;