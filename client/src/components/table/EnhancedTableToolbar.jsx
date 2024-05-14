import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import styled from '@emotion/styled';

const StyledAccordionSummary = styled(AccordionSummary)({
    pointerEvents: 'none',
    '& > .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'none !important'
    }
});

export default function (props) {
    const { tableHeading, FilterForm, AddLink } = props;
    const [shouldShowFilter, setShouldShowFilter] = useState(true);

    return (
        <Accordion expanded={shouldShowFilter}>
            <StyledAccordionSummary
                expandIcon={
                    <Tooltip title="Filter list">
                        <IconButton
                            disableRipple={true}
                            onClick={() => setShouldShowFilter(!shouldShowFilter)}
                            sx={{
                                backgroundColor: shouldShowFilter ? '#1976d2' : 'none',
                                color: shouldShowFilter ? '#ffffff' : '#1976d2',
                                pointerEvents: 'auto'
                            }}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                        {tableHeading}
                        {AddLink}
                    </Typography>
                </>
            </StyledAccordionSummary>
            <AccordionDetails>{FilterForm}</AccordionDetails>
        </Accordion>
    );
}
