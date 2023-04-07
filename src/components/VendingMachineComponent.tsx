import { Box, Grid, Paper, Stack, styled } from "@mui/material";

import VendingMachineItemComponent from "../components/VendingMachineItemComponent"

function VendingMachineComponent() {

    

    return (
        <div>
            <div className="vending_machine_container">
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                        <Grid item xs={4}>
                            <VendingMachineItemComponent />
                        </Grid>
                    </Grid>


                </Box>
            </div>
            <div className="vending_machine_container_bottom">
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={1}>
                        <div>
                            <h4>Deposited funds:</h4>
                            <h3>₩0</h3>
                        </div>
                        <div >123</div>
                        <div>456</div>
                    </Stack>
                </Box>


            </div>
        </div>
    )
}

export default VendingMachineComponent;