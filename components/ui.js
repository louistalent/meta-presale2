"use client"
import react, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import { Box } from "@mui/system";
import { motion, AnimatePresence } from 'framer-motion'
import {
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography,
    Stack,
    AccordionSummary,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { isMobile } from "mobile-device-detect";
import { getAddress, sendBtcTransaction } from "sats-connect";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoadingButton from "@mui/lab/LoadingButton";
import toast, { Toaster } from "react-hot-toast";
import { useWebContext } from "../context";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 478,
    bgcolor: "white",
    borderRadius: "12px",
    boxShadow: 24,
    display: "flex",
};

const Mstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "280px",
    bgcolor: "white",
    borderRadius: "12px",
    boxShadow: 24,
    display: "flex",
};

const mobileWalletStyle = {
    display: "flex",
    gap: "40px",
    alignItems: "start",
    textTransform: "none",
    color: "black",
    justifyContent: "start",
    fontSize: '14px',
    fontWeight:'bold'
}

export default function Ui() {
    const [state, { dispatch }] = useWebContext();

      const [isOpen, setIsOpen] = useState(false)

        const menuVariants = {
            open: { opacity: 1, y: 0 },
            closed: { opacity: 0, y: '100%' },
        }

        const handleClickMenu = () => {
            setIsOpen(!isOpen)
        }
        const handleCloseMenu = () => {
            setIsOpen(false) // Close the menu
        }


    // ------------------
    const [openModal, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (connected) {
            setAnchorEl(event.currentTarget);
        } else {
            handleOpen();
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //   -------------------------------

    const [walletConnectModal, setWalletConnectModal] = useState(false);
    const [address, setAddress] = useState(null);
    const [unisatInstalled, setUnisatInstalled] = useState(false);
    const [connected, setConnected] = useState(false);
    const [publicKey, setPublicKey] = useState("");
    const [timeEnded, setTimeEnded] = useState(false);
    const [network, setNetwork] = useState("livenet");
    const [balance, setBalance] = useState({
        confirmed: 0,
        unconfirmed: 0,
        total: 0,
    });
    const [depositValue, setDepositValue] = useState(0);

    const [selectedwallet, setSelectedwallet] = useState("unisat");

    const selfRef = useRef({
        accounts: [],
    });

    const self = selfRef.current;

    const getBasicInfo = async () => {
        const unisat = window.unisat;
        const [address] = await unisat.getAccounts();
        setAddress(address)
        dispatch({
            type: "address",
            payload: address
        });

        const publicKey = await unisat.getPublicKey();
        setPublicKey(publicKey);

        const balance = await unisat.getBalance();
        setBalance(balance);
        dispatch({
            type: "balance",
            payload: balance
        });

        const network = await unisat.getNetwork();
        setNetwork(network);
    };

    const ConnectWallet = async () => {
        try {
            const result = await unisat.requestAccounts();
            const balance = await unisat.getBalance();
            setBalance(balance);
            dispatch({
                type: "balance",
                payload: balance
            });
            handleAccountsChanged(result);
            console.log(result)
            setConnected(true);
            setOpen(false);
            setSelectedwallet("unisat");
            dispatch({
                type: "selectedwallet",
                payload: 'unisat'
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const XverseWalletConnect = async () => {
        try {
            const getAddressOptions = {
                payload: {
                    purposes: ["payment"],
                    message: "Address for receiving payments",
                    network: {
                        // type: "Testnet",
                        type: "Mainnet",
                    },
                },
                onFinish: (response) => {
                    console.log(response);
                    setAddress(response.addresses[0].address)
                    dispatch({
                        type: "address",
                        payload: response.addresses[0].address
                    });
                    setConnected(true);
                    setOpen(false);
                    setSelectedwallet("xverse");
                    dispatch({
                        type: "selectedwallet",
                        payload: 'xverse'
                    });
                },
                onCancel: () => toast.error("Request canceled"),
            };

            await getAddress(getAddressOptions);
        } catch (error) {
            console.log(error);
        }
    };

    const OkxWalletConnect = async () => {
        try {
            if (typeof window.okxwallet === "undefined") {
                toast.error("OKX is not installed!");
            } else {
                const result = await window.okxwallet.bitcoin.connect();
                setAddress(result.address)
                dispatch({
                    type: "address",
                    payload: result.address
                });
                setConnected(true);
                setOpen(false);
                setSelectedwallet("okx");
                dispatch({
                    type: "selectedwallet",
                    payload: 'okx'
                });
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const LeatherWalletConnect = async () => {
        try {
            const userAddresses = await window.btc?.request("getAddresses");
            const usersNativeSegwitAddress = userAddresses.result.addresses.find(
                (address) => address.type === "p2wpkh"
            );
            setAddress(usersNativeSegwitAddress.address)
            dispatch({
                type: "address",
                payload: usersNativeSegwitAddress.address
            });
            setConnected(true);
            setOpen(false);
            setSelectedwallet("leather");
            dispatch({
                type: "selectedwallet",
                payload: 'leather'
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleAccountsChanged = (_accounts) => {
        // if (self.accounts[0] === _accounts[0]) {
        //   // prevent from triggering twice
        //   setOpen(false);
        //   return;
        // }
        self.accounts = _accounts;
        if (_accounts.length > 0) {

            setConnected(true);

            dispatch({
                type: "connected",
                payload: true
            });
            setAddress(_accounts[0])
            dispatch({
                type: "accounts",
                payload: _accounts[0]
            });

            getBasicInfo();
        } else {
            setConnected(false);
            dispatch({
                type: "connected",
                payload: false
            });
        }
        setWalletConnectModal(false);
    };

    const handleNetworkChanged = (network) => {
        setNetwork(network);
        getBasicInfo();
    };

    const DisconnectWallet = () => {
        setConnected(false);
        setBalance({
            confirmed: 0,
            unconfirmed: 0,
            total: 0,
        });
        dispatch({
            type: "accounts",
            payload: []
        });
        handleClose();
    };


    return (
        <div className="main">
            <Toaster />

            <div className="square-deco-container contain">
                <div className="noise"></div>
                <div className="square-deco-content">
                    <div className="art">
                        <div>
                            <div className="icons-social">
                                <a href="">
                                    <img src="/assets/discord.png" className="iconsx" />
                                </a>
                                <a href="https://x.com/metarunes21">
                                    <img src="/assets/twitter.png" className="iconsx" />
                                </a>
                                <a href="https://doc.metarunes.io">
                                    <img src="/assets/doc.png" className="iconsx" />
                                </a>
                            </div>

                            <div className="logo">
                                <Link href="/" >
                                    <Image
                                        src="/assets/metaicon.png"
                                        alt="logo"
                                        className="logo-g"
                                        layout="fill"
                                        objectFit="contain"
                                        priority
                                    />
                                </Link>
                            </div>
                            {!connected ? (
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? "basic-menu" : undefined}
                                    aria-haspopup="true"
                                    className="connect"
                                    variant="contained"
                                    onClick={handleClick}
                                >
                                    {isMobile ? "Connect" : "connect"}
                                </Button>
                            ) : (
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? "basic-menu" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    className="connect"
                                    variant="contained"
                                >
                                    {address.slice(0, 6) +
                                        "..." +
                                        address.slice(address.length - 4, address.length)}
                                </Button>
                            )}

                            <Menu
                                id="basic-menu"
                                sx={{
                                    zIndex:99999999,
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        zIndex: 9999999999,
                                        position: 'fixed',
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.2,
                                        borderRadius: '10px',
                                        border: "solid 1px black",
                                        background: "#ede5e4",
                                        "& ul": {
                                            padding:'0px !important',
                                            backgroundColor: "#ede5e4",
                                            borderRadius:'11px'
                                        },
                                        "& .MuiAvatar-root": {
                                            width: 65,
                                            height: 32,
                                            ml: 0,
                                            mr: 1,
                                        },
                                        "&:before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            border:'solid 1px black',
                                            top: 0,
                                            right: 14,
                                            backgroundColor: "#ede5e4",
                                            width: 10,
                                            height: 10,
                                            transform: "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem onClick={handleClose} sx={{ fontSize: "15px",fontWeight:'bold' }}>
                                    {address ? (
                                        address.slice(0, 6) +
                                        "..." +
                                        address.slice(address.length - 4, address.length)
                                    ) : (
                                        <></>
                                    )}
                                </MenuItem>
                                <MenuItem onClick={DisconnectWallet} sx={{ fontSize: "15px",fontWeight:'bold' }}>
                                    Disconnect
                                </MenuItem>
                            </Menu>
                        </div>


                        <Image
                            src="/assets/floating.webp"
                            alt="floating island"
                            className="float"
                            layout="fill"
                            objectFit="contain"
                            priority
                        />
                        <Image
                            src="/assets/spiral.webp"
                            alt="spiral"
                            className="spiral"
                            layout="fill"
                            objectFit="contain"
                        />
                        <Image
                            src="/assets/rune.webp"
                            alt="rune"
                            className="rune"
                            layout="fill"
                            objectFit="contain"
                        />

                        <div className="footer">
                            <div className="inner-footer">
                                <div><Link href="/" className="hover-menu" data-hover="HOME">HOME</Link></div>
                                <div><Link href="/presale" className="hover-menu" data-hover="PRESALE">PRESALE</Link></div>
                                <div><Link href="/inscribe" className="hover-menu" data-hover="INSCRIBE">INSCRIBE</Link></div>
                                <div> <Link href="/launchpad" className="hover-menu" data-hover="LAUNCHPAD">LAUNCHPAD</Link></div>
                                <div> <Link href="/faqs" className="hover-menu" data-hover="FAQ">FAQ</Link></div>
                                <div> <Link href="/airdrop" className="hover-menu" data-hover="AIRDROP">AIRDROP</Link></div>
                                <div><Link href="/rune-characters" className="hover-menu" data-hover="???">???</Link></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="square-deco-inner">


                    <Image
                        src="/assets/clouds/cloud1.webp"
                        alt="clouds one"
                        className="cloud1"
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                    <Image
                        src="/assets/clouds/cloud2.webp"
                        alt="clouds two"
                        className="cloud2"
                        layout="fill"
                        objectFit="contain"
                    />
                    <Image
                        src="/assets/clouds/cloud3.webp"
                        alt="clouds tree"
                        className="cloud3"
                        layout="fill"
                        objectFit="contain"
                    />
                    <Image
                        src="/assets/clouds/cloud4.webp"
                        alt="clouds four"
                        className="cloud4"
                        layout="fill"
                        objectFit="contain"
                    />
                    <Image
                        src="/assets/clouds/cloud4.webp"
                        alt="clouds five"
                        className="cloud5"
                        layout="fill"
                        objectFit="contain"
                    />


                    <Image
                        src="/assets/star.webp"
                        alt="star"
                        className="star"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                <div className="square-deco-square-left-top"></div>
                <div className="square-deco-square-left-bottom"></div>
                <div className="square-deco-square-right-top"></div>
                <div className="square-deco-square-right-bottom"></div>
                <div className="square-deco-tall"></div>
                <div className="square-deco-wide"></div>
            </div>

            <div className="mobile-menu">
                <button onClick={handleClickMenu} className="hamburger-icon">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="menu"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <button onClick={handleCloseMenu} className="close-button">
                                X
                            </button>
                            <ul>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/presale">Presale</Link>
                                </li>
                                <li>
                                    <Link href="/inscribe">Inscribe</Link>
                                </li>
                                <li>
                                    <Link href="/launchpad">Launchpad</Link>
                                </li>
                                <li>
                                    <Link href="/faqs">Faq</Link>
                                </li>
                                <li>
                                    <Link href="/airdrop">Airdrop</Link>
                                </li>
                                <li>
                                    <Link href="/rune-characters">???</Link>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Modal
                open={openModal}
                className="modal-index"
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {isMobile ? (
                    <Box sx={Mstyle}>
                        <Stack
                            sx={{
                                flex: "1",
                                bgcolor: "#d3d3d3",
                                borderRadius: "12px",
                                px: 5,
                                py: 4,
                            }}
                        >
                            {/* <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                mb={2}
                            >
                                Connect a Wallet
                            </Typography> */}
                            <Button
                                sx={mobileWalletStyle}
                                onClick={ConnectWallet}
                            >
                                <img
                                    src={'/assets/wallet/unisat.jpg'}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "5px",
                                    }}
                                />{" "}
                                <Box>
                                    Unisat Wallet
                                </Box>
                            </Button>

                            <Button
                                onClick={XverseWalletConnect}
                                sx={mobileWalletStyle}
                            >
                                <img
                                    src={'/assets/wallet/xverse.jpg'}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "5px",
                                    }}
                                />{" "}
                                <Box>
                                    Xverse Wallet
                                </Box>
                            </Button>

                            <Button
                                onClick={OkxWalletConnect}
                                sx={mobileWalletStyle}
                            >
                                <img
                                    src={'/assets/wallet/okx.png'}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "5px",
                                    }}
                                />{" "}
                                <Box>
                                    Okx Wallet
                                </Box>
                            </Button>

                            <Button
                                onClick={LeatherWalletConnect}
                                sx={mobileWalletStyle}
                            >
                                <img
                                    src={'/assets/wallet/leather.jpg'}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "5px",
                                    }}
                                />{" "}
                                <Box>
                                    Leather Wallet
                                </Box>
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    <Box sx={style}>
                        <Stack
                            sx={{
                                flex: "1",
                                bgcolor: "#d3d3d3",
                                borderRadius: "12px 0px 0px 12px",
                                p: 4,
                            }}
                        >
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                mb={5}
                            >
                                Connect a Wallet
                            </Typography>
                            <Button
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    textTransform: "none",
                                    color: "black",
                                    justifyContent: "flex-start",
                                }}
                                onClick={ConnectWallet}
                            >
                                <img
                                    src={'/assets/wallet/unisat.jpg'}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "5px",
                                    }}
                                />{" "}
                                Unisat Wallet
                            </Button>
                            <Button
                                onClick={XverseWalletConnect}
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    textTransform: "none",
                                    color: "black",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <img
                                    src={'/assets/wallet/xverse.jpg'}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "5px",
                                    }}
                                />{" "}
                                Xverse Wallet
                            </Button>
                            <Button
                                onClick={OkxWalletConnect}
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    textTransform: "none",
                                    color: "black",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <img
                                    src={'/assets/wallet/okx.png'}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "5px",
                                    }}
                                />{" "}
                                Okx Wallet
                            </Button>
                            <Button
                                onClick={LeatherWalletConnect}
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    textTransform: "none",
                                    color: "black",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <img
                                    src={'/assets/wallet/leather.jpg'}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "5px",
                                    }}
                                />{" "}
                                Leather Wallet
                            </Button>
                        </Stack>
                        <Stack
                            sx={{ flex: "2", borderRadius: "0px 12px 12px 0px", p: 4 }}
                        >
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                mb={5}
                            >
                                What is a Wallet?
                            </Typography>
                            <Typography variant="h6" component="h5" mb={2}>
                                Easy Login
                            </Typography>
                            <Typography id="modal-modal-description" mb={5}>
                                No need to create new accounts and passwords for every
                                website. Just connect your wallet and get going.
                            </Typography>
                            <Typography variant="h6" component="h5" mb={2}>
                                Store your Digital Assets
                            </Typography>
                            <Typography id="modal-modal-description" mb={5}>
                                Send, receive, store, and display your digital assets like
                                NFTs & coins.
                            </Typography>
                        </Stack>
                    </Box>
                )}
            </Modal>

        </div>
    );
}
