import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { Tooltip } from "react-tooltip";
import Table from "react-bootstrap/Table";

function ContractInstructions({ collat, reward }) {
  const contractSteps = useRef(null);

  const handleCollateralClick = () => {
    navigator.clipboard.writeText(collat.replace("$", ""));
  };
  const handleRewardClick = () => {
    navigator.clipboard.writeText(reward.replace("$", ""));
  };

  const scrollToBottom = () => {
    contractSteps.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [reward]);

  return (
    <div className="table-div">
      <Table hover size="sm" variant="dark" className="contract-table">
        <tbody>
          <tr>
            <th className="bg-danger text-white">Collateral</th>
            <td>{collat.replace("$", "")} ISK</td>
            <td>
              <Button
                variant="danger"
                type="button"
                size="sm"
                onClick={handleCollateralClick}
              >
                <i
                  class="fa-solid fa-copy"
                  title="Copy Collateral"
                  data-tooltip-id="collateral"
                />
              </Button>
              <Tooltip id="collateral" content="Copied!" openOnClick />
            </td>
          </tr>
          <tr>
            <th className="bg-danger text-white">Reward</th>
            <td>{reward.replace("$", "")} ISK</td>
            <td>
              <Button
                variant="danger"
                type="button"
                size="sm"
                onClick={handleRewardClick}
              >
                <i
                  class="fa-solid fa-copy"
                  title="Copy Reward"
                  data-tooltip-id="reward"
                />
                <Tooltip id="reward" content="Copied!" openOnClick />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="contract-steps" ref={contractSteps}>
        <p>1. Create Contract</p>
        <p>
          2. Contract Type: <span className="red-text">Courier</span>
        </p>
        <p>
          3. Assign to Corporation:{" "}
          <span className="red-text">Squatch Holding LLC</span>
        </p>
        <p>4. Select items</p>
        <p>5. Enter the Ship To</p>
        <p>
          6. Copy and Paste <span className="red-text">Reward</span>
        </p>
        <p>
          7. Copy and Paste <span className="red-text">Collateral</span>
        </p>
        <p>
          8. Set Expiration: <span className="red-text">1 Week</span>
        </p>
        <p>
          9. Expiration: <span className="red-text">7 days</span>
        </p>
      </div>
    </div>
  );
}

export default ContractInstructions;
