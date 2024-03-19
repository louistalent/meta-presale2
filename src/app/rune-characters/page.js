'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";

export default function Rune() {

    useEffect(() => {
        const showPasswordInput = setTimeout(() => {
          const passDiv = document.querySelector('.pass');
          passDiv.classList.add('show');
        }, 11000);
    
        return () => clearTimeout(showPasswordInput);
      }, []);


    const [runesCode] = useState([5815, 5817, 5818, 5822, 5825, 5827, 5831, 5832, 5833, 5835, 5839, 5842, 5846, 5847, 5850, 5852, 5855, 5854, 5792, 5794, 5798, 5800, 5809, 5810]);

    useEffect(() => {
        setTimeout(() => {
            draw();
        }, 0);
    }, []);

    function draw() {
        let vegvisirPaths = document.querySelectorAll('#vegvisir path');
        let circle = document.getElementById('circle');

        for (let i = 0; i < vegvisirPaths.length; i += 1) {
            setStyle(vegvisirPaths[i], i)
        }

        setStyle(circle, vegvisirPaths.length);

        // Update runes
        const runesElems = document.querySelectorAll('.runex');
        runesElems.forEach((runeElem, i) => {
            runeElem.textContent = String.fromCharCode(runesCode[i]);
            runeElem.style.transform = `rotate(${15 * i}deg)`;
        });
    }

    function setStyle(element, i) {
        setTimeout(() => {
            element.setAttribute('style', `stroke: #E96356; stroke-dasharray: ${element.getTotalLength()}px; stroke-dashoffset: ${element.getTotalLength()}px; animation: line-animation 1s linear forwards 1s;`);
        }, 200 * i);
    }
    return (
        <div className="mys">
            <div className="squiggly-border">
                <div className="bg-imgs">
                    <div className='cloud-grp'>
                        <Image
                            src="/assets/left-cloud.png"
                            alt="left-cloudx"
                            className="left-cloudx"
                            layout="fill"
                            objectFit="contain"
                        />

                        <Image
                            src="/assets/right-cloud.png"
                            alt="right-cloudx"
                            className="right-cloudx"
                            layout="fill"
                            objectFit="contain"
                        />

                        <Image
                            src="/assets/left-cloud.png"
                            alt="bright-cloudx"
                            className="bright-cloudx"
                            layout="fill"
                            objectFit="contain"
                        />

                        <Image
                            src="/assets/right-cloud.png"
                            alt="bleft-cloudx"
                            className="bleft-cloudx"
                            layout="fill"
                            objectFit="contain"
                        />

                        <Image
                            src="/assets/book2.png"
                            alt="book"
                            className="book"
                            layout="fill"
                            objectFit="contain"

                        />
                    </div>

                    <div className='square'>
                        <div className="sq1">
                            <div></div>
                        </div>
                        <div className="sq2">
                            <div></div>
                        </div>
                    </div>

                    <div className="rune-circle">
                        <div id="cirlce-main">
                            <div id="outer-ring">
                                <div id="runes">
                                    {runesCode.map((runeCode, index) => (
                                        <div className="runex" key={index}>
                                            {String.fromCharCode(runeCode)}
                                        </div>
                                    ))}
                                </div>
                                <div id="inner-ring">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252 252" id="vegvisir">
                                        <g transform="translate(0 -799.362)" id="layer5" stroke="#000">
                                            <path id="path5037" d="M125 926.362h2" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path5045" d="M106 800.362v20h40v-20" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path5047" d="M111 830.362h30" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M111 840.362h30" id="path5053" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path5055" d="M111 850.362h30" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path5041" d="M126 925.362v-125" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M125.293 925.655l1.414 1.414" id="path5062" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path5068" d="M126.707 925.655l88.388-88.388" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M200.953 823.125l-14.142 14.142 28.284 28.284 14.143-14.142" id="path5070" fill="none" fillRule="evenodd"
                                                strokeWidth="2" />
                                            <path id="path5084" d="M162 862.101s10.621-3.55 21.228 7.057c10.606 10.606 7.07 21.213 7.07 21.213" fill="none"
                                                fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4238" d="M183.276 847.873s1.414 8.486 7.07 14.142c5.658 5.657 14.143 7.072 14.143 7.072" fill="none"
                                                fillRule="evenodd" strokeWidth="2" />
                                            <path d="M127 926.362h125" id="path4240" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4242" d="M252 906.362h-20v40h20" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M207 911.362v30" id="path4244" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M222 911.362s-5 7-5 15 5 15 5 15" id="path4252" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4254" d="M192 911.325s5 7 5 15-5 15-5 15" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M229.238 1001.304l-14.143-14.142-28.284 28.284 14.142 14.142" id="path4256" fill="none" fillRule="evenodd"
                                                strokeWidth="2" />
                                            <path d="M204.489 983.626l-21.213 21.213" id="path4258" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4260" d="M197.418 976.555l-21.213 21.213" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M190.347 969.484l-21.213 21.213" id="path4262" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M126.707 927.067l88.388 88.388" id="path4264" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4268" d="M151 1052.362v-20h-49v20" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4276" d="M125.999 927.362v125" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4280" d="M138.5 1052.362v-13h-25v12.957" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4282" d="M131 1051.362h-10" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4290" d="M156 1051.362h-10" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M156 1047.362h-10" id="path4292" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M107 1051.362H97" id="path4294" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4296" d="M107 1047.362H97" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4302" d="M144.5 1033.362v9" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M107.5 1033.362v9" id="path4326" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4332" d="M125.295 927.067l-88.388 88.388" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M51.048 1029.6l14.142-14.142-28.284-28.284-14.143 14.142" id="path4334" fill="none" fillRule="evenodd"
                                                strokeWidth="2" />
                                            <path id="path4336" d="M68.771 1004.634l-21.213-21.213" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M79.406 994.056s-8.485-1.414-14.142-7.071-7.07-14.142-7.07-14.142" id="path4340" fill="none"
                                                fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4342" d="M44.684 1021.822l-14.142-14.142" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M50.34 1016.165l-14.142-14.142" id="path4344" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M0 951.362h20v-49H0" id="path4346" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M125 926.36H0" id="path4348" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M0 938.862h19" id="path4350" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4376" d="M0 913.862h19" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path d="M125.301 925.655l-88.388-88.388" id="path4378" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4380" d="M33.377 854.944l7.115 7.115 21.126-21.3-7.028-7.028" fill="none" fillRule="evenodd"
                                                strokeWidth="2" />
                                            <path id="path4384" d="M50.89 872.343s1.415-8.485 7.071-14.142c5.657-5.657 14.143-7.071 14.143-7.071" fill="none"
                                                fillRule="evenodd" strokeWidth="2" />
                                            <path id="path4388" d="M40.448 854.944l14.142-14.142" fill="none" fillRule="evenodd" strokeWidth="2" />
                                            <circle id="circle" transform="rotate(-45)" r="6" cy="623.138" cx="-565.936" fill="none"
                                                strokeWidth="2.146" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pass'>
                    <p>Enter the Password </p>
                    <input type="password"></input>
                </div>
            </div>
        </div>
    );
}
