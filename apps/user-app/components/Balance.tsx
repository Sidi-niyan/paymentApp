"use client";

import { useBalance } from "@repo/store/hooks/useBalance";


function Balance() {
	const value = useBalance();
    console.log(value)
	return <p></p>;
}

export default Balance;