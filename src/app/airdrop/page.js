// components/Modal.js
'use client'
import React, { useEffect, useState } from 'react';

export default function Airdrop() {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    // State variables to hold countdown values
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // Utility function to calculate the remaining time
    const calculateRemainingTimeBitcoin = () => {
        const targetDate = new Date('2024-04-24T17:55:00Z'); // Use UTC time for consistency
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        setDays(Math.floor(distance / day));
        setHours(Math.floor((distance % day) / hour));
        setMinutes(Math.floor((distance % hour) / minute));
        setSeconds(Math.floor((distance % minute) / second));
    };

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

    return (
        <main>
            <div className="inscribe airdrop-responsive">
                <div className="grp-airdrop">
                    <div className="time-div">
                        <div className="timer">

                            <div id="countdown">
                                <ul className="bit-ul">
                                    <li className='bit-li mob-height'>
                                        <span id="days">{days.toString().padStart(2, '0')}</span>
                                        <p>DAYS</p>
                                    </li>
                                    <div>:</div>
                                    <li className='bit-li mob-height'>
                                        <span id="hours">{hours.toString().padStart(2, '0')}</span>
                                        <p>HOURS</p>
                                    </li>
                                    <div>:</div>
                                    <li className='bit-li mob-height'>
                                        <span id="minutes">{minutes.toString().padStart(2, '0')}</span>
                                        <p>MINUTES</p>
                                    </li>
                                    <div>:</div>
                                    <li className='bit-li mob-height'>
                                        <span id="seconds">{seconds.toString().padStart(2, '0')}</span>
                                        <p>SECONDS</p>
                                    </li>
                                </ul>
                            </div>
                            <div className='bit-notice'><p>Halving Date ETA: <span>25th April 2024, 17:55UTC</span></p></div>
                            <div className="info-card2 none">
                                <div className="grp-card">
                                    <div className="single2">
                                        <span>840,000</span>
                                        <span>Event Block Height</span>
                                    </div>
                                    <div className="single2">
                                        <span>???</span>
                                        <span>Current Block Height</span>
                                    </div>
                                    <div className="single2">
                                        <span>650.0</span>
                                        <span>Block Time</span>
                                    </div>
                                </div>
                                <div className="grp-card">
                                    <div className="single2">
                                        <span>USD ????</span>
                                        <span>Exchange Rate</span>
                                    </div>
                                    <div className="single2">
                                        <span>BTC 1.2T</span>
                                        <span>Market Cap</span>
                                    </div>
                                    <div className="single2">
                                        <span>81.725T</span>
                                        <span>Difficulty</span>
                                    </div>
                                </div>
                            </div>
                            <div className="line none"></div>
                        </div>
                    </div>
                    <div className="modelx nopad">
                        <div className='inner-model'>
                        <div>
                            <input
                                type="text"
                                name="mintAmount"
                                placeholder="Wallet address"
                                className="inputx"
                            />
                        </div>
                        <div className="next">
                            <button className="allocate-btn">CHECK ALLOCATION</button>
                        </div>
                        <div className="allocation">0.00 $META <span>allocated</span></div>

                        <div className="info-card2 invert">
                                <div className="grp-card rowline2">
                                    <div className="single2 width-bypass">
                                        <span>Airdrop supply:</span>
                                        <span>1,000,000 $META</span>
                                    </div>
                                    <div className="single2 width-bypass">
                                        <span>Distribution:</span>
                                        <span>1,000 $META each</span>
                                    </div>
                                    <div className="single2 width-bypass">
                                        <span>Requirement:</span>
                                        <span>Top 1,000 Zealy leaderboard</span>
                                    </div>
                                    <div className="single2 width-bypass">
                                        <span>Distribution block:</span>
                                        <span>841,000</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
