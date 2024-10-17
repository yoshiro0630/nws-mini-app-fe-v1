"use client"
import React, { useEffect, useState } from 'react';
import Success from './success';

const OperationResult = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setShowSuccess(true); // Show the component

        const timer = setTimeout(() => {
            setShowSuccess(false); // Hide the component after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    return (
        <div>
            {showSuccess && <Success />}
        </div>
    );
};

export default OperationResult;