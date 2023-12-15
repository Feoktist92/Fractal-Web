import React, { FC } from 'react';
import {
    Step,
    StepLabel,
    Stepper,
    Typography,
    StepIconProps,
} from '@mui/material';
import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { Check } from '@mui/icons-material';

const steps = [1, 2, 3];

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color:
            theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#A6A6A6',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#5558FA',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#5558FA',
            zIndex: 1,
            fontSize: 22,
        },
        '& .QontoStepIcon-circle': {
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    })
);

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 7,
        left: 'calc(-50% + 13px)',
        right: 'calc(50% + 13px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#5558FA',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#5558FA',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: '8px',
        borderRadius: 4,
    },
}));

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className='QontoStepIcon-completedIcon' />
            ) : (
                <div className='QontoStepIcon-circle' />
            )}
        </QontoStepIconRoot>
    );
}

interface StepsProps {
    activeStep: number;
}

const Steps: FC<StepsProps> = ({ activeStep }) => {
    return (
        <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
        >
            {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>
                        <Typography
                            component='div'
                            sx={{
                                marginTop: '-4px',
                                fontFamily: 'TTTravels-Medium',
                                fontSize: '14px',
                                fontWeight:
                                    index === activeStep ? '700' : '500',
                                lineHeight: '20px',
                                color:
                                    index === activeStep ? '#5558FA' : '#666',
                            }}
                        >
                            {label}
                        </Typography>
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default Steps;
