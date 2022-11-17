import './App.css';

import React, { useState, useEffect } from 'react'
import ApiServices from './services/db-service';
import { getDocs, query, where } from 'firebase/firestore';
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const App = ({ id, owned, close, expires }) => {
    const app = initializeApp(config.firbaseConfig);
    const db = getFirestore(app);
    const [spin, setSpin] = useState(false)
    const [isFinish, setFinish] = useState(false);
    const [ring1, setRing1] = useState()
    const [ring2, setRing2] = useState()
    const [ring3, setRing3] = useState()
    const [price, setPrice] = useState()
    const [result, setResult] = useState();
    const [input, setInput] = useState()
    const [realBet, setRealBet] = useState()
    const [jackpot, setJackpot] = useState(0)
    const [ip, setIp] = useState();
    const [balance, setBalance] = useState(0)
    const [docID, setDocID] = useState();
    const [isRecommend, setIsRecommend] = useState(false);
    const [recMessage, setRecMessage] = useState();
    const [show, setShow] = useState(false);
    const [loseCount, setLoseCount] = useState(0);

    const handleClose = () => {
        setIsRecommend(false);
        setShow(false);

    }
    const handleShow = () => setShow(true);

    useEffect(() => {


        win()
        if (ip) {
            ApiServices().checkRecommend(ip).then((res) => {

                console.log(res);
                if (res.recommend != null) {
                    setIsRecommend(true);
                    setRecMessage(res.recommend);
                    ApiServices().writeUserData("GENIE SHOW", res.recommend, ip, realBet, balance);
                }
            });
        }

    }, [ring3])

    useEffect(() => {

        fetchIP();
    }, [])

    const fetchIP = async () => {

        await fetch('https://geolocation-db.com/json/').then(res => {
            return res.json();
            // setIp(res["data"]["IPv4"]);
        }).then(res => {
            console.log(res.IPv4)
            setIp(res.IPv4)
            getUsers(res.IPv4);

        })

    }

    const getUsers = async (ipa) => {

        const q = query(collection(db, "genie-bls-users"), where("ip_address", "==", ipa));

        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                ApiServices().addUserData(ipa);
            } else {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    setDocID(doc.id);
                    setBalance(doc.data().amount);
                })
            }
        } catch {
            console.log("NO USERS")
        }


    }

    function addTopup(credit) {
        const topup = balance + credit
        setBalance(topup)
        ApiServices().updateUsers(docID, topup, ip);
        ApiServices().writeUserData("TOP UP", credit, ip, 0, topup);
    }


    function row1() {

        if (!spin) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        } else if (spin && ring1 == undefined) {
            return (
                <>
                    <div className="ringMoving">🍓</div>
                    <div className="ringMoving">🍇</div>
                    <div className="ringMoving">🍊</div>
                    <div className="ringMoving">🥭</div>
                </>
            )
        } else if (ring1 >= 1 && ring1 <= 50) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        } else if (ring1 > 50 && ring1 <= 75) {
            return (
                <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                </>
            )
        } else if (ring1 > 75 && ring1 <= 95) {
            return (
                <>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                </>
            )
        } else if (ring1 > 95 && ring1 <= 100) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        }
    }

    function row2() {

        if (!spin) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        } else if (spin && ring2 == undefined) {
            return (
                <>
                    <div className="ringMoving">🍓</div>
                    <div className="ringMoving">🍇</div>
                    <div className="ringMoving">🍊</div>
                    <div className="ringMoving">🥭</div>
                </>
            )
        } else if (ring2 >= 1 && ring2 <= 50) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        } else if (ring2 > 50 && ring2 <= 75) {
            return (
                <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                </>
            )
        } else if (ring2 > 75 && ring2 <= 95) {
            return (
                <>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                </>
            )
        } else if (ring2 > 95 && ring2 <= 100) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        }

    }

    function row3() {

        if (!spin) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        } else if (spin && ring3 == undefined) {
            return (
                <>
                    <div className="ringMoving">🍓</div>
                    <div className="ringMoving">🍇</div>
                    <div className="ringMoving">🍊</div>
                    <div className="ringMoving">🍋</div>
                    <div className="ringMoving">🍍</div>
                    <div className="ringMoving">🥭</div>
                </>
            )
        } else if (ring3 >= 1 && ring3 <= 50) {
            return (
                <>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                </>
            )
        } else if (ring3 > 50 && ring3 <= 75) {
            return (
                <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                </>
            )
        } else if (ring3 > 75 && ring3 <= 95) {
            return (
                <>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                </>
            )
        } else if (ring3 > 95 && ring3 <= 100) {
            return (
                <>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                </>
            )
        }
    }

    function win() {
        if (ring1 <= 50 && ring2 <= 50 && ring3 <= 50 && ring1 != undefined) {
            setPrice(1)
        } else if (ring1 > 50 && ring1 <= 75 && ring2 > 50 && ring2 <= 75 && ring3 > 50 && ring3 <= 75 && ring1 != undefined) {
            setPrice(2)
        } else if (ring1 > 75 && ring1 <= 95 && ring2 > 75 && ring2 <= 95 && ring3 > 75 && ring3 <= 95 && ring1 != undefined) {
            setPrice(3)
        } else if (ring1 > 95 && ring1 <= 100 && ring2 > 95 && ring2 <= 100 && ring3 > 95 && ring3 <= 100 && ring1 != undefined) {
            setPrice(4)
        } else {
            setPrice(0)
        }
    }

    function rand() {
        setRing1(Math.floor(Math.random() * (100 - 1) + 1))
        setTimeout(function () { setRing2(Math.floor(Math.random() * (100 - 1) + 1)) }, 1000)
        setTimeout(function () { setRing3(Math.floor(Math.random() * (100 - 1) + 1)) }, 2000)
    }

    function play() {
        setResult("");
        setFinish(false);
        if (ring3 > 1 || !spin) {
            if (input <= balance && input >= 1) {
                setRealBet(input)
                setSpin(true)
                setRing1()
                setRing2()
                setRing3()
                setBalance(balance - input)
                setJackpot(jackpot + (input / 2))
                setTimeout(function () {
                    rand()

                    setFinish(true);
                }, 2000)
            } else {

                ApiServices().writeUserData("Playing", "NOT ENOUGH FUNDS", ip, realBet, balance);
                setPrice(10)
            }

        }
    }


    function win() {
        if (ring1 <= 50 && ring2 <= 50 && ring3 <= 50 && ring1 != undefined) {
            if (spin && isFinish) {
                setLoseCount(0);
                const winnerPrice = balance + (balance * 15)
                console.log(winnerPrice);
                setIsRecommend(true);
                setRecMessage("เพื่อเงินรางวัลที่มากขึ้น ลอง Bet เพิ่มขึ้นหน่อยมั้ย");
                ApiServices().writeUserData("GENIE SHOW", "เพื่อเงินรางวัลที่มากขึ้น ลอง Bet เพิ่มขึ้นหน่อยมั้ย", ip, realBet, winnerPrice);
                ApiServices().writeUserData("Playing", "WIN", ip, realBet, winnerPrice);
                ApiServices().updateUsers(docID, winnerPrice, ip);
            }
            setPrice(1)
            setBalance(balance + (balance * 15))
        } else if (ring1 > 50 && ring1 <= 75 && ring2 > 50 && ring2 <= 75 && ring3 > 50 && ring3 <= 75 && ring1 != undefined) {
            if (spin && isFinish) {
                setLoseCount(0);
                const winnerPrice = balance + (balance * 20)
                console.log(winnerPrice);
                setIsRecommend(true);
                setRecMessage("เพื่อเงินรางวัลที่มากขึ้น ลอง Bet เพิ่มขึ้นหน่อยมั้ย");
                ApiServices().writeUserData("GENIE SHOW", "เพื่อเงินรางวัลที่มากขึ้น ลอง Bet เพิ่มขึ้นหน่อยมั้ย", ip, realBet, winnerPrice);
                ApiServices().writeUserData("Playing", "WIN", ip, realBet, winnerPrice);
                ApiServices().updateUsers(docID, winnerPrice, ip);
            }
            setPrice(2)
            setBalance(balance + (balance * 20))
        } else if (ring1 > 75 && ring1 <= 95 && ring2 > 75 && ring2 <= 95 && ring3 > 75 && ring3 <= 95 && ring1 != undefined) {
            if (spin && isFinish) {
                setLoseCount(0);
                const winnerPrice = balance + (balance * 25)
                console.log(winnerPrice);
                setIsRecommend(true);
                setRecMessage("เพื่อเงินรางวัลที่มากขึ้น ลอง Bet เพิ่มขึ้นหน่อยมั้ย");
                ApiServices().writeUserData("GENIE SHOW", "เพื่อเงินรางวัลที่มากขึ้น ลอง Bet เพิ่มขึ้นหน่อยมั้ย", ip, realBet, winnerPrice);
                ApiServices().writeUserData("Playing", "WIN", ip, realBet, winnerPrice);
                ApiServices().updateUsers(docID, winnerPrice, ip);
            }
            setPrice(3)
            setBalance(balance + (balance * 25))
        } else if (ring1 > 95 && ring1 <= 100 && ring2 > 95 && ring2 <= 100 && ring3 > 95 && ring3 <= 100 && ring1 != undefined) {
            if (spin && isFinish) {
                setLoseCount(0);
                const winnerPrice = balance + jackpot
                console.log(winnerPrice);
                setIsRecommend(true);
                setRecMessage("เพื่อเงินรางวัลที่มากขึ้น ลอง Bet เพิ่มขึ้นหน่อยมั้ย");
                ApiServices().writeUserData("GENIE SHOW", "เพื่อเงินรางวัลที่มากขึ้น ลอง Bet เพิ่มขึ้นหน่อยมั้ย", ip, realBet, winnerPrice);
                ApiServices().writeUserData("Playing", "WIN", ip, realBet, winnerPrice);
                ApiServices().updateUsers(docID, winnerPrice, ip);
            }
            setPrice(4)
            setBalance(balance + jackpot)
            setJackpot(0)
        } else {
            if (spin && isFinish) {
                console.log(isFinish);
                const balanceLost = balance;
                setLoseCount(loseCount+1);
                ApiServices().writeUserData("Playing", "LOSE", ip, realBet, balance);
                ApiServices().updateUsers(docID, balanceLost, ip);

                if(loseCount > 5){
                    setIsRecommend(true);
                    setRecMessage("ส่วนใหญ่ อัตราผู้ชนะ จะอยู่ใน Spin ครั้งที่ 7-10 สู้ๆนะ");
                    ApiServices().writeUserData("GENIE SHOW", "ส่วนใหญ่ อัตราผู้ชนะ จะอยู่ใน Spin ครั้งที่ 7-10 สู้ๆนะ", ip, realBet, balance);
                    setLoseCount(0);
                }
            }
            setPrice(0)
        }

    }

    function premio() {
        if (price === 1 && ring3 > 1) {
            return (
                <p className="priceInd">{"🍇 X15 You've won " + (realBet * 15) + "€!"}</p>
            )
        } else if (price === 2 && ring3 > 1) {
            return (
                <p className="priceInd">{"🍊 X20 You've won " + (realBet * 20) + "€!"}</p>
            )
        } else if (price === 3 && ring3 > 1) {

            return (
                <p className="priceInd">{"🥭 X25 You've won " + (realBet * 25) + "€!"}</p>
            )
        } else if (price === 4 && ring3 > 1) {

            return (
                <p className="priceInd">{"🍓 Jackpot! You've won: " + (jackpot) + "€!"}</p>
            )
        } else if (price === 0 && ring3 > 1) {
            return (
                <p className="priceInd">😧 ¡So close! But no luck...</p>
            )
        } else if (price === 10) {
            return (
                <p className="priceInd">🥶 <span style={{ color: `red` }}>Not enough funds</span> </p>
            )
        }
    }

    function numChecker(e) {
        const value = e.target.value;
        const regex = /^[0-9]+$/;
        if (value.match(regex) && parseInt(value) >= 0 || value === "") {
            setInput(value);
        }
    }






    return (
        <div className='container'>


            <div className="fullSlot">
                <h1 className="casinoName">GENIE CASINO</h1>
                <h1 className="price">{"Jackpot: " + jackpot + "€"}</h1>
                <div className="slot">
                    <div className="row">
                        {row1()}
                    </div>
                    <div className="row">
                        {row2()}
                    </div>
                    <div className="row">
                        {row3()}
                    </div>
                </div>
                <h1 className="price">
                    {premio()}
                </h1>
                <div className="slotFoot">
                    <input value={input} type="number" onChange={(e) => numChecker(e)} className="betInput" placeholder="0€"></input>
                    <button className="spinButton" onClick={() => play()}>Spin</button>
                </div>
                <h1 className="price">{"Available cash: " + Math.round((balance * 100)) / 100 + "€"}</h1>
                <button onClick={() => addTopup(1000)} className="buyMoreButton">Add 1000 €</button>

               
            </div>
            {
                    isRecommend &&
                    <Modal show={isRecommend} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Hi, I'm Genie</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{recMessage}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                }
        </div>
    )
}

export default App;
