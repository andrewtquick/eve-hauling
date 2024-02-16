import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Tooltip } from "react-tooltip";
import Alert from "react-bootstrap/Alert";

function AppraisalDetails({ volume, buy, sell, split, rawVolume }) {
  const handleVolumeClick = () => {
    navigator.clipboard.writeText(volume.replace("$", ""));
  };
  const handleSellClick = () => {
    navigator.clipboard.writeText(sell.replace("$", ""));
  };
  const handleSplitClick = () => {
    navigator.clipboard.writeText(split.replace("$", ""));
  };
  const handleBuyClick = () => {
    navigator.clipboard.writeText(buy.replace("$", ""));
  };

  return (
    <div className="table-div">
      <Table hover size="sm" variant="dark" className="contract-table">
        <tbody>
          <tr>
            <th className="bg-danger text-white">Total Volume</th>
            <td>
              {volume.replace("$", "")} m<sub>3</sub>
            </td>
            <td>
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={handleVolumeClick}
              >
                <i
                  class="fa-solid fa-copy"
                  title="Copy Total Volume"
                  data-tooltip-id="volume"
                />
              </Button>
              <Tooltip id="volume" content="Copied!" openOnClick />
            </td>
          </tr>
          <tr>
            <th className="bg-danger text-white">Jita Sell</th>
            <td>{sell.replace("$", "")} ISK</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={handleSellClick}
              >
                <i
                  class="fa-solid fa-copy"
                  title="Copy Jita Sell"
                  data-tooltip-id="sell"
                />
              </Button>
              <Tooltip id="sell" content="Copied!" openOnClick />
            </td>
          </tr>
          <tr>
            <th className="bg-danger text-white">Jita Split</th>
            <td>{split.replace("$", "")} ISK</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={handleSplitClick}
              >
                <i
                  class="fa-solid fa-copy"
                  title="Copy Jita Split"
                  data-tooltip-id="split"
                />
              </Button>
              <Tooltip id="split" content="Copied!" openOnClick />
            </td>
          </tr>
          <tr>
            <th className="bg-danger text-white">Jita Buy</th>
            <td>{buy.replace("$", "")} ISK</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={handleBuyClick}
              >
                <i
                  class="fa-solid fa-copy"
                  title="Copy Jita Buy"
                  data-tooltip-id="buy"
                />
              </Button>
              <Tooltip id="buy" content="Copied!" openOnClick />
            </td>
          </tr>
          <tr>
            <th className="bg-danger text-white">Current Reward</th>
            <td>
              {" "}
              {`${process.env.REACT_APP_REWARD_PRICE}`} ISK per m<sub>3</sub>
            </td>
          </tr>
        </tbody>
      </Table>
      <br />
      <br />
      {rawVolume > 60000 ? (
        <Alert key={"danger"} variant={"danger"}>
          Your volume exceeds 60,000m<sub>3</sub>. Please work with Xylr
          directly.
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
}

export default AppraisalDetails;
