'use client';
// Inscribe.js

import React, { useState, useEffect } from 'react';

export default function Inscribe() {
    const [activeButton, setActiveButton] = useState('mint');
    
    const showForm = (buttonName) => {
        setActiveButton(buttonName);
    };

    useEffect(() => {
        // Your useEffect logic here
    }, []);

    return (
        <main>
            <div className="inscribe">
                <div className="box">
                    <div className="titlex">
                        <h2>RUNE INSCRIBE</h2>
                        <p>Inscribe RUNE standard tokens</p>
                    </div>

                    <div className="btn-grp">
                        <button
                            className={activeButton === 'mint' ? 'active' : 'test'}
                            onClick={() => showForm('mint')}
                        >
                            Mint
                        </button>
                        <button
                            className={activeButton === 'deploy' ? 'active' : 'test'}
                            onClick={() => showForm('deploy')}
                        >
                            Deploy
                        </button>
                        <button
                            className={activeButton === 'transfer' ? 'active' : 'test'}
                            onClick={() => showForm('transfer')}
                        >
                            Transfer
                        </button>
                    </div>

                    <div className='forms-main'>
                        <form style={{ display: activeButton === 'mint' ? 'block' : 'none' }}>
                            <div className="form">
                                <div><input type="text" name="mintAmount" placeholder='Tick (like RUNE..)' className="inputx" /></div>
                                <div><input type="text" name="limitAmount" placeholder='Amount' className="inputx" /></div>

                                <div className="line"></div>
                                <div className="alert"><p> button active when the user goes to the page, you can set the initial state, Heres how you can</p></div>
                                <div className="next"><button>Next</button></div>
                            </div>
                        </form>

                        <form style={{ display: activeButton === 'deploy' ? 'block' : 'none' }}>
                            <div className="form">
                                <div><input type="text" name="mintAmount" placeholder='Tick (like RUNE..)' className="inputx" /></div>
                                <div><input type="text" name="supplyAmount" placeholder='Supply' className="inputx" /></div>
                                <div><input type="text" name="limitAmount" placeholder='Limit' className="inputx" /></div>
                                <div><input type="text" name="limitAmount" placeholder='Decimals' className="inputx" /></div>

                                <div className="line"></div>
                                <div className="alert"><p> button active when the user goes to the page, you can set the initial state, Heres how you can</p></div>
                                <div className="next"><button>Next</button></div>
                            </div>
                        </form>

                        <form style={{ display: activeButton === 'transfer' ? 'block' : 'none' }}>
                            <div className="form">
                                <div><input type="text" name="mintAmount" placeholder='Tick (like RUNE..)' className="inputx" /></div>
                                <div><input type="text" name="limitAmount" placeholder='Amount' className="inputx" /></div>

                                <div className="line"></div>
                                <div className="alert"><p> button active when the user goes to the page, you can set the initial state, Heres how you can</p></div>
                                <div className="next"><button>Next</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
