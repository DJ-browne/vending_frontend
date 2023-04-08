import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Product {
    id: number;
    image: string;
    price: number;
    name: string;
    quantity: string;
}

interface props {
    item: Product
    handleCartUpdate: (newItem: Record<string, any>) => void
}

function VendingMachineItemComponent(props: props) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#373737',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'white',
    }));


    return (
        <Item sx={{ padding: '0px' }} style={{ cursor: props.item.quantity === "0" ? 'not-allowed' : "pointer" }} onClick={() => {
            if (props.item.quantity !== "0") {
                props.handleCartUpdate(props.item)
            }

        }} className="vending_machine_item">
            <div >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '3px 6px 3px 6px' }}>
                    <Typography
                        variant="caption"
                        noWrap
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontSize: 22,
                            fontWeight: 700,
                            textDecoration: 'none',
                        }}
                    >{props.item.name}</Typography>
                    {props.item.quantity == "0" ? <Typography
                        variant="caption"
                        noWrap
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontSize: 22,
                            fontWeight: 700,
                            textDecoration: 'none',
                            color: 'red'
                        }}
                    >SOLD OUT</Typography>
                        : <Typography
                            variant="caption"
                            noWrap
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontSize: 22,
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >x{props.item.quantity}</Typography>}
                </div>
                <div style={{ minHeight: '1px', maxHeight: '1px', width: '100%', backgroundColor: "#1F1F1F" }}>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '3px 6px 3px 6px' }}>
                    <img width={50} src={require(`../images/${props.item.image}`)} />
                </div>
                <div style={{ minHeight: '1px', maxHeight: '1px', width: '100%', backgroundColor: "#1F1F1F" }}>

                </div>
                <div style={{ width: '100%', backgroundColor: '#1D1D1D', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', minHeight: '30px', backgroundColor: "#373737", borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px' }}>
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: 20,
                                fontWeight: 700,
                                textDecoration: 'none'
                            }}
                        >₩{props.item.price}</Typography>
                    </div>
                </div>
            </div>
            {/* 
            VENDING ITEM PRICE -- {props.item.price}<br/>
            VENDING ITEM NAME -- {props.item.name}<br/> */}
        </Item>
    )
}

export default VendingMachineItemComponent;