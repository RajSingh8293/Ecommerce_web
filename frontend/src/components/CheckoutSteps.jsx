/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            lable: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            lable: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            lable: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ]

    const stepStyle = {
        boxSizing: 'border-box',
    }
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? 'tomato' : 'rgba(0, 0, 0, 0.649)',
                            }}
                            icon={item.icon}
                        >
                            {item.lable}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    )
}

export default CheckoutSteps