"use client"
import Image from "next/image";
import { useState } from "react";

const CopyButton = ({ inviteLink }: { inviteLink?: string }) => {
    const [copied, setCopied] = useState(false);

    function legacyCopy(value: string) {
        const ta = document.createElement('textarea')
        ta.value = value ?? ''
        ta.style.position = 'absolute'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
      }

    const handleCopy = async () => {
        if (!inviteLink) {
            console.warn("Invite link is not available");
            return;
        }

        try {
            // await navigator.clipboard.writeText(`https://t.me/nwscoin_admin_test_bot/app?startapp=${inviteLink}`);
            legacyCopy(`https://t.me/nwscoin_test_bot/app?startapp=${inviteLink}`)
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset text after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div
            className="bg-gradient-to-r from-[#e30f2e] to-[#db1360] flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl mt-1 min-w-20 cursor-pointer"
            onClick={handleCopy}
        >
            <Image className="h-6 w-6" src={"/image/copy.png"} alt="Copy Icon" width={24} height={24} />
            <div className="text-white text-xs">{copied ? "Copied" : "Copy"}</div>
        </div>
    );
};

export default CopyButton;
