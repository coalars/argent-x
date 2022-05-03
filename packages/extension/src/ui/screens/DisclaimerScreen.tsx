import CircleCheckedFilled from "@mui/icons-material/CheckCircle"
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked"
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material"
import { ChangeEventHandler, FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { P } from "../components/Typography"
import { routes } from "../routes"
import { understandDisclaimer } from "../utils/disclaimer"
import { ConfirmScreen } from "./ConfirmScreen"

const SP = styled(P)`
  font-size: 18px;
  line-height: 24px;
`

export const DisclaimerScreen: FC = () => {
  const navigate = useNavigate()
  const [conditions, setConditions] = useState({
    lossOfFunds: false,
    alphaVersion: false,
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setConditions({ ...conditions, [target.name]: target.checked })

  return (
    <ConfirmScreen
      title="Disclaimer"
      confirmButtonText="Continue"
      confirmButtonBackgroundColor="#c12026"
      disableConfirm={!conditions.lossOfFunds || !conditions.alphaVersion}
      singleButton
      onSubmit={() => {
        understandDisclaimer()
        navigate(routes.welcome())
      }}
    >
      <SP>
        StarkNet is in Alpha and may experience technical issues or introduce
        breaking changes from time to time. Please accept this before
        continuing.
      </SP>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={conditions.lossOfFunds}
                onChange={handleChange}
                name="lossOfFunds"
                icon={<CircleUnchecked />}
                checkedIcon={<CircleCheckedFilled />}
                color="success"
              />
            }
            label="I understand that StarkNet may introduce changes that make my existing account unusable and force to create new ones."
            sx={{ mt: 4 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={conditions.alphaVersion}
                onChange={handleChange}
                name="alphaVersion"
                icon={<CircleUnchecked />}
                checkedIcon={<CircleCheckedFilled />}
                color="success"
              />
            }
            label="I understand that StarkNet may experience performance issues and my transactions may fail for various reasons."
            sx={{ mt: 4 }}
          />
        </FormGroup>
      </FormControl>
    </ConfirmScreen>
  )
}
