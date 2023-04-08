import { Box, Button, CircularProgress, Grid, Paper, Stack, Typography, styled } from "@mui/material";

import VendingMachineItemComponent from "../components/VendingMachineItemComponent"
import React, { useEffect } from "react";


interface props {
    depositFundsForUser: () => void
    depositedFunds: Number
    withdrawFundsForUser: () => void
}

function VendingMachineComponent(props: props) {

    interface Product {
        id: number;
        image: string;
        price: number;
        name: string;
        quantity: string;
    }


    useEffect(() => {
        //Call backend and get users for appbar dropdown
        const getUserList = async () => {

            const response = await fetch("http://localhost:5000/vending_items");
            const jsonData = await response.json();
            setVendingMachineItems(jsonData)
            setIsRetrievingItems(false)

        }
        getUserList();
        return () => {

        }
    }, []);
    const [vendingMachineItems, setVendingMachineItems] = React.useState<Product[]>([]);
    const [isRetrievingVendingMachineItems, setIsRetrievingItems] = React.useState<boolean>(true);

    const [cartList, setCartList] = React.useState<Record<string, any>[]>([]);

    const handleCartUpdate = (newItem: Record<string, any>) => {
        const currentCartList = cartList;

        const indexOfExistingItem = currentCartList.findIndex((e) => e.id === newItem.id);
        if (indexOfExistingItem !== -1) {
            //It exists in the cart already...
            // alert("ALREADY EXISTS IN CART..")

            //Find existing item in array and increase quantityInCart property
            const newItems = [...cartList];
            newItems[indexOfExistingItem].quantityInCart = newItems[indexOfExistingItem].quantityInCart + 1;
            newItems[indexOfExistingItem].totalPrice = parseInt(newItems[indexOfExistingItem].totalPrice) + parseInt(newItem.price);

            setCartList(newItems)
        } else {
            //Add new item to cart
            newItem.quantityInCart = 1;
            newItem.totalPrice = newItem.price;
            const updatedCartList = [...currentCartList, newItem]
            setCartList(updatedCartList)
        }

        //Decrease number of items in machine
        const indexOfExistingItemInMachine = vendingMachineItems.findIndex((e) => e.id === newItem.id);
        const existinVendingItems = [...vendingMachineItems];

        existinVendingItems[indexOfExistingItemInMachine].quantity = (parseInt(existinVendingItems[indexOfExistingItemInMachine].quantity) - 1).toString()

        setVendingMachineItems(existinVendingItems)
    }

    return (
        <div>
            <div className="vending_machine_container">
                <Box sx={{ width: '100%' }}>
                    {isRetrievingVendingMachineItems ? <CircularProgress /> : <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {vendingMachineItems.map((e) => {
                            return (<Grid key={e.id} item xs={4}>
                                <VendingMachineItemComponent handleCartUpdate={handleCartUpdate} item={e} />
                            </Grid>)
                        })}
                    </Grid>
                    }
                </Box>
            </div>
            <div className="vending_machine_container_bottom">
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            fontFamily: 'monospace',
                            fontSize: 20,
                            fontWeight: 700,
                            textDecoration: 'none'
                        }}
                    >Your items</Typography>

                </div>

                <hr style={{ marginBottom: '20px', borderColor: 'rgba(255,255,255,0.4)' }} />
                {cartList.length === 0 ? <Typography
                    variant="caption"
                    noWrap
                    sx={{
                        fontFamily: 'monospace',
                        fontSize: 16,
                        fontWeight: 700,
                        textDecoration: 'none'
                    }}
                >Your cart is empty</Typography> : cartList.map((e, index) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', width: '40%', borderBottom: '1px solid rgba(255,255,255,0.4)', marginBottom: '14px', justifyContent: 'space-between', alignItems: 'center' }} key={e.id}>
                            <div>
                                <img style={{ marginRight: '10px' }} width={20} src={require(`../images/${e.image}`)} />
                                <span style={{ marginRight: '10px' }}>{e.name}</span>
                                <span>x {e.quantityInCart}</span>
                            </div>
                            <div>

                                <span>₩{e.totalPrice.toLocaleString()}</span>
                            </div>

                        </div>
                    )
                })}
                {cartList.length !== 0 && <Typography
                    variant="caption"
                    noWrap
                    sx={{
                        fontFamily: 'monospace',
                        fontSize: 16,
                        fontWeight: 800,
                        color: '#FFDE2F',
                        textDecoration: 'none'
                    }}
                >Cart total:  ₩{cartList.reduce((n, { totalPrice }) => n + parseInt(totalPrice), 0)}</Typography>}

                <hr style={{ marginBottom: '20px', borderColor: 'rgba(255,255,255,0.4)' }} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: 20,
                                fontWeight: 700,
                                textDecoration: 'none'
                            }}
                        >Deposited funds</Typography>
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: 16,
                                fontWeight: 700,
                                textDecoration: 'none'
                            }}
                        >₩{props.depositedFunds.toString()}</Typography>
                    </div>
                    <div>
                        {props.depositedFunds !== 0 && <Button className="custom_button" sx={{ backgroundColor: '#06A77D', color: 'black', border: 'none' }} onClick={props.withdrawFundsForUser} variant="contained">Withdraw</Button>}
                        <Button className="custom_button" onClick={props.depositFundsForUser} variant="contained" sx={{ marginLeft: '20px', border: 'none', backgroundColor: '#06A77D', color: 'black' }}>Deposit ₩1,000</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VendingMachineComponent;