import axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import ContractInstructions from "../contract/ContractInstructions";
import AppraisalDetails from "../appraisal/AppraisalDetails";

const Calculator = () => {
  const [loading, setLoading] = useState(false);
  const [apprasial, setAppraisal] = useState(0);
  const [volume, setVolume] = useState();
  const [jitaSell, setJitaSell] = useState();
  const [jitaBuy, setJitaBuy] = useState();
  const [jitaSplit, setJitaSplit] = useState();
  const [reward, setReward] = useState();
  const [collateral, setCollateral] = useState();
  const [rawVolume, setRawVolume] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = event.target[0].value;
    getJaniceData(id.trim());
  };

  const resetCalculator = () => {
    document.querySelector(".appraisal-input").value = "";
    setAppraisal(0);
    setVolume();
    setJitaSell();
    setJitaSplit();
    setJitaBuy();
    setReward();
    setCollateral();
  };

  const getJaniceData = (id) => {
    setLoading(true);

    try {
      axios({
        method: "GET",
        headers: {
          "X-ApiKey": `${process.env.REACT_APP_JANICE_API_KEY}`,
          Accept: "application/json",
        },
        url: `https://janice.e-351.com/api/rest/v2/appraisal/${id}`,
      })
        .then((res) => {
          parseData(res);
          setLoading(false);
        })
        .catch((err) => {
          setAppraisal(1);
          setLoading(false);
        });
    } catch (err) {
      console.warn("Unable to communicate with Janice");
    }

    setAppraisal(0);
  };

  const parseData = (appraisal) => {
    let convertedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    let reward =
      process.env.REACT_APP_REWARD_PRICE * appraisal.data.totalVolume;

    setJitaSell(
      convertedPrice.format(appraisal.data.effectivePrices.totalSellPrice)
    );
    setVolume(convertedPrice.format(appraisal.data.totalVolume));
    setReward(convertedPrice.format(reward));
    setCollateral(
      convertedPrice.format(appraisal.data.effectivePrices.totalBuyPrice)
    );
    setJitaBuy(
      convertedPrice.format(appraisal.data.effectivePrices.totalBuyPrice)
    );
    setJitaSell(
      convertedPrice.format(appraisal.data.effectivePrices.totalSellPrice)
    );
    setJitaSplit(
      convertedPrice.format(appraisal.data.effectivePrices.totalSplitPrice)
    );
    setRawVolume(appraisal.data.totalVolume);
  };

  return (
    <>
      <Container>
        <div className="calculator-main">
          <p className="instructions-text">Instructions:</p>
          <p className="instructions-steps">
            1. Go to{" "}
            <a href="https://janice.e-351.com" target="_blank" rel="noreferrer">
              Janice
            </a>{" "}
            and copy paste all the items you want to have moved.
            <br />
            <br />
            2. Copy the <span className="red-text"> Appraisal ID</span> at the
            top of the page (see Figure 1)
            <br />
            or from the address bar (see Figure 2) after you click Submit.
          </p>

          <div className="figure-imgs">
            <div className="figure-1">
              <p>Figure 1</p>
              <img
                src="/img/janice-header.png"
                alt="Where to copy appraisal id"
              ></img>
            </div>
            <div className="figure-2">
              <p>Figure 2</p>
              <img
                src="/img/janice-url.png"
                alt="Where to copy appraisal id"
              ></img>
            </div>
          </div>
          <br />
          <p className="instructions-steps">
            3. Paste the Appraisal ID into the cooresponding box and click
            <span className="red-text"> Calculate</span>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-5 text-center">
              <Form.Label className="fs-4 mb-3">Appraisal ID:</Form.Label>
              <Form.Control
                type="text"
                className="text-center appraisal-input"
                maxLength={7}
              />
              <Button
                variant="danger"
                type="submit"
                className="mt-4 calculate-btn"
              >
                {loading === true ? (
                  <Spinner animation="border" role="status" size="sm" />
                ) : (
                  "Calculate"
                )}
              </Button>
              <Button
                variant="secondary"
                className="mt-4 ms-3 calculate-btn"
                onClick={resetCalculator}
              >
                Reset
              </Button>
            </Form.Group>
          </Form>
          {apprasial === 1 ? (
            <>
              <p className="red-text invalid-appraisal">
                Appraisal ID is invalid!
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
      {reward && (
        <>
          <hr />
          <div className="calculator-main">
            <h2 className="instructions-text">Appraisal Details</h2>
            <AppraisalDetails
              volume={volume}
              sell={jitaSell}
              buy={jitaBuy}
              split={jitaSplit}
              rawVolume={rawVolume}
            />
            {rawVolume < 6000 && (
              <>
                {" "}
                <hr />
                <h2 className="instructions-text">Contract Instructions</h2>
                <ContractInstructions collat={collateral} reward={reward} />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Calculator;
