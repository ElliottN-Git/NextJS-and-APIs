'use client' //required so that API call works client-side

import React, { useState, useEffect } from 'react';

// initalise for throttleFunction as 0 so that it always triggers on first click
let prev = 0;

export default function Home() {

    //Throttle function to limit the number of API calls the user can make (i.e. by spamming the button)
    const throttleFunction = (func, delay) => {
        // Current called time of the function
        let now = new Date().getTime();
        // Logging the difference between previously
        // called and current called timings
        let timeElapsed = now - prev;
        // If difference is greater than delay call
        // the function again.
        if (timeElapsed > delay) {
            prev = now;
            return func();
        }
    }

    const [data, setData] = useState({});

    const parseForm = (formName) => {
        const form = document.getElementById(formName);
        const formData = new FormData(form);
        const payLoad = new URLSearchParams(formData);
        const payLoadStr = payLoad.toString();
        getBoredApiRand(payLoad);
        return;
    }

    const getBoredApiRand = async (params) => {
        const res = await fetch(`https://www.boredapi.com/api/activity/?${params}`);
        const repo = await res.json();
        setData(repo);
        return repo;
    }

    useEffect(() => {
        getBoredApiRand();
    }, []); //[] second empty argument required so it only runs once on load to get initial data

    return (
        <section className='sectionContainer'>
            <section className='slide purp-green flex flex-col items-center text-white'>
                <header className='font-vm font-bold'>
                    <h2 className='m-3 text-center'>Bored API!</h2>
                    <h3 className='mx-7 my-3 text-2xl text-center'>Are you bored? Select your preferences and click &apos;Give me something to do!&apos;
                    </h3>
                    <h3 className='text-2xl text-center'>If you&apos;re feeling really adventurous, simply hit &apos;Randomise&apos;. Enjoy!</h3>
                </header>

                <section className='preferencesContainer'>
                    <form className='prefForm' id="prefForm">
                        <label className='mr-2'>Accessibility:</label>
                        <input type='number' min='0' max='1' step='0.1' name="accessibility" className='text-black text-center' />
                        {/* <input type='range' min='0' max='1' step='0.1' name="accessibility" className='text-black' /> */}
                        {/* <output htmlFor="accessibility" className='output' value='1'></output> */}

                        <label className='ml-5 mr-2'>Type:</label>
                        {/* <input type='text'></input> */}
                        <select name="type" className='text-black'>
                            <option value={""}></option>
                            <option value={"education"}>Education</option>
                            <option value={"recreational"}>Recreational</option>
                            <option value={"social"}>Social</option>
                            <option value={"diy"}>Diy</option>
                            <option value={"charity"}>Charity</option>
                            <option value={"cooking"}>Cooking</option>
                            <option value={"relaxation"}>Relaxation</option>
                            <option value={"music"}>Music</option>
                            <option value={"busywork"}>Busywork</option>
                        </select>

                        <label className='ml-5 mr-2'>Participants:</label>
                        <input type='number' min='1' max='8' name="participants" className='text-black text-center' />

                        <label className='ml-5 mr-2'>Price:</label>
                        <input type='number' min='0.0' max='1.0' step='0.1' name="price" className='text-black text-center' />
                    </form>
                </section>

                <section className='buttonContainer flex flex-row'>
                    <button
                        type='button'
                        className='bg-orange-400 rounded m-5 w-60 h-10 text-l shadow-lg hover:underline hover:border hover:bg-orange-500'
                        form="prefForm"
                        value="Submit"
                        onClick={() => parseForm("prefForm")} //Update to throttle as well
                    // onClick={() => throttleFunction(getBoredApiRand, 500)}
                    >
                        Give me something to do!
                    </button>
                    <button
                        type='button'
                        className='bg-purple-400 rounded m-5 w-60 h-10 text-xl shadow-lg hover:underline hover:border hover:bg-purple-500'
                        onClick={() => throttleFunction(getBoredApiRand, 500)}
                    >
                        Randomise!
                    </button>
                </section>

                <section className='boredApiOutPut flex flex-col w-full justify-center items-center'>
                    <section>
                        <label className='text-left mr-3'>Activity: </label>
                        <p>{data.activity}</p>
                    </section>
                    <section>
                        <label className='text-left mr-3'>Accessibility: </label>
                        <p>{data.accessibility}</p>
                    </section>
                    <section>
                        <label className='text-left mr-3'>Type: </label>
                        <p>{data.type}</p>
                    </section>
                    <section>
                        <label className='text-left mr-3'>Participants: </label>
                        <p>{data.participants}</p>
                    </section>
                    <section>
                        <label className='text-left mr-3'>Price: </label>
                        <p>{data.price}</p>
                    </section>
                    <section>
                        <label className='text-left mr-3'>Link: </label>
                        <p>
                            <a href={data.link != "" ? data.link : null}
                                className={data.link != "" ? 'hover:underline' : ""} //'hover:underline'
                            >
                                {data.link != "" ? data.link : "N/A"}
                            </a>
                        </p>
                    </section>
                    {/* <p>"key": ""</p> */}
                </section>
                {/* <section className='flex flex-col items-left w-full text-xl mr-3'> */}
                {/* <p>{data.activity}</p> */}
                {/* <p>"key": ""</p> */}
                {/* </section> */}
                {/* </section> */}

            </section>
            <section className='slide orange-red'>
                <h2>Section 2 header</h2>
            </section>
            <section className='slide blue-pink'>
                <h2>Section 3 header</h2>
            </section>
        </section >
    )
    // return <Link href="/testing_folder">Dashboard</Link>
}