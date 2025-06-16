"use client"

import React from 'react'
import { Button } from '../ui/button';

const FlutterwaveInlinePayment = () => {

    const flutterwaveCheckout = async () => {
		// Configuration object for Flutterwave

		// 4187427415564246
		// 09/32
		// 828

		const config = {
			public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY, //'FLWPUBK_TEST-1be20327c289342ba366218d52a90e46-X',
			tx_ref: `trans_${new Date().getTime()}`,
			amount: 5,
			currency: 'USD',
			payment_options: 'card',
			customer: {
				email: 'codewelldev@gmail.com',
				phone_number: '07050241880',
				name: 'Chidi Michael',
			},
			// redirect_url: "",
			callback: (response) => {
				console.log(response); // Handle payment success
				// Send AJAX verification request to backend
				// verifyTransactionOnBackend(payment.id)
			},
			onclose: (incomplete: boolean) => {
				// Handle payment modal close
				console.log({incomplete});
				
			},
                configurations: {
                session_duration: 10, //Session timeout in minutes (maxValue: 1440 minutes)
                max_retry_attempt: 5, //Max retry (int)
            },
		};
		let result = window?.FlutterwaveCheckout(config);
		console.log(result);
		
	};
    
    return (
		<Button id="payment-button" className="bg-gray-950 text-white" onClick={flutterwaveCheckout}>Pay Now</Button>
    )
}

export default FlutterwaveInlinePayment
