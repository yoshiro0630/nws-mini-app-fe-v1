import Image from "next/image";
import { useEffect, useState } from "react";

interface WithdrawModalProps {
  coin?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawModal({ coin, isOpen = true, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  if (!isOpen) return null;

  const handleWithdraw = () => {
    console.log(`Withdrawing ${amount} $NWS to ${address}`);
    onClose();
  };

  const buttonValues = [100, 200, 500];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className={`fixed bottom-0 bg-[#ED1147] rounded-t-xl border-t-4 border-yellow-400 w-full transform transition-transform duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-purple-300 hover:text-white"
        >
          <Image src="/image/close.svg" alt="Close" width={24} height={24} />
        </button>
        <div className="p-6 space-y-6">
          <div className="flex justify-center items-center">
            <Image src={"/image/coin.png"} alt="" width={88} height={88} />
          </div>
          <h2 className="text-2xl font-bold text-white text-center">
            Withdraw $NWS
          </h2>
          <div>
            <p className="text-white mb-2">Amount:</p>
            <div className="grid grid-cols-3 gap-2">
              {buttonValues.map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  disabled={coin === undefined || coin < value} // Disable button if coin is less than value
                  className={`py-2 rounded ${
                    amount === value
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  } ${coin === undefined || coin < value ? "opacity-50 cursor-not-allowed" : ""}`} // Add styles for disabled state
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white mb-2">Address:</p>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address Format: client|xxxx_xxxx"
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            <p className="text-green-400 text-sm mt-1 cursor-pointer hover:underline">
              How to find my NodewavesChain address?
            </p>
          </div>
          <p className="text-black text-sm text-center">
            Incorrect addresses will result in losses.
            <br />
            You will receive tokens in 72 hrs
          </p>
          <button
            onClick={handleWithdraw}
            className="w-full py-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-colors"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}