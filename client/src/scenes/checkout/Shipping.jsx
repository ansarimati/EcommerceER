import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import AddressForm from './AddressForm';



const Shipping = ({ values, errors, touchued, handleBlur, handleChange, setFieldValue }) => {
    console.log("values", values)
  return (
    <Box m="30px auto">
        {/* BILLING FORM */}
        <Box>
            <Typography sx={{ mb: "15px" }} fontSize="18px">
                Billing Information
            </Typography>

            <AddressForm 
                type="billingAddress"
                values={values.billingAddress}
                errors={errors}
                touched={touchued}
                handleBlur={handleBlur}
                handleChange={handleChange}
            />
        </Box>

        <Box mb="20px">
            <FormControlLabel
                label="Same for Shipping Address" 
                control={
                    <Checkbox 
                        defaultChecked
                        value={values.shippingAddress.isSameAddress}
                        onChange={() => {
                            console.log("values", values)
                            setFieldValue(
                                "shippingAddress.isSameAddress",
                                !values.shippingAddress.isSameAddress
                            )
                        }
                        }
                    />
                }
            />
        </Box>


        {/* SHIPPING FORM */}
        {!values.shippingAddress.isSameAddress &&  (
            <Box>
                <Typography sx={{ mb: "15px" }} fontSize="18px">
                    Shipping Information
                </Typography>

                <AddressForm 
                    type="shippinggAddress"
                    values={values.shippingAddress}
                    errors={errors}
                    touched={touchued}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                />
            </Box>
        )}
    </Box>
  )
}

export default Shipping;