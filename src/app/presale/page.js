'use client'
// Import React, useEffect, useState
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useWebContext } from "../../../context";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const depositAddress = 'bc1pzem4hsc4d3pa8yyv5ugp7gjnc5rhmsvrqff6637se5824ata4frspl9py3';
const APIkey = "de393074-46fd-4414-a5ec-cbd08e691d32";
const presaleTime = "2024-03-25T12:20:50";

const minimumValue = 0.00001; // BTC
const maxValue = 0.2;// BTC


export default function Presale() {

    const [amount, setAmount] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [allocationInput, setAllocationInput] = useState('');
    const [bitcoinPrice, setBitcoinPrice] = useState(1);
    const [state, { dispatch }] = useWebContext();
    const { address, accounts, balance, selectedwallet } = state;
    const pricePerToken = 0.055;

    const handleAmountChange = (event) => {
        const inputAmount = event.target.value;
        setAmount(inputAmount);
    };

    const calculateTokenAmount = () => {
        // getBitcoinPrice();
        if (!isNaN(amount) && amount !== '') {
            const tokenAmount = (parseFloat(amount) * bitcoinPrice) / pricePerToken;
            return tokenAmount.toFixed(2);
        }
        return '';
    };

    const handleCheckAllocation = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAllocationInputChange = (event) => {
        setAllocationInput(event.target.value);
    };

    const handleCheckAllocationSubmit = () => {
        // Add logic to check allocation based on the input
        // For demonstration, let's just log the input value
        console.log("Checking allocation for:", allocationInput);
    };
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    // State variables to hold countdown values
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // Define constants for time units
    // const second = 1000,
    //     minute = second * 60,
    //     hour = minute * 60,
    //     day = hour * 24;

    // State variables to hold countdown values
    // const [days, setDays] = useState(0);
    // const [hours, setHours] = useState(0);
    // const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(0);

    // useEffect to update countdown values
    // useEffect(() => {
    // Calculate the target date for countdown
    // const countdown = new Date('2024-02-30').getTime();

    // Interval to update countdown every second
    // const interval = setInterval(() => {
    // Current time
    // const now = new Date().getTime();
    // Calculate distance from now to target date
    // const distance = countdown - now;

    // Calculate remaining days, hours, minutes, seconds
    // setDays(Math.floor(distance / day));
    // setHours(Math.floor((distance % day) / hour));
    // setMinutes(Math.floor((distance % hour) / minute));
    // setSeconds(Math.floor((distance % minute) / second));

    // If countdown reaches zero, clear interval
    // if (distance < 0) {
    //     clearInterval(interval);
    // You can add any action you want here
    //     }
    // }, 1000);

    // Cleanup function to clear interval
    // return () => clearInterval(interval);
    // }, []); Empty dependency array to run effect only once




    const depositCoinonUnisat = async () => {
        if (window.unisat?._network === "livenet") {
            if (accounts[0]) {
                if (amount >= minimumValue && amount <= maxValue) {
                    if (balance.total / 10 ** 8 >= amount) {
                        try {
                            let txid = await window.unisat.sendBitcoin(
                                depositAddress,
                                Number((amount * 100000000).toFixed())
                            );
                            // let data = await axios.post(
                            //     `${server_url}/api/payment/deposit`,
                            //     {
                            //         txid,
                            //         address: accounts[0],
                            //         amount: amount,
                            //     }
                            // );
                            // if (data === "exist") {
                            //     toast.error("Tx Id Already Exist!");
                            // } else {
                            toast.success("Deposit Successed!");
                            // }
                        } catch (e) {
                            toast.error(e.message);
                        }
                    } else {
                        toast.error("Insufficiance the Balance!");
                    }
                } else {
                    toast.error("Invalid deposit amount");
                }
            } else {
                toast.error("Please connect wallet");
            }
        } else {
            toast.error("please change network to live");
        }
    };

    const depositCoinonXverse = async () => {
        if (address) {
            if (amount >= minimumValue && amount <= maxValue) {
                try {
                    const sendBtcOptions = {
                        payload: {
                            network: {
                                type: "Mainnet",
                            },
                            recipients: [
                                {
                                    address: depositAddress,
                                    amountSats: BigInt(
                                        String(amount * 10 ** 8).split(".")[0]
                                    ),
                                },
                            ],
                            senderAddress: address,
                        },
                        onFinish: async (txid) => {
                            // let data = await axios.post(
                            //     `${server_url}/api/payment/deposit`,
                            //     {
                            //         txid,
                            //         address: address,
                            //         amount: amount,
                            //     }
                            // );
                            // if (data === "exist") {
                            //     toast.error("Tx Id Already Exist!");
                            // } else {
                            toast.success("Deposit Successed!");
                            // }
                        },
                        onCancel: () => toast.error("Canceled"),
                    };

                    await sendBtcTransaction(sendBtcOptions);

                } catch (e) {
                    toast.error(e.message);
                }
            } else {
                toast.error("Invalid deposit amount");
            }
        } else {
            toast.error("Please connect wallet");
        }
    };

    const depositCoinonOkx = async () => {
        if (address) {
            if (amount >= minimumValue && amount <= maxValue) {
                try {
                    const result = await window.okxwallet.bitcoin.send({
                        from: address,
                        to: depositAddress,
                        value: amount,
                    });

                    // let data = await axios.post(`${server_url}/api/payment/deposit`, {
                    //     txid: result.txhash,
                    //     address: address,
                    //     amount: amount,
                    // });
                    // if (data === "exist") {
                    //     toast.error("Tx Id Already Exist!");
                    // } else {
                    toast.success("Deposit Successed!");
                    // }

                } catch (e) {
                    toast.error(e.message);
                }
            } else {
                toast.error("Invalid deposit amount");
            }
        } else {
            toast.error("Please connect wallet");
        }
    };

    const depositCoinonLeather = async () => {
        if (address) {
            if (amount > 0) {
                toast.error(
                    <>
                        Already Staked!
                        <br />
                        Please withdraw all and Try again
                    </>
                );
            } else {
                if (amount >= minimumValue && amount <= maxValue) {
                    try {
                        const resp = await window.btc?.request("sendTransfer", {
                            address: depositAddress,
                            amount: (amount * 10 ** 8).toFixed(7),
                        });

                        // let data = await axios.post(`${server_url}/api/payment/deposit`, {
                        //     txid: resp.result.txid,
                        //     address: address,
                        //     amount: amount,
                        // });
                        // if (data === "exist") {
                        //     toast.error("Tx Id Already Exist!");
                        // } else {
                        toast.success("Deposit Successed!");
                        // }

                    } catch (e) {
                        toast.error(e.error.message);
                    }
                } else {
                    toast.error("Invalid deposit amount");
                }
            }
        } else {
            toast.error("Please connect wallet");
        }
    };

    const depositCoin = () => {
        const time = new Date();
        const endTime = new Date(presaleTime);
        if (time.getTime() < endTime.getTime()) {
            toast.error('you can`t deposit. please wait presale')
            return;
        }
        if (time.getTime() >= endTime.getTime()) {
            setTimeEnded(true)
            console.log('sdfsd')
        }

        if (selectedwallet === "unisat") {
            depositCoinonUnisat();
        } else if (selectedwallet === "xverse") {
            depositCoinonXverse();
        } else if (selectedwallet === "okx") {
            depositCoinonOkx();
        } else if (selectedwallet === "leather") {
            depositCoinonLeather();
        }
    };

    const calculateRemainingTimeBitcoin = () => {
        const targetDate = new Date(presaleTime); // Use UTC time for consistency
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        setDays(Math.floor(distance / day));
        setHours(Math.floor((distance % day) / hour));
        setMinutes(Math.floor((distance % hour) / minute));
        setSeconds(Math.floor((distance % minute) / second));
    };

    const getBitcoinPrice = async () => {
        const result = await axios('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')

        console.log('result')
        console.log(result.data.price);
        setBitcoinPrice(result.data.price);
        // https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC
    }
    // useEffect with empty dependency array to run the countdown logic only once
    useEffect(() => {
        calculateRemainingTimeBitcoin();

        // Interval to update the countdown every second
        const interval = setInterval(() => {
            calculateRemainingTimeBitcoin();

            // Check if countdown has reached zero and clear interval
            let distance = 0;
            if (distance < 0) {
                clearInterval(interval);
            }
        }, second);

        // Cleanup function to clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getBitcoinPrice();
    }, [])

    // JSX for Mint component
    return (
        <main>
            <div className='inscribe presale-responsive'>
                <div className="Mint">
                    <div className="box-mint">

                        <div className="card-main">
                            <div className="input-group-inline">
                                <div className="top-amount">
                                    <div><p>Amount</p></div>

                                    <div className='balance'>Balance: {balance.total} BTC</div>
                                </div>
                                <div className='input-amount'>


                                    <input
                                        placeholder='00.00'
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        title="Please enter only numeric values"
                                    />
                                    {/* <button>Max</button> */}
                                    <span className="btc-mini">
                                        <div>
                                            <img
                                                src="/assets/bitcoin.png"
                                                className="btc"
                                                alt="logo"
                                            />
                                        </div>

                                        <p>BTC</p>
                                    </span>
                                </div>
                            </div>

                            <div className="recieve">
                                <div className="top-amount">
                                    <div><p>Recieve</p></div>
                                    {/* <div className='balance'>Balance: 0.02BTC</div> */}
                                </div>

                                <div className='bot-recieve'>
                                    <div className="amount-btc">
                                        <input
                                            disabled
                                            value={calculateTokenAmount()}
                                            className='btc-token'
                                            placeholder='00.00'
                                        >

                                        </input>
                                    </div>

                                    <span className="btc-mini">
                                        <div>
                                            <img
                                                src="/assets/meta.png"
                                                className="btc"
                                                alt="logo"
                                            />
                                        </div>
                                        <p>META</p>
                                    </span>
                                </div>

                            </div>



                            <div className="dashed-border">
                                <div className="info-group">
                                    <div className="sub-info">
                                        <div className="info">Price</div>
                                        <div>0.055$</div>
                                    </div>

                                    <div className="sub-info">
                                        <div className="info">Minimum Buy</div>
                                        <div>0.00001 BTC</div>
                                    </div>

                                    <div className="sub-info">
                                        <div className="info">Maximum Buy</div>
                                        <div>0.2 BTC</div>
                                    </div>

                                    <div className="sub-info">
                                        <div className="info">Softcap</div>
                                        <div>TBA</div>
                                    </div>

                                    <div className="sub-info">
                                        <div className="info">Hardcap</div>
                                        <div>TBA</div>
                                    </div>

                                    <div className="sub-info">
                                        <div className="info">Total raised</div>
                                        <div>0.00</div>
                                    </div>

                                    <div className="sub-info">
                                        <div className="info">
                                            Starts in
                                        </div>
                                        <div>
                                            {days.toString().padStart(2, '0')}&nbsp;:&nbsp;
                                            {hours.toString().padStart(2, '0')}&nbsp;:&nbsp;
                                            {minutes.toString().padStart(2, '0')}&nbsp;:&nbsp;
                                            {seconds.toString().padStart(2, '0')}&nbsp;:&nbsp;
                                        </div>
                                    </div>

                                    {/* <div className="sub-info">
                                        <div className="info">Ends in</div>
                                        <div>10th May</div>
                                    </div> */}
                                </div>

                            </div>

                            <div className="button-group">
                                <button onClick={depositCoin}>BUY</button>
                                <button>REFUND</button>
                            </div>

                            {/* <div className='main-all'>
                                <button onClick={handleCheckAllocation}>Check Allocation</button>
                            </div> */}





                        </div>





                    </div>

                    <div className="modalx">
                        <div className="modal-content">
                            {/* <span className="close" onClick={handleCloseModal}>&times;</span> */}

                            <div className="modal-grp">
                                <div className="grp-first">
                                    <div className="allocated">
                                        <div className="top-amount">
                                            <div><p>Wallet Address</p></div>

                                            {/* <div className='balance'>Balance: 0.02BTC</div> */}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Wallet Address"
                                            value={allocationInput}
                                            className='modal-input'
                                            onChange={handleAllocationInputChange}
                                        />

                                    </div>

                                    <div className='checked-allocation'>
                                        <div className="top-amount">
                                            <div><p>Allocated</p></div>

                                            {/* <div className='balance'>Balance: 0.00BTC</div> */}
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="0.00 Allocated"
                                            disabled
                                            className='modal-input'

                                        />
                                    </div>

                                    <div className='details-all'>
                                        <div className="info-card">
                                            <div className="grp-card rowline">
                                                <div className="single width-bypass">
                                                    <span>Presale supply:</span>
                                                    <span>20,000,000 $META</span>
                                                </div>
                                                <div className="single width-bypass">
                                                    <span>Distribution method:</span>
                                                    <span>Airdrop</span>
                                                </div>
                                                <div className="single width-bypass">
                                                    <span>Launch Price:</span>
                                                    <span>0.15$</span>
                                                </div>
                                                <div className="single width-bypass">
                                                    <span>Distribution block:</span>
                                                    <span>840,000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="check-all" onClick={handleCheckAllocationSubmit}>CHECK ALLOCATION</button>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
