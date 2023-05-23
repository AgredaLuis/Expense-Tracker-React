import React, { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";

const TransactionForm = () => {
  const { addTransaction } = useGlobalState();

  /* en qeu se gasto o gano dinero */
  const [description, setDescription] = useState();

  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      id: window.crypto.randomUUID(),
      description,
      /* el operador + antes del nobmre convierte todo a entero */
      amount: +amount,
    });
    setDescription("");
    setAmount(0);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a Description"
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={description}
        />
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          onChange={(e) => setAmount(e.target.value)}
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={amount}
        />
        <button
          className="bg-indigo-700 text-white px-3 py-2 rounded-lg block  mb-2 w-full"
          disabled={!description || !amount}
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
