import { Box, Grid, Paper, Stack, styled } from "@mui/material";

function VendingMachineItemComponent() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#373737',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'white',
    }));


    return (
        <Item>
            VENDING ITEM
        </Item>
    )
}

export default VendingMachineItemComponent;