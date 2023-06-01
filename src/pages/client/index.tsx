import React, { useEffect } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { IoMdCalendar, IoMdCard } from "react-icons/io";
import { set } from "zod";
import UserNavbar from "~/components/UserNavbar";
import { Card } from "~/types/card";

type Props = {};

const Client = (props: Props) => {
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
  } as any);

  const [cards, setCards] = React.useState([]);

  const [deposit, setDeposit] = React.useState({
    deposit: false,
    card_id: -1,
    amount: 0,
  });

  const updateBalance = () => {
    fetch(`/api/payments/${deposit.card_id}/deposit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: deposit.amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          setCards(
            cards.map((e) =>
              e.card_id === deposit.card_id
                ? {
                    ...e,
                    balance: parseInt(e.balance) + parseInt(deposit.amount),
                  }
                : e
            )
          );
        }
        setDeposit({ deposit: false, card_id: -1, amount: 0 });
        alert("Balance updated successfully");
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/login";
    } else {
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
          } else {
            setUser(data[0]);
          }
        });
    }

    fetch(`/api/cards/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          setCards(data);
        }
      });
  }, []);

  return (
    <div>
      <UserNavbar username={user.firstName + " " + user.lastName} />
      <div className="flex h-full min-h-[100vh] w-full flex-col bg-neutral-100 py-4">
        <div className="flex min-h-[50vh] w-3/4 flex-col self-center rounded border bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-semibold">{cards.length} Cards</h1>
          <div className="mt-4 flex flex-col gap-y-4">
            {cards.map((card: Card) => (
              <div className="flex flex-col gap-y-2 rounded-lg border bg-neutral-50 p-4 shadow-sm">
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-3">
                    <IoMdCard className="text-2xl" />
                    <h2 className="text-xl font-light">{card.card_id}</h2>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="rounded-full border border-orange-500 bg-orange-200 p-1">
                      <FaMoneyBill className="text-2xl text-orange-400" />
                    </div>
                    <h2 className="text-xl font-semibold">${card.balance}</h2>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h2 className="text-lg font-light">
                    {new Date(card.renewalAt).toDateString()}
                  </h2>
                  <h2 className="text-lg font-semibold">{card.type}</h2>
                </div>
                <div className="flex gap-x-2">
                  {deposit.deposit && deposit.card_id == card.card_id && (
                    <>
                      <input
                        placeholder="Enter amount"
                        type="number"
                        value={deposit.amount}
                        onChange={(e) =>
                          setDeposit({ ...deposit, amount: +e.target.value })
                        }
                        className="input"
                      ></input>
                      <button
                        onClick={() =>
                          updateBalance(card.card_id, deposit.amount)
                        }
                        className="addButton w-fit p-2"
                      >
                        Deposit
                      </button>
                    </>
                  )}
                  {!deposit.deposit && (
                    <button
                      className="addButton w-fit p-2"
                      onClick={() =>
                        setDeposit({
                          deposit: true,
                          card_id: card.card_id,
                          amount: 0,
                        })
                      }
                    >
                      Deposit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
